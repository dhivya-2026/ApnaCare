import { useState, useEffect } from "react";
import { FileText, Upload, CheckCircle2, AlertCircle, Clock, ShieldCheck, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { DocumentRecord, VerificationStatus } from "@/server/auth/types";

interface Props {
  attendantId?: string;
}

export function SahaDocumentCenter({ attendantId }: Props) {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingType, setUploadingType] = useState<string | null>(null);

  useEffect(() => {
    fetchDocuments();
  }, [attendantId]);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/saha/documents");
      if (res.ok) {
        const data = await res.json();
        if (data.documents && data.documents.length > 0) {
          setDocuments(data.documents);
          return;
        }
      }
      // Demo defaults
      setDocuments([
        {
          document_id: "DOC-AADHAAR-01",
          owner_id: attendantId || "ATT-BLR-01",
          owner_type: "attendant",
          document_type: "id_proof",
          file_url: "/docs/aadhaar_verified.pdf",
          verification_status: "verified",
          verified_by: "Admin Operations Desk",
          uploaded_at: "2024-03-12T10:00:00Z",
          verified_at: "2024-03-14T15:30:00Z",
        },
        {
          document_id: "DOC-POLICE-02",
          owner_id: attendantId || "ATT-BLR-01",
          owner_type: "attendant",
          document_type: "police_verification",
          file_url: "/docs/police_clearance_karnataka.pdf",
          verification_status: "verified",
          verified_by: "ACP Office / TrustGrid Background Vetting",
          uploaded_at: "2024-03-15T11:00:00Z",
          verified_at: "2024-03-18T16:00:00Z",
        },
        {
          document_id: "DOC-CERT-03",
          owner_id: attendantId || "ATT-BLR-01",
          owner_type: "attendant",
          document_type: "certification",
          file_url: "/docs/geriatric_care_diploma.pdf",
          verification_status: "verified",
          verified_by: "Clinical Nursing Superintendent",
          uploaded_at: "2024-03-20T09:30:00Z",
          verified_at: "2024-03-22T14:00:00Z",
        },
      ]);
    } catch {
      // Keep defaults
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateUpload = (type: string, title: string) => {
    setUploadingType(type);
    setTimeout(() => {
      const newDoc: DocumentRecord = {
        document_id: `DOC-${Date.now().toString(36).toUpperCase()}`,
        owner_id: attendantId || "ATT-BLR-01",
        owner_type: "attendant",
        document_type: type as any,
        file_url: `/uploads/${type}_sample.pdf`,
        verification_status: "pending",
        uploaded_at: new Date().toISOString(),
      };
      setDocuments((prev) => [newDoc, ...prev.filter((d) => d.document_type !== type)]);
      setUploadingType(null);
      toast.success(`${title} uploaded successfully! Placed in admin verification queue.`);
    }, 900);
  };

  const REQUIRED_DOCS = [
    {
      type: "id_proof",
      title: "Government Identity Proof",
      description: "Front & back scan of Aadhaar Card or Voter ID confirming permanent South India residence.",
      badge: "Mandatory for Duty Allocation",
    },
    {
      type: "police_verification",
      title: "State Police Verification Clearance",
      description: "Clean criminal record verification certificate issued by local Police Commissionerate.",
      badge: "Mandatory Level-3 Vetted",
    },
    {
      type: "certification",
      title: "Nursing / Attendant Training Certificate",
      description: "GNM/ANM nursing certificate, B.Sc Convalescence, or LifeSakhi Saha Academy completion diploma.",
      badge: "Skill Qualification Proof",
    },
    {
      type: "medical_fitness",
      title: "Medical & Health Fitness Certificate",
      description: "Physician fitness certificate confirming immunization and physical capability for lifting/transfers.",
      badge: "Annual Health Audit",
    },
  ];

  const getStatusBadge = (status?: VerificationStatus) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-bold border-emerald-500/30 text-[11px] inline-flex items-center gap-1">
            <CheckCircle2 className="size-3 text-emerald-600" />
            Verified &amp; Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/15 text-amber-800 dark:text-amber-300 font-bold border-amber-500/30 text-[11px] inline-flex items-center gap-1">
            <Clock className="size-3 text-amber-600 animate-spin" />
            Under Coordinator Review
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive/15 text-destructive font-bold border-destructive/30 text-[11px] inline-flex items-center gap-1">
            <XCircle className="size-3 text-destructive" />
            Resubmission Required
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-muted-foreground text-[11px]">
            Not Submitted
          </Badge>
        );
    }
  };

  return (
    <div className="card-soft p-6 sm:p-8 border-border space-y-6 bg-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h2 className="text-xl font-display font-semibold text-foreground flex items-center gap-2">
            <ShieldCheck className="size-5 text-emerald-600" />
            Saha Verification &amp; Credential Vault
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            All LifeSakhi care attendants must maintain valid police clearance and identity verification to be eligible for patient duty allocation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
            ✓ 100% Police Verified Pool
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {REQUIRED_DOCS.map((doc) => {
          const existing = documents.find((d) => d.document_type === doc.type);
          const isUploading = uploadingType === doc.type;

          return (
            <div
              key={doc.type}
              className="p-5 rounded-2xl border border-border bg-secondary/30 flex flex-col justify-between space-y-4 hover:border-primary/40 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">{doc.title}</h3>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mt-0.5">
                      {doc.badge}
                    </span>
                  </div>
                  <div>{getStatusBadge(existing?.verification_status)}</div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {doc.description}
                </p>

                {existing && existing.verification_status === "verified" && (
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-300 font-mono pt-1">
                    Verified By: {existing.verified_by || "Central Ops Desk"}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="text-[11px] text-muted-foreground font-mono">
                  {existing ? `Ref: ${existing.document_id}` : "Accepted: PDF, JPG, PNG (<5MB)"}
                </span>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSimulateUpload(doc.type, doc.title)}
                  disabled={isUploading}
                  className="text-xs font-semibold h-8"
                >
                  {isUploading ? (
                    <Loader2 className="size-3.5 animate-spin mr-1.5" />
                  ) : (
                    <Upload className="size-3.5 mr-1.5" />
                  )}
                  {existing ? "Upload Update" : "Upload Document"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
