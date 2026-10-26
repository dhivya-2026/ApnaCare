import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useCallback } from "react";
import {
  BadgeCheck,
  BriefcaseMedical,
  CheckCircle2,
  ChevronRight,
  FileText,
  Heart,
  HeartHandshake,
  MapPin,
  Paperclip,
  ShieldCheck,
  Sparkles,
  Star,
  Upload,
  UserCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero, SectionHeading } from "@/components/site/Cards";
import { seo } from "@/lib/seo";
import { track, sendToGoogleSheet } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import {
  attendantApplicationSchema,
  fieldErrors,
  ATTENDANT_ROLES,
  EXPERIENCE_LEVELS,
  EMPLOYMENT_TYPES,
  INDIAN_LANGUAGES,
  DOCUMENT_CATEGORIES,
  type UploadedDocMetadata,
} from "@/lib/validation";

import hero1 from "@/assets/hero-1.jpg";

export const Route = createFileRoute("/become-an-attendant")({
  head: () =>
    seo(
      "Become a Saha — Join the ApnaCare Care Team",
      "Apply to join the ApnaCare Saha care team as a non-clinical care companion or healthcare professional. Meet the people behind your peace of mind across South India."
    ),
  component: BecomeAnAttendant,
});

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Delhi","Jammu & Kashmir","Ladakh","Puducherry","Chandigarh",
];

const WHY_JOIN = [
  {
    icon: Heart,
    title: "Meaningful Care Work",
    desc: "Contribute directly to the wellbeing of elders, patients and families. Every shift makes a real difference.",
  },
  {
    icon: BriefcaseMedical,
    title: "Use Your Professional Skills",
    desc: "Apply your caregiving, nursing or mobility assistance expertise in roles that match your experience.",
  },
  {
    icon: ShieldCheck,
    title: "A Structured Verification Process",
    desc: "Our thorough vetting — including background checks — is designed to build trust with every family we serve.",
  },
  {
    icon: MapPin,
    title: "Opportunities in Your City",
    desc: "We operate in Bengaluru, Chennai, Hyderabad, Coimbatore and expanding cities across South India.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Submit Your Application",
    desc: "Fill in your personal and professional details in the form below. All fields marked * are required.",
  },
  {
    step: "02",
    title: "Upload Verification Documents",
    desc: "Attach your resume and any relevant qualifications or certificates to help us assess your background.",
  },
  {
    step: "03",
    title: "Our Team Reviews & Contacts You",
    desc: "Apna Care reviews every application. If you advance, our team will reach out to discuss next steps. Submitting does not guarantee employment.",
  },
];

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const ACCEPTED_EXTENSIONS = ".pdf, .jpg, .jpeg, .png";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface DocFile extends UploadedDocMetadata {
  file: File;
}

function BecomeAnAttendant() {
  const formRef = useRef<HTMLElement>(null);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden bg-ink min-h-[70vh] flex flex-col justify-center">
        <img
          src={hero1}
          alt="A compassionate woman caregiver gently supporting a smiling elderly woman at home"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center opacity-50"
          loading="eager"
          fetchPriority="high"
          width={1600}
          height={1008}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/60 to-transparent" />

        <div className="container-page py-20 md:py-28 text-primary-foreground">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] backdrop-blur">
              <Sparkles className="size-3.5 text-terracotta" />
              Join the Saha Team
            </p>

            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl text-balance">
              Become a Saha — Support Families with Dignity & Heart
            </h1>

            <p className="mt-5 max-w-xl text-lg text-primary-foreground/85 leading-relaxed">
              Meet the people behind your peace of mind. Join the ApnaCare Saha team — people who support families through everyday care needs, hospital visits, and important moments at home.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                variant="warm"
                onClick={() => {
                  formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                  track("career_apply_now_click");
                }}
              >
                Join the Saha Team
                <ChevronRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="glass"
                onClick={() => {
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Learn About the Application Process
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs text-primary-foreground/75 font-medium">
              <ShieldCheck className="size-4 text-terracotta" />
              <span>100% Police-Verified Saha Care Professionals · Applications reviewed in confidence</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Join ── */}
      <section className="container-page py-16 md:py-20">
        <SectionHeading
          eyebrow="Why Apna Care"
          title="What makes this a meaningful opportunity"
          sub="We are building a network of verified, compassionate care professionals across South India."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_JOIN.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-soft p-6 flex flex-col gap-4 transition-all hover:shadow-lift">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                <Icon className="size-6" />
              </span>
              <div>
                <h3 className="font-semibold text-base">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="bg-secondary/40 py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Application Process"
            title="How the application works"
            sub="Submitting an application does not automatically mean approval or an offer of employment."
          />
          <ol className="mt-10 grid gap-4 sm:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <li key={step} className="card-soft p-6 flex flex-col gap-3">
                <p className="font-display text-3xl font-bold text-terracotta">{step}</p>
                <h3 className="font-semibold text-base">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section ref={formRef as React.RefObject<HTMLElement>} id="application-form" className="container-page py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            eyebrow="Join the Workforce"
            title="Saha Application Form"
            sub="Please fill in all required fields accurately. Your information is handled securely and used only for recruitment and verification purposes."
          />
          <div className="mt-10">
            <ApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}

// ── Application Form Component ─────────────────────────────────────────────────

type FormState = {
  fullName: string;
  mobile: string;
  email: string;
  dob: string;
  gender: string;
  city: string;
  state: string;
  role: string;
  experience: string;
  qualifications: string;
  languages: string[];
  employmentType: string;
  experienceSummary: string;
  consent: boolean;
};

const INITIAL_FORM: FormState = {
  fullName: "",
  mobile: "",
  email: "",
  dob: "",
  gender: "",
  city: "",
  state: "",
  role: "",
  experience: "",
  qualifications: "",
  languages: [],
  employmentType: "",
  experienceSummary: "",
  consent: false,
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

function ApplicationForm() {
  const [f, setF] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [docs, setDocs] = useState<DocFile[]>([]);
  const [docErrors, setDocErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [applicationRef, setApplicationRef] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof FormState>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setF((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
    };

  const toggleLanguage = (lang: string) => {
    setF((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
    setErrors((prev) => { const n = { ...prev }; delete n.languages; return n; });
  };

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return `"${file.name}" is not a supported format. Please upload PDF, JPG, or PNG files only.`;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return `"${file.name}" is ${formatFileSize(file.size)}, exceeding the ${MAX_FILE_SIZE_MB} MB limit.`;
    }
    return null;
  };

  const addFiles = useCallback((files: FileList | File[]) => {
    const newFiles = Array.from(files);
    const newDocs: DocFile[] = [];
    const newErrors: Record<string, string> = {};

    newFiles.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        newErrors[file.name] = error;
        return;
      }
      if (docs.find((d) => d.name === file.name && d.size === file.size)) return;
      newDocs.push({
        id: `doc_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        size: file.size,
        type: file.type,
        category: "Resume or CV",
        uploadedAt: new Date().toISOString(),
        file,
      });
    });

    setDocs((prev) => [...prev, ...newDocs]);
    setDocErrors((prev) => ({ ...prev, ...newErrors }));
  }, [docs]);

  const removeDoc = (id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const updateDocCategory = (id: string, category: string) => {
    setDocs((prev) => prev.map((d) => d.id === id ? { ...d, category } : d));
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitStatus === "submitting") return;

    // Validate form
    const result = attendantApplicationSchema.safeParse({ ...f, consent: f.consent || undefined });
    if (!result.success) {
      setErrors(fieldErrors(result.error));
      const firstErrorEl = document.querySelector("[data-error]") as HTMLElement;
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setErrors({});
    setSubmitStatus("submitting");
    track("attendant_application_start");

    const ref = "APP-" + Date.now().toString(36).toUpperCase();
    setApplicationRef(ref);

    try {
      // Collect doc metadata (never send file content to analytics)
      const docsMeta = docs.map(({ id, name, size, type, category, uploadedAt }) => ({
        id, name, size: formatFileSize(size), type, category, uploadedAt,
      }));

      await sendToGoogleSheet({
        event_type: "attendant_application",
        event_name: "attendant_application_submitted",
        lead_type: "ATTENDANT_APPLICATION",
        form_name: "Become an Attendant Form",
        application_ref: ref,
        application_status: "Pending Review",
        name: f.fullName,
        full_name: f.fullName,
        mobile: f.mobile,
        email: f.email || "",
        dob: f.dob || "",
        gender: f.gender || "",
        city: f.city,
        state: f.state,
        role: f.role,
        experience: f.experience,
        qualifications: f.qualifications || "",
        languages: f.languages.join(", "),
        employment_type: f.employmentType,
        experience_summary: f.experienceSummary || "",
        document_count: docs.length,
        documents: JSON.stringify(docsMeta),
        consent_given: "true",
        page_path: "/become-an-attendant",
        lead_status: "New",
        follow_up_status: "Pending Review",
      });

      setSubmitStatus("success");
      track("attendant_application_submitted", { role: f.role, city: f.city, experience: f.experience });
    } catch {
      setSubmitStatus("error");
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="card-soft p-10 text-center space-y-5 animate-fade-up">
        <div className="grid size-16 mx-auto place-items-center rounded-full bg-primary-soft text-primary">
          <CheckCircle2 className="size-8" />
        </div>
        <h2 className="text-2xl font-semibold">Application Submitted!</h2>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          Thank you for applying to Apna Care! Your application has been submitted successfully. Our team will review your details and contact you if further information is needed.
        </p>
        <p className="text-sm font-mono font-semibold text-primary bg-primary-soft inline-block px-3 py-1.5 rounded-lg">
          Reference: {applicationRef}
        </p>
        <p className="text-xs text-muted-foreground max-w-sm mx-auto">
          Please save your reference number. Due to the volume of applications, we are unable to provide individual status updates. Only shortlisted candidates will be contacted.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button variant="warm" onClick={() => { setF(INITIAL_FORM); setDocs([]); setSubmitStatus("idle"); setApplicationRef(""); }}>
            Submit Another Application
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10">
      {submitStatus === "error" && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          We encountered an issue submitting your application. Please check your details and try again. Your entered information has been preserved.
        </div>
      )}

      {/* ── Section A: Personal Information ── */}
      <div role="group" aria-labelledby="section-a-title" className="card-soft p-6 md:p-8 space-y-5">
        <p id="section-a-title" className="flex items-center gap-2 font-semibold text-lg">
          <UserCheck className="size-5 text-primary" />
          Section A — Personal Information
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Full Name" required error={errors.fullName} id="fullName">
            <Input
              id="fullName"
              value={f.fullName}
              onChange={set("fullName")}
              placeholder="e.g. Priya Lakshmi"
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className="h-12 rounded-xl"
            />
          </FormField>
          <FormField label="Mobile Number" required error={errors.mobile} id="mobile">
            <div className="flex h-12 w-full rounded-xl border border-input bg-card focus-within:border-primary overflow-hidden">
              <span className="shrink-0 inline-flex items-center px-3 bg-muted border-r border-input text-sm text-muted-foreground font-medium select-none">
                +91
              </span>
              <input
                id="mobile"
                type="tel"
                value={f.mobile}
                onChange={set("mobile")}
                placeholder="98765 43210"
                className="flex-1 min-w-0 h-full bg-transparent px-3 text-sm outline-none"
                aria-describedby={errors.mobile ? "mobile-error" : undefined}
              />
            </div>
          </FormField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Email Address" error={errors.email} id="email">
            <Input
              id="email"
              type="email"
              value={f.email}
              onChange={set("email")}
              placeholder="name@example.com"
              className="h-12 rounded-xl"
            />
          </FormField>
          <FormField label="Date of Birth" error={errors.dob} id="dob">
            <Input
              id="dob"
              type="date"
              value={f.dob}
              onChange={set("dob")}
              className="h-12 rounded-xl"
            />
          </FormField>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Gender" error={errors.gender} id="gender">
            <select
              id="gender"
              value={f.gender}
              onChange={set("gender")}
              className="h-12 w-full min-w-0 rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-primary"
            >
              <option value="">Prefer not to say</option>
              <option>Female</option>
              <option>Male</option>
              <option>Non-binary / other</option>
            </select>
          </FormField>
          <div />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Current City" required error={errors.city} id="city">
            <Input
              id="city"
              value={f.city}
              onChange={set("city")}
              placeholder="e.g. Chennai"
              className="h-12 rounded-xl"
            />
          </FormField>
          <FormField label="State" required error={errors.state} id="state">
            <select
              id="state"
              value={f.state}
              onChange={set("state")}
              className="h-12 w-full min-w-0 rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-primary"
            >
              <option value="">Select your state</option>
              {INDIAN_STATES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </FormField>
        </div>
      </div>

      {/* ── Section B: Professional Information ── */}
      <div role="group" aria-labelledby="section-b-title" className="card-soft p-6 md:p-8 space-y-5">
        <p id="section-b-title" className="flex items-center gap-2 font-semibold text-lg">
          <BriefcaseMedical className="size-5 text-primary" />
          Section B — Professional Information
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Applying For" required error={errors.role} id="role">
            <select
              id="role"
              value={f.role}
              onChange={set("role")}
              className="h-12 w-full min-w-0 rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-primary"
            >
              <option value="">Select a role</option>
              {ATTENDANT_ROLES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </FormField>
          <FormField label="Years of Experience" required error={errors.experience} id="experience">
            <select
              id="experience"
              value={f.experience}
              onChange={set("experience")}
              className="h-12 w-full min-w-0 rounded-xl border border-input bg-card px-3 text-sm outline-none focus:border-primary"
            >
              <option value="">Select experience level</option>
              {EXPERIENCE_LEVELS.map((e) => <option key={e}>{e}</option>)}
            </select>
          </FormField>
        </div>

        <FormField
          label="Relevant Qualifications or Certifications"
          id="qualifications"
          hint="e.g. GNM Nursing, ANM, First Aid Certificate, Physiotherapy Assistant"
        >
          <Input
            id="qualifications"
            value={f.qualifications}
            onChange={set("qualifications")}
            placeholder="Enter qualifications or leave blank"
            className="h-12 rounded-xl"
          />
        </FormField>

        <div>
          <p className="text-sm font-medium mb-3">
            Languages Spoken <span className="text-destructive">*</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {INDIAN_LANGUAGES.map((lang) => {
              const selected = f.languages.includes(lang);
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLanguage(lang)}
                  aria-pressed={selected}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-card text-foreground hover:border-primary/50"
                  )}
                >
                  {lang}
                </button>
              );
            })}
          </div>
          {errors.languages && (
            <p id="languages-error" className="mt-1.5 text-xs text-destructive" role="alert" data-error>
              {errors.languages}
            </p>
          )}
        </div>

        <FormField label="Preferred Employment Type" required error={errors.employmentType} id="employmentType">
          <div className="flex flex-wrap gap-3">
            {EMPLOYMENT_TYPES.map((type) => {
              const selected = f.employmentType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setF((prev) => ({ ...prev, employmentType: type }));
                    setErrors((prev) => { const n = { ...prev }; delete n.employmentType; return n; });
                  }}
                  aria-pressed={selected}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-card text-foreground hover:border-primary/50"
                  )}
                >
                  {type}
                </button>
              );
            })}
          </div>
          {errors.employmentType && (
            <p className="mt-1.5 text-xs text-destructive" role="alert" data-error>
              {errors.employmentType}
            </p>
          )}
        </FormField>

        <FormField
          label="Brief Description of Experience and Skills"
          id="experienceSummary"
          hint="Optional — up to 2,000 characters. Describe your caregiving experience, special skills or the kinds of patients you have worked with."
        >
          <Textarea
            id="experienceSummary"
            value={f.experienceSummary}
            onChange={set("experienceSummary")}
            rows={5}
            maxLength={2000}
            placeholder="E.g. Three years of home-care experience supporting elderly patients with mobility challenges, including post-surgical physiotherapy assistance..."
            className="rounded-xl text-sm"
          />
          <p className="mt-1 text-right text-xs text-muted-foreground">
            {f.experienceSummary.length}/2000
          </p>
        </FormField>
      </div>

      {/* ── Section C: Document Upload ── */}
      <div role="group" aria-labelledby="section-c-title" className="card-soft p-6 md:p-8 space-y-5">
        <p id="section-c-title" className="flex items-center gap-2 font-semibold text-lg">
          <Paperclip className="size-5 text-primary" />
          Section C — Verification Documents
        </p>

        <div className="rounded-xl border border-border bg-secondary/40 p-4 text-sm space-y-1.5">
          <p className="font-medium flex items-center gap-2">
            <FileText className="size-4 text-primary shrink-0" />
            You may attach the following document types:
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-0.5 pl-2">
            {DOCUMENT_CATEGORIES.map((cat) => <li key={cat}>{cat}</li>)}
          </ul>
          <p className="text-xs text-muted-foreground pt-1">
            Accepted formats: <strong>PDF, JPG, PNG</strong> · Max size per file: <strong>{MAX_FILE_SIZE_MB} MB</strong> · Documents are used solely for recruitment verification.
          </p>
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          role="button"
          aria-label="Drop files here or click to select"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click(); }}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 transition-all cursor-pointer select-none",
            isDragging
              ? "border-primary bg-primary-soft/30"
              : "border-border bg-secondary/30 hover:border-primary/50 hover:bg-secondary/50"
          )}
        >
          <div className="grid size-14 place-items-center rounded-2xl bg-primary-soft text-primary">
            <Upload className="size-6" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-sm">Drag and drop files here</p>
            <p className="text-xs text-muted-foreground mt-0.5">or click to browse your device</p>
          </div>
          <p className="text-xs text-muted-foreground">PDF, JPG, PNG · Up to {MAX_FILE_SIZE_MB} MB each</p>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_EXTENSIONS}
            multiple
            className="sr-only"
            aria-label="Upload documents"
            onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = ""; }}
          />
        </div>

        {/* File Errors */}
        {Object.entries(docErrors).map(([name, err]) => (
          <p key={name} className="text-xs text-destructive" role="alert">{err}</p>
        ))}

        {/* Uploaded files list */}
        {docs.length > 0 && (
          <ul className="space-y-3">
            {docs.map((doc) => (
              <li key={doc.id} className="card-soft p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  <FileText className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(doc.size)}</p>
                </div>
                <select
                  value={doc.category}
                  onChange={(e) => updateDocCategory(doc.id, e.target.value)}
                  aria-label={`Document category for ${doc.name}`}
                  className="h-9 rounded-xl border border-input bg-card px-2 text-xs outline-none focus:border-primary sm:w-52"
                >
                  {DOCUMENT_CATEGORIES.map((cat) => <option key={cat}>{cat}</option>)}
                </select>
                <button
                  type="button"
                  onClick={() => removeDoc(doc.id)}
                  aria-label={`Remove ${doc.name}`}
                  className="grid size-8 shrink-0 place-items-center rounded-full border border-border hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive transition-colors"
                >
                  <X className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ── Section D: Consent & Submit ── */}
      <div role="group" aria-labelledby="section-d-title" className="card-soft p-6 md:p-8 space-y-5">
        <p id="section-d-title" className="flex items-center gap-2 font-semibold text-lg">
          <ShieldCheck className="size-5 text-primary" />
          Section D — Consent &amp; Submission
        </p>

        <div className="rounded-xl bg-secondary/50 p-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground">Please note:</strong> Submitting this application does not guarantee an offer of employment or enrolment with Apna Care. Applications are reviewed on merit, availability, and operational need. Only shortlisted applicants will be contacted.
          </p>
        </div>

        <div className={cn("flex gap-3 rounded-xl border p-4 transition-colors", errors.consent ? "border-destructive/50 bg-destructive/5" : "border-border")}
          data-error={errors.consent ? "" : undefined}
        >
          <input
            id="consent"
            type="checkbox"
            checked={f.consent}
            onChange={(e) => {
              setF((prev) => ({ ...prev, consent: e.target.checked }));
              setErrors((prev) => { const n = { ...prev }; delete n.consent; return n; });
            }}
            className="mt-0.5 size-4 shrink-0 accent-primary cursor-pointer"
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <label htmlFor="consent" className="text-sm cursor-pointer leading-relaxed">
            <span className="text-destructive font-semibold">*</span>{" "}
            I confirm that the information I have provided is accurate and agree to the processing of my application information by Apna Care for recruitment and verification purposes. I understand my data will be handled in accordance with Apna Care's{" "}
            <Link to="/privacy" className="text-primary underline underline-offset-2 hover:no-underline">Privacy Policy</Link>
            {" "}and{" "}
            <Link to="/terms" className="text-primary underline underline-offset-2 hover:no-underline">Terms and Conditions</Link>.
          </label>
        </div>
        {errors.consent && (
          <p id="consent-error" className="text-xs text-destructive -mt-3" role="alert">
            {errors.consent}
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          variant="warm"
          disabled={submitStatus === "submitting"}
          className="w-full h-13 gap-2 text-base"
        >
          {submitStatus === "submitting" ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Submitting Application…
            </>
          ) : (
            <>
              <HeartHandshake className="size-5" />
              Submit Saha Application
            </>
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By submitting, you agree to our recruitment data processing policy. We do not share your information with third parties for commercial purposes.
        </p>
      </div>
    </form>
  );
}

// ── Shared Form Field Component ────────────────────────────────────────────────

function FormField({
  label,
  id,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-error={error ? "" : undefined}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
