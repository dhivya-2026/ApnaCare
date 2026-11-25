import { useState, useEffect } from "react";
import { Users, Plus, Trash2, Heart, Shield, Edit3, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { FamilyMemberRecord } from "@/server/auth/types";

interface Props {
  onSelectMemberForBooking?: (member: FamilyMemberRecord) => void;
}

export function FamilyMemberManager({ onSelectMemberForBooking }: Props) {
  const [members, setMembers] = useState<FamilyMemberRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // New member form
  const [fullName, setFullName] = useState("");
  const [relationship, setRelationship] = useState("Mother");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Female");
  const [mobility, setMobility] = useState<FamilyMemberRecord["mobility_level"]>("walker_assisted");
  const [careNotes, setCareNotes] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user/family-members");
      if (res.ok) {
        const data = await res.json();
        if (data.members && data.members.length > 0) {
          setMembers(data.members);
          return;
        }
      }
      // Demo defaults
      setMembers([
        {
          member_id: "MEM-001",
          user_id: "USR-DEMO-001",
          full_name: "Saraswathi Sharma",
          relationship: "Mother",
          age: 78,
          gender: "Female",
          mobility_level: "walker_assisted",
          dietary_medical_notes: "Mild hypertension. Needs walker support for bathroom visits and sponge bath assistance. Afternoon medication routine.",
          primary_language: "Kannada, Tamil",
          emergency_contact: "+91 98765 43210",
          created_at: new Date().toISOString(),
        },
        {
          member_id: "MEM-002",
          user_id: "USR-DEMO-001",
          full_name: "Ananya Sharma",
          relationship: "Daughter (Newborn)",
          age: 1,
          gender: "Female",
          mobility_level: "independent",
          dietary_medical_notes: "Fourth trimester infant care, pediatric massage, and vaccination schedule.",
          primary_language: "English",
          emergency_contact: "+91 98765 43210",
          created_at: new Date().toISOString(),
        },
      ]);
    } catch {
      // Keep defaults
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !age) {
      toast.error("Please provide both full name and age.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/user/family-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: fullName,
          relationship,
          age: Number(age),
          gender,
          mobility_level: mobility,
          dietary_medical_notes: careNotes,
          emergency_contact: emergencyPhone,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.member) {
          setMembers((prev) => [...prev, data.member]);
          toast.success(`Added ${fullName} (${relationship}) to family profiles!`);
          resetForm();
          setModalOpen(false);
          return;
        }
      }

      // Offline / fallback state
      const fallbackMember: FamilyMemberRecord = {
        member_id: `MEM-${Date.now().toString(36).toUpperCase()}`,
        user_id: "USR-DEMO-001",
        full_name: fullName,
        relationship,
        age: Number(age),
        gender,
        mobility_level: mobility,
        dietary_medical_notes: careNotes,
        emergency_contact: emergencyPhone,
        created_at: new Date().toISOString(),
      };
      setMembers((prev) => [...prev, fallbackMember]);
      toast.success(`Saved ${fullName} (${relationship}) to family members!`);
      resetForm();
      setModalOpen(false);
    } catch {
      toast.error("Failed to save family member.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMember = async (memberId: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from family members?`)) return;

    try {
      await fetch(`/api/user/family-members?memberId=${encodeURIComponent(memberId)}`, {
        method: "DELETE",
      });
      setMembers((prev) => prev.filter((m) => m.member_id !== memberId));
      toast.success(`Removed ${name} from your family list.`);
    } catch {
      setMembers((prev) => prev.filter((m) => m.member_id !== memberId));
      toast.success(`Removed ${name}.`);
    }
  };

  const resetForm = () => {
    setFullName("");
    setRelationship("Mother");
    setAge("");
    setGender("Female");
    setMobility("walker_assisted");
    setCareNotes("");
    setEmergencyPhone("");
  };

  const getMobilityBadge = (mob: string) => {
    switch (mob) {
      case "independent":
        return <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20 text-[11px]">Independent Mobility</Badge>;
      case "walker_assisted":
        return <Badge variant="outline" className="bg-amber-500/10 text-amber-800 border-amber-500/20 text-[11px]">Walker / Stick Assisted</Badge>;
      case "wheelchair_bound":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-500/20 text-[11px]">Wheelchair Assisted</Badge>;
      case "bedridden":
        return <Badge variant="outline" className="bg-red-500/10 text-red-700 border-red-500/20 text-[11px]">Bedridden / Full Assistance</Badge>;
      default:
        return <Badge variant="outline" className="text-[11px]">{mob}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-card border border-border">
        <div>
          <h3 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
            <Users className="size-5 text-primary" />
            Family Members &amp; Care Recipients
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Store essential non-diagnostic care requirements, mobility profiles, and emergency contacts for your loved ones.
          </p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          variant="warm"
          size="sm"
          className="font-semibold shadow-2xs"
        >
          <Plus className="size-4 mr-1.5" />
          Add Family Member
        </Button>
      </div>

      {loading ? (
        <div className="py-12 text-center">
          <Loader2 className="size-6 animate-spin mx-auto text-primary" />
        </div>
      ) : members.length === 0 ? (
        <div className="card-soft p-10 text-center space-y-3">
          <Users className="size-10 text-muted-foreground/50 mx-auto" />
          <h4 className="font-semibold text-base text-foreground">No family members registered yet</h4>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Add your parents, children, or loved ones so our Saha care team understands their exact mobility and daily support needs.
          </p>
          <Button onClick={() => setModalOpen(true)} variant="outline" size="sm">
            <Plus className="size-4 mr-1.5" /> Add First Family Member
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {members.map((m) => (
            <div
              key={m.member_id}
              className="card-soft p-5 border border-border hover:border-primary/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-base text-foreground">{m.full_name}</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary font-medium text-foreground">
                        {m.relationship}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {m.gender} · {m.age} Years Old · Ref: <span className="font-mono text-[10px]">{m.member_id}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteMember(m.member_id, m.full_name)}
                    className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/10"
                    title="Remove family member"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <div>{getMobilityBadge(m.mobility_level)}</div>

                {m.dietary_medical_notes && (
                  <div className="p-3 rounded-xl bg-secondary/50 text-xs text-foreground/90 space-y-1">
                    <span className="font-bold text-[10px] uppercase tracking-wider text-muted-foreground block">
                      Care &amp; Daily Living Requirements
                    </span>
                    <p className="leading-relaxed">{m.dietary_medical_notes}</p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground text-[11px]">
                  Emergency: <span className="font-medium text-foreground">{m.emergency_contact || "Primary account phone"}</span>
                </span>
                {onSelectMemberForBooking && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onSelectMemberForBooking(m)}
                    className="text-primary hover:text-primary font-semibold text-xs h-8"
                  >
                    Book Care for {m.relationship} &rarr;
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD MEMBER MODAL */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-display font-semibold">
              Add Family Member
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Add non-diagnostic care preferences and assistance requirements to help us match the best verified Saha companion.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddMember} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="mname" className="text-xs font-semibold">Full Legal Name *</Label>
              <Input
                id="mname"
                placeholder="e.g. Smt. Saraswathi Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="mrel" className="text-xs font-semibold">Relationship *</Label>
                <select
                  id="mrel"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                  <option value="Spouse">Spouse / Partner</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Son">Son</option>
                  <option value="Grandmother">Grandmother</option>
                  <option value="Grandfather">Grandfather</option>
                  <option value="Self">Self</option>
                  <option value="Other">Other Relative</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="mage" className="text-xs font-semibold">Age (Years) *</Label>
                <Input
                  id="mage"
                  type="number"
                  min="0"
                  max="120"
                  placeholder="e.g. 78"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="mgender" className="text-xs font-semibold">Gender</Label>
                <select
                  id="mgender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="mmobility" className="text-xs font-semibold">Mobility Level</Label>
                <select
                  id="mmobility"
                  value={mobility}
                  onChange={(e) => setMobility(e.target.value as any)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="independent">Independent</option>
                  <option value="walker_assisted">Walker / Stick Assisted</option>
                  <option value="wheelchair_bound">Wheelchair Bound</option>
                  <option value="bedridden">Bedridden / Full Bedside Aid</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="mnotes" className="text-xs font-semibold">
                Daily Living &amp; Care Requirements
              </Label>
              <Textarea
                id="mnotes"
                placeholder="Mention bathing support, dietary restrictions (e.g. low-salt diabetic), morning medication timing, or special language comfort."
                value={careNotes}
                onChange={(e) => setCareNotes(e.target.value)}
                className="min-h-[80px] text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="memergency" className="text-xs font-semibold">Emergency Contact Phone</Label>
              <Input
                id="memergency"
                placeholder="+91 98765 43210 (Doctor / Sibling)"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="warm"
                size="sm"
                disabled={submitting}
                className="font-semibold"
              >
                {submitting ? <Loader2 className="size-4 animate-spin mr-1.5" /> : null}
                Save Family Member
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
