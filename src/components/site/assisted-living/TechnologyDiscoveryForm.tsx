import { useState, useEffect } from "react";
import { Check, CheckCircle2, ShieldCheck, ArrowRight, AlertCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ASSISTED_LIVING_TECH_CATEGORIES,
  INDIA_SOLUTION_BUNDLES,
} from "@/data/assistedLivingTech";
import { SITE, buildWhatsAppUrl } from "@/data/site";
import { submitLeadWithReliability, track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export type DiscoveryIntent =
  | "Request a Technology Demo"
  | "Discuss a Senior-Care Technology Plan"
  | "Explore Technology Partnerships"
  | "Request a Care Consultation";

interface Props {
  preselectedTechId?: string | null;
  preselectedBundleId?: string | null;
  preselectedIntent?: DiscoveryIntent;
}

const SUBMITTED_KEY = "lifesakhi_tech_discovery_submitted_v1";

export function TechnologyDiscoveryForm({
  preselectedTechId,
  preselectedBundleId,
  preselectedIntent,
}: Props) {
  const [intent, setIntent] = useState<DiscoveryIntent>(
    preselectedIntent || "Request a Technology Demo"
  );
  const [personFor, setPersonFor] = useState("Mother");
  const [ageGroup, setAgeGroup] = useState("70–79 years");
  const [city, setCity] = useState("Bengaluru");
  const [livingArrangement, setLivingArrangement] = useState("Lives alone");
  const [primaryConcern, setPrimaryConcern] = useState("Fall safety & emergencies");
  const [selectedTechs, setSelectedTechs] = useState<string[]>(["remote-patient-monitoring"]);
  const [selectedBundle, setSelectedBundle] = useState<string>("");
  const [existingDevices, setExistingDevices] = useState("");
  const [humanCarePairing, setHumanCarePairing] = useState("Pair with Saha companion");
  const [consultationMethod, setConsultationMethod] = useState("Video call");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [idempotencyToken] = useState(
    () => `TECH-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6)}`
  );

  useEffect(() => {
    if (preselectedTechId) {
      setSelectedTechs((prev) => (prev.includes(preselectedTechId) ? prev : [...prev, preselectedTechId]));
      setSubmittedRef(null);
    }
  }, [preselectedTechId]);

  useEffect(() => {
    if (preselectedBundleId) {
      setSelectedBundle(preselectedBundleId);
      setIntent("Discuss a Senior-Care Technology Plan");
      setSubmittedRef(null);
    }
  }, [preselectedBundleId]);

  useEffect(() => {
    if (preselectedIntent) {
      setIntent(preselectedIntent);
    }
  }, [preselectedIntent]);

  const toggleTech = (id: string) => {
    setSelectedTechs((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (selectedTechs.length === 0 && !selectedBundle) {
      setError("Please select at least one technology area or proposed bundle.");
      return;
    }

    // Prevent duplicate submissions in the same session for identical phone + intent + selection
    const fingerprint = `${cleanPhone.slice(-10)}|${intent}|${selectedTechs.slice().sort().join(",")}|${selectedBundle}`;
    try {
      const prev = sessionStorage.getItem(SUBMITTED_KEY);
      if (prev === fingerprint) {
        setError("We already received this exact enquiry in this session. Our coordinator will contact you shortly.");
        return;
      }
    } catch {
      // ignore storage errors
    }

    setSubmitting(true);
    const techNames = selectedTechs
      .map((id) => ASSISTED_LIVING_TECH_CATEGORIES.find((t) => t.id === id)?.name || id)
      .join(", ");
    const bundleName = INDIA_SOLUTION_BUNDLES.find((b) => b.id === selectedBundle)?.name || "";

    const res = await submitLeadWithReliability(
      {
        event_type: "technology_discovery",
        event_name: "assisted_living_tech_enquiry",
        lead_type: "TECHNOLOGY_CONSULTATION",
        idempotency_token: idempotencyToken,
        enquiry_intent: intent,
        customer_name: name.trim(),
        name: name.trim(),
        phone: phone.trim(),
        mobile: phone.trim(),
        email: email.trim(),
        city,
        person_requiring_support: personFor,
        age_group: ageGroup,
        living_arrangement: livingArrangement,
        primary_concern: primaryConcern,
        required_technology: techNames,
        proposed_bundle: bundleName,
        existing_devices: existingDevices.trim() || "None specified",
        human_care_combination: humanCarePairing,
        preferred_consultation_method: consultationMethod,
        message: notes.trim(),
        page_path: "/offerings/assisted-living-technology",
      },
      "TECH"
    );

    if (res.success) {
      try {
        sessionStorage.setItem(SUBMITTED_KEY, fingerprint);
      } catch {
        // ignore
      }
      track("assisted_living_tech_enquiry_submitted", {
        reference_id: res.referenceId,
        intent,
        city,
        tech_count: selectedTechs.length,
        bundle: bundleName || "none",
      });
      setSubmittedRef(res.referenceId);
    } else {
      setError("We could not reach the coordinator desk right now. Please try again or reach us on WhatsApp.");
    }
    setSubmitting(false);
  };

  if (submittedRef) {
    const waUrl = buildWhatsAppUrl(
      `Hello LifeSakhi! I just submitted a technology enquiry (${submittedRef}) for ${personFor} in ${city}.`
    );
    return (
      <div className="rounded-3xl border border-emerald-500/30 bg-card p-8 sm:p-10 text-center space-y-4 shadow-soft">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-700">
          <CheckCircle2 className="size-8" aria-hidden />
        </div>
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-primary">
          Enquiry Received · Reference {submittedRef}
        </span>
        <h3 className="font-display text-2xl font-semibold text-foreground">
          Thank you, {name}. Your consultation request is registered.
        </h3>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          A LifeSakhi coordinator will contact you via <strong>{consultationMethod}</strong> at{" "}
          <strong>{phone}</strong> to discuss honest availability in <strong>{city}</strong>, partner device options, and how human Saha or nursing support can be combined.
        </p>
        <div className="mx-auto max-w-lg rounded-2xl bg-secondary/40 p-4 text-left text-xs space-y-1.5">
          <p className="font-semibold text-foreground">What happens next:</p>
          <p>• Review of your parent&apos;s living arrangement ({livingArrangement}) and primary concern ({primaryConcern}).</p>
          <p>• Clear separation of what is live on LifeSakhi, available via partners, or under evaluation.</p>
          <p>• Optional pairing plan with verified Saha attendants or registered nurses.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button type="button" variant="outline" className="rounded-full" onClick={() => setSubmittedRef(null)}>
            Submit Another Enquiry
          </Button>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-5 py-2 text-xs font-semibold text-[#128C7E]"
          >
            <MessageCircle className="size-4 text-[#25D366]" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-soft space-y-6"
      noValidate
    >
      {/* Intent Selector Pills */}
      <div className="space-y-2">
        <Label className="text-xs font-bold uppercase tracking-wider text-primary">
          1. How would you like to begin?
        </Label>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              "Request a Technology Demo",
              "Discuss a Senior-Care Technology Plan",
              "Explore Technology Partnerships",
              "Request a Care Consultation",
            ] as DiscoveryIntent[]
          ).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setIntent(option)}
              className={cn(
                "rounded-2xl border p-3 text-left text-xs font-semibold transition-all",
                intent === option
                  ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                  : "border-border bg-secondary/30 text-foreground hover:border-primary/50"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Situation Context */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Label htmlFor="tech-person">Person requiring support</Label>
          <select
            id="tech-person"
            value={personFor}
            onChange={(e) => setPersonFor(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium"
          >
            <option value="Mother">Mother</option>
            <option value="Father">Father</option>
            <option value="Both Parents">Both Parents</option>
            <option value="Spouse / Partner">Spouse / Partner</option>
            <option value="Self">Self</option>
            <option value="Senior Living / Institution">Senior Living / Institution</option>
          </select>
        </div>

        <div>
          <Label htmlFor="tech-age">Age group</Label>
          <select
            id="tech-age"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium"
          >
            <option value="60–69 years">60–69 years</option>
            <option value="70–79 years">70–79 years</option>
            <option value="80+ years">80+ years</option>
            <option value="Under 60 / Post-Op">Under 60 / Post-Op</option>
          </select>
        </div>

        <div>
          <Label htmlFor="tech-city">City</Label>
          <select
            id="tech-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium"
          >
            <option value="Bengaluru">Bengaluru</option>
            <option value="Chennai">Chennai</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Other City / NRI Family">Other City / NRI Family</option>
          </select>
        </div>

        <div>
          <Label htmlFor="tech-living">Living arrangement</Label>
          <select
            id="tech-living"
            value={livingArrangement}
            onChange={(e) => setLivingArrangement(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium"
          >
            <option value="Lives alone">Lives alone</option>
            <option value="Lives with elderly spouse">Lives with elderly spouse</option>
            <option value="Lives with family">Lives with family</option>
            <option value="Senior living residence">Senior living residence</option>
          </select>
        </div>
      </div>

      {/* Primary Concern + Human Care Combination + Existing Devices */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="tech-concern">Primary concern</Label>
          <select
            id="tech-concern"
            value={primaryConcern}
            onChange={(e) => setPrimaryConcern(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium"
          >
            <option value="Fall safety & emergencies">Fall safety &amp; emergencies</option>
            <option value="Chronic vitals monitoring">Chronic vitals monitoring</option>
            <option value="Medication adherence">Medication adherence</option>
            <option value="Dementia / memory support">Dementia / memory support</option>
            <option value="Post-hospital recovery">Post-hospital recovery</option>
            <option value="Social connection & daily help">Social connection &amp; daily help</option>
          </select>
        </div>

        <div>
          <Label htmlFor="tech-human">Combine with human care?</Label>
          <select
            id="tech-human"
            value={humanCarePairing}
            onChange={(e) => setHumanCarePairing(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium"
          >
            <option value="Pair with Saha companion">Pair with Saha companion</option>
            <option value="Pair with Registered Nurse">Pair with Registered Nurse</option>
            <option value="Both Saha & Nurse">Both Saha &amp; Nurse</option>
            <option value="Technology consultation only">Technology consultation only</option>
          </select>
        </div>

        <div>
          <Label htmlFor="tech-existing">Existing devices (if any)</Label>
          <Input
            id="tech-existing"
            value={existingDevices}
            onChange={(e) => setExistingDevices(e.target.value)}
            placeholder="e.g. BP cuff, smartwatch, smart speaker"
            className="mt-1.5 h-11 rounded-xl text-xs"
          />
        </div>
      </div>

      {/* Required Technologies Multi-Select */}
      <div className="space-y-2.5">
        <Label className="text-xs font-bold uppercase tracking-wider text-primary">
          2. Required technologies (select one or more)
        </Label>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {ASSISTED_LIVING_TECH_CATEGORIES.map((t) => {
            const checked = selectedTechs.includes(t.id);
            return (
              <label
                key={t.id}
                className={cn(
                  "flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-xs cursor-pointer transition-colors",
                  checked
                    ? "border-primary bg-primary-soft/50 font-semibold text-foreground"
                    : "border-border bg-background hover:border-primary/40 text-muted-foreground"
                )}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleTech(t.id)}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      "grid size-4 shrink-0 place-items-center rounded border",
                      checked ? "bg-primary border-primary text-white" : "border-border bg-card"
                    )}
                  >
                    {checked && <Check className="size-3" />}
                  </span>
                  <span className="text-foreground">{t.name}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Optional Bundle + Consultation Method */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="tech-bundle">Interested in a proposed solution bundle? (Optional)</Label>
          <select
            id="tech-bundle"
            value={selectedBundle}
            onChange={(e) => setSelectedBundle(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium"
          >
            <option value="">None / Custom mix</option>
            {INDIA_SOLUTION_BUNDLES.map((b) => (
              <option key={b.id} value={b.id}>
                {b.code}: {b.name} (Proposed)
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="tech-method">Preferred consultation method</Label>
          <select
            id="tech-method"
            value={consultationMethod}
            onChange={(e) => setConsultationMethod(e.target.value)}
            className="mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium"
          >
            <option value="Video call">Video call</option>
            <option value="Phone call">Phone call</option>
            <option value="Home assessment visit">Home assessment visit</option>
          </select>
        </div>
      </div>

      {/* Contact Details */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <Label htmlFor="tech-name">Your Full Name *</Label>
          <Input
            id="tech-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ananya Krishnan"
            className="mt-1.5 h-11 rounded-xl text-xs"
            required
          />
        </div>
        <div>
          <Label htmlFor="tech-phone">Mobile / WhatsApp Number *</Label>
          <Input
            id="tech-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98XXX XXXXX"
            className="mt-1.5 h-11 rounded-xl text-xs"
            required
          />
        </div>
        <div>
          <Label htmlFor="tech-email">Email (Optional)</Label>
          <Input
            id="tech-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="family@example.com"
            className="mt-1.5 h-11 rounded-xl text-xs"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="tech-notes">Additional context (Optional)</Label>
        <Textarea
          id="tech-notes"
          rows={2}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Share any language preferences, health context, or questions for our team..."
          className="mt-1.5 rounded-xl text-xs"
        />
      </div>

      {error && (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
          <AlertCircle className="size-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-border/70">
        <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
          <ShieldCheck className="size-4 text-primary shrink-0" aria-hidden />
          <span>No obligation. Clear guidance on what is deployed today vs partner-available.</span>
        </p>
        <Button type="submit" variant="warm" size="lg" disabled={submitting} className="rounded-full font-semibold">
          {submitting ? "Submitting..." : intent}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </form>
  );
}
