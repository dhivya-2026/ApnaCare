import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  ShieldCheck,
  Stethoscope,
  RotateCcw,
  MessageSquare,
  Receipt,
  AlertCircle,
  CheckCircle2,
  Check,
  ArrowRight,
  Sparkles,
  CalendarCheck,
  PhoneCall,
  LayoutGrid,
  Layers,
} from "lucide-react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export interface CoordinationArea {
  id: string;
  iconName: "search" | "shield" | "stethoscope" | "backup" | "updates" | "pricing";
  category: string;
  shortLabel: string;
  tagline: string;
  independent: {
    headline: string;
    badge: string;
    painPoints: string[];
    riskFactor: string;
  };
  apnaCare: {
    headline: string;
    badge: string;
    solutions: string[];
    operationalGuarantee: string;
  };
  recommendedAction: string;
  serviceTarget: string;
}

export const COORDINATION_AREAS: CoordinationArea[] = [
  {
    id: "finding-support",
    iconName: "search",
    category: "Finding & Assessing Suitable Support",
    shortLabel: "Caregiver Matching",
    tagline: "Matched by mobility needs & timing — not informal broker classifieds",
    independent: {
      headline: "Scattered Calls & Uncertain Availability",
      badge: "Arranging Independently",
      painPoints: [
        "Calling 4–6 informal domestic agencies with unconfirmed schedules",
        "Relying on self-reported claims with zero verified background checks",
        "Uncertainty about identity or history before opening your home door",
      ],
      riskFactor: "High family anxiety & unpredictable first-day arrival",
    },
    apnaCare: {
      headline: "Pre-Screened Caregiver Clusters",
      badge: "With ApnaCare Coordination",
      solutions: [
        "Direct matching from vetted caregiver clusters based on assessed mobility needs",
        "Standardized review: Government photo ID authentication & police verification filings",
        "Verified digital profile previewed and confirmed with family before day one",
      ],
      operationalGuarantee: "Government ID & police verification pre-filing protocol",
    },
    recommendedAction: "Request Caregiver Profile Preview",
    serviceTarget: "elderly-care",
  },
  {
    id: "identity-vetting",
    iconName: "shield",
    category: "Reviewing Identity & Background Evidence",
    shortLabel: "Police & ID Vetting",
    tagline: "Aadhaar photo authentication and local police verification before placement",
    independent: {
      headline: "Unverified Photocopies & Informal Claims",
      badge: "Arranging Independently",
      painPoints: [
        "Accepting blurry photocopies without formal address or background validation",
        "No verified mechanism to check prior care records or criminal history",
        "Lack of standardized safety onboarding protocols or verified dossiers",
      ],
      riskFactor: "Zero legal traceability if household issues arise",
    },
    apnaCare: {
      headline: "Rigorous 4-Step Verification Dossier",
      badge: "With ApnaCare Coordination",
      solutions: [
        "100% government photo ID authentication and police verification records",
        "State Nursing Council credentials verified for all licensed GNM/B.Sc clinical nurses",
        "Practical training in mobility ergonomics, fall prevention, and dignity protocols",
      ],
      operationalGuarantee: "Verified digital credential file shared before shift start",
    },
    recommendedAction: "View Verification Standards",
    serviceTarget: "elderly-care",
  },
  {
    id: "attendant-vs-nurse",
    iconName: "stethoscope",
    category: "Clarifying Attendant vs. Nurse Responsibilities",
    shortLabel: "Scope & Boundaries",
    tagline: "Clear medical boundaries protect your family's clinical safety",
    independent: {
      headline: "Unclear Roles & Medical Safety Risks",
      badge: "Arranging Independently",
      painPoints: [
        "Dangerous confusion between domestic maids, attendants, and trained clinical nurses",
        "Risk of uncertified staff attempting sterile wound dressings, IVs, or catheter care",
        "No documented checklist of daily hygiene responsibilities or emergency limits",
      ],
      riskFactor: "Risk of clinical complications or medication administration errors",
    },
    apnaCare: {
      headline: "Strict Attendant vs. Licensed Nurse Boundary",
      badge: "With ApnaCare Coordination",
      solutions: [
        "Non-clinical attendants support bathing, personal hygiene, and assisted walking",
        "Injections, catheter changes, and sterile dressings performed strictly by licensed nurses",
        "Explicit daily task plan agreed between family and local care coordinator",
      ],
      operationalGuarantee: "Procedures performed strictly per written doctor orders",
    },
    recommendedAction: "Consult Our Triage Specialist",
    serviceTarget: "nursing-services",
  },
  {
    id: "backup-continuity",
    iconName: "backup",
    category: "Coordinating Schedules, Backup & Continuity",
    shortLabel: "Cluster Standby Backup",
    tagline: "Regional standby protocol ensures you are never left stranded on helper leave",
    independent: {
      headline: "Scrambling with Zero Notice or Backup",
      badge: "Arranging Independently",
      painPoints: [
        "If the attendant falls sick or leaves, your family is left stranded with zero notice",
        "Forced emergency leaves from work to cover bedside duties personally",
        "Repeating training, routines, and patient quirks from scratch with new candidates",
      ],
      riskFactor: "Caregiver burnout and emergency work interruptions",
    },
    apnaCare: {
      headline: "Cluster-Based Standby & Fast Replacement",
      badge: "With ApnaCare Coordination",
      solutions: [
        "Cluster-based standby network across Bengaluru, Chennai, Hyderabad, & Coimbatore",
        "Priority replacement caregiver reassignment with zero onboarding fee penalty",
        "Documented care log ensures continuity so the replacement knows the routine",
      ],
      operationalGuarantee: "90-minute regional backup response protocol",
    },
    recommendedAction: "Check Your City's Cluster Readiness",
    serviceTarget: "hospital-attendants",
  },
  {
    id: "daily-updates",
    iconName: "updates",
    category: "Providing Agreed Family Updates & Logs",
    shortLabel: "Daily WhatsApp Logs",
    tagline: "Structured daily updates keep distant adult children fully in the loop",
    independent: {
      headline: "Constant Worry & Anxious Check-In Calls",
      badge: "Arranging Independently",
      painPoints: [
        "Frequent interruption of your work day to call and confirm meals or medications",
        "No objective record of patient appetite, hydration, vitals, or daily mood",
        "High anxiety for sons and daughters living in another city or abroad",
      ],
      riskFactor: "Persistent worry and lack of objective care tracking",
    },
    apnaCare: {
      headline: "Scheduled WhatsApp Summaries & Care Logs",
      badge: "With ApnaCare Coordination",
      solutions: [
        "Daily digital wellness logs recording meals, mobility routines, and hydration",
        "Direct contact with a dedicated regional care coordinator at all times",
        "Complete peace of mind knowing your parent is safe and cared for with dignity",
      ],
      operationalGuarantee: "Dedicated regional coordinator assigned to your family",
    },
    recommendedAction: "See Sample Care Log Summary",
    serviceTarget: "lifestyle-support",
  },
  {
    id: "transparent-pricing",
    iconName: "pricing",
    category: "Explaining Pricing, GST & Next Steps",
    shortLabel: "Transparent Invoicing",
    tagline: "Clear daily/monthly rates, official GST tax invoices, and zero brokerage surprises",
    independent: {
      headline: "Hidden Surcharges & Cash Uncertainty",
      badge: "Arranging Independently",
      painPoints: [
        "Surprise agency brokerage cuts, travel surcharges, or arbitrary cash demands",
        "No formal tax invoices available for healthcare accounting or employer reimbursement",
        "Vague refund or cancellation policies if the caregiver is not a suitable match",
      ],
      riskFactor: "Unpredictable costs and zero consumer recourse",
    },
    apnaCare: {
      headline: "All-Inclusive Clear Rates with GST Invoicing",
      badge: "With ApnaCare Coordination",
      solutions: [
        "Transparent daily rates starting from ₹1,099/day with itemized GST documentation",
        "Legitimate tax invoices for health accounts, employer claims, or insurance filings",
        "Flexible trial periods and transparent pause/cancel policies anytime",
      ],
      operationalGuarantee: "Zero hidden broker commissions — 100% itemized",
    },
    recommendedAction: "View Transparent Pricing Table",
    serviceTarget: "elderly-care",
  },
];

function AreaIcon({ name, className }: { name: CoordinationArea["iconName"]; className?: string }) {
  switch (name) {
    case "search":
      return <Search className={className} />;
    case "shield":
      return <ShieldCheck className={className} />;
    case "stethoscope":
      return <Stethoscope className={className} />;
    case "backup":
      return <RotateCcw className={className} />;
    case "updates":
      return <MessageSquare className={className} />;
    case "pricing":
      return <Receipt className={className} />;
  }
}

export function CareCoordinationExplorer() {
  const [activeId, setActiveId] = useState<string>(COORDINATION_AREAS[0].id);
  const [viewAll, setViewAll] = useState<boolean>(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeArea = COORDINATION_AREAS.find((a) => a.id === activeId) ?? COORDINATION_AREAS[0];
  const activeIndex = COORDINATION_AREAS.findIndex((a) => a.id === activeId);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % COORDINATION_AREAS.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + COORDINATION_AREAS.length) % COORDINATION_AREAS.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = COORDINATION_AREAS.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    const nextArea = COORDINATION_AREAS[nextIndex];
    setActiveId(nextArea.id);
    tabRefs.current[nextIndex]?.focus();
    track("coordination_area_tab_switch", {
      area_id: nextArea.id,
      method: "keyboard",
    });
  };

  return (
    <section
      id="coordination-value"
      className="py-16 md:py-24 border-b border-border/60 bg-gradient-to-b from-secondary/20 via-background to-secondary/15 scroll-mt-20"
      aria-labelledby="coordination-heading"
    >
      <div className="container-page">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" />
              <span>Making Care Coordination Visible</span>
            </div>
            <h2
              id="coordination-heading"
              className="mt-3 text-fluid-section font-display font-semibold text-foreground tracking-tight"
            >
              How ApnaCare Lightens the Burden on Families
            </h2>
            <p className="mt-3 text-fluid-body text-readable-muted">
              Arranging care is rarely just finding a person. It is background vetting, emergency replacements, medical boundaries, and daily peace of mind.
            </p>
          </div>

          {/* Toggle between Tabbed Explorer and Full Grid View */}
          <div className="flex items-center gap-2 self-start md:self-end shrink-0">
            <button
              type="button"
              onClick={() => {
                const next = !viewAll;
                setViewAll(next);
                track("coordination_view_mode_toggle", { view: next ? "all" : "interactive" });
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-secondary/40 transition-colors shadow-2xs min-h-[40px] cursor-pointer"
              aria-label={viewAll ? "Switch to interactive tab view" : "View all 6 areas side-by-side"}
            >
              {viewAll ? (
                <>
                  <Layers className="size-3.5 text-primary" />
                  <span>Switch to Tab Explorer</span>
                </>
              ) : (
                <>
                  <LayoutGrid className="size-3.5 text-primary" />
                  <span>View All 6 Areas</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── INTERACTIVE TAB EXPLORER (Default) ── */}
        {!viewAll && (
          <div className="mt-10">
            {/* Segmented Control / Tablist with 6 items */}
            <div
              role="tablist"
              aria-label="Care coordination dimensions"
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-1.5 rounded-2xl bg-secondary/40 border border-border/80"
            >
              {COORDINATION_AREAS.map((area, idx) => {
                const isSelected = area.id === activeId;
                return (
                  <button
                    key={area.id}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`tab-${area.id}`}
                    aria-selected={isSelected}
                    aria-controls={`panel-${area.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => {
                      setActiveId(area.id);
                      track("coordination_area_tab_switch", {
                        area_id: area.id,
                        method: "click",
                      });
                    }}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1.5 rounded-xl px-2.5 py-3 text-center transition-all min-h-[58px] cursor-pointer relative",
                      isSelected
                        ? "bg-card text-foreground font-bold shadow-soft border border-primary/20 ring-1 ring-primary/30"
                        : "text-readable-muted hover:text-foreground hover:bg-card/50 font-medium"
                    )}
                  >
                    <AreaIcon
                      name={area.iconName}
                      className={cn(
                        "size-4 shrink-0 transition-colors",
                        isSelected ? "text-primary scale-110" : "text-muted-foreground"
                      )}
                    />
                    <span className="text-[11px] sm:text-xs leading-tight line-clamp-2">
                      {area.shortLabel}
                    </span>
                    {isSelected && (
                      <span className="absolute -bottom-1 size-1.5 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Tab Panel */}
            <div
              role="tabpanel"
              id={`panel-${activeArea.id}`}
              aria-labelledby={`tab-${activeArea.id}`}
              className="mt-6 rounded-3xl border border-border bg-card p-6 sm:p-8 md:p-10 shadow-soft transition-all duration-300"
            >
              {/* Panel Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border/70">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary-soft text-primary font-bold text-[11px] px-2.5 py-0.5 uppercase tracking-wider">
                      Area {activeIndex + 1} of 6
                    </span>
                    <span className="text-xs text-readable-muted font-medium">
                      {activeArea.category}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl sm:text-2xl font-bold font-display text-foreground">
                    {activeArea.tagline}
                  </h3>
                </div>

                <div className="shrink-0">
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft/50 px-3.5 py-1.5 text-xs font-semibold text-primary">
                    <ShieldCheck className="size-4 shrink-0" />
                    <span>{activeArea.apnaCare.operationalGuarantee}</span>
                  </div>
                </div>
              </div>

              {/* Side-by-Side Comparison Columns */}
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {/* Left: Arranging Independently (Factual strain) */}
                <div className="rounded-2xl border border-amber-600/20 bg-amber-500/5 p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                        <AlertCircle className="size-4 shrink-0" />
                        {activeArea.independent.badge}
                      </span>
                      <span className="text-[10px] font-semibold text-amber-900/70 dark:text-amber-300/70 uppercase">
                        Uncoordinated
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-foreground">
                      {activeArea.independent.headline}
                    </h4>

                    <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-readable-muted">
                      {activeArea.independent.painPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5">
                          <span className="text-amber-700 dark:text-amber-400 font-bold mt-0.5">•</span>
                          <span className="leading-snug">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-3 border-t border-amber-500/15 text-[11px] text-amber-900/80 dark:text-amber-300 font-medium flex items-center gap-1.5">
                    <AlertCircle className="size-3.5 shrink-0" />
                    <span>Risk: {activeArea.independent.riskFactor}</span>
                  </div>
                </div>

                {/* Right: ApnaCare Coordinated Solution */}
                <div className="rounded-2xl border border-primary/30 bg-primary-soft/35 p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                        <CheckCircle2 className="size-4 shrink-0 text-primary" />
                        {activeArea.apnaCare.badge}
                      </span>
                      <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-full">
                        Fully Coordinated
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-foreground">
                      {activeArea.apnaCare.headline}
                    </h4>

                    <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-foreground">
                      {activeArea.apnaCare.solutions.map((sol, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2.5">
                          <Check className="size-4 text-primary shrink-0 mt-0.5" />
                          <span className="leading-snug font-medium">{sol}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-3 border-t border-primary/20 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-primary font-semibold">
                      Standardized regional protocol
                    </span>
                    <Link
                      to={`/services/${activeArea.serviceTarget}`}
                      onClick={() =>
                        track("coordination_action_click", {
                          area_id: activeArea.id,
                          action: activeArea.recommendedAction,
                        })
                      }
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline min-h-[36px]"
                    >
                      <span>{activeArea.recommendedAction}</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Action Bar */}
              <div className="mt-8 pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-readable-muted text-center sm:text-left">
                  Have questions about this coordination dimension for your specific city?
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="#booking-flow"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 transition-all min-h-[44px]"
                  >
                    <CalendarCheck className="size-3.5" />
                    <span>Book Care Assessment</span>
                  </a>
                  <a
                    href="tel:+918000000000"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-card px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-secondary/40 transition-all min-h-[44px]"
                  >
                    <PhoneCall className="size-3.5 text-primary" />
                    <span>Talk to Coordinator</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── FULL 6-AREA VIEW (For Print / Scan View) ── */}
        {viewAll && (
          <div className="mt-10 space-y-6 animate-fade-in">
            {COORDINATION_AREAS.map((area, idx) => (
              <div
                key={area.id}
                className="rounded-3xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="rounded-full bg-primary-soft text-primary font-bold text-[10px] px-2.5 py-0.5 uppercase">
                    Area {idx + 1}
                  </span>
                  <h3 className="font-display text-base font-bold text-foreground">
                    {area.category}
                  </h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  <div className="rounded-2xl border border-amber-600/20 bg-amber-500/5 p-4">
                    <p className="text-xs font-bold text-amber-800 dark:text-amber-400 mb-1">
                      Independent: {area.independent.headline}
                    </p>
                    <ul className="space-y-1 text-xs text-readable-muted">
                      {area.independent.painPoints.map((p, i) => (
                        <li key={i}>• {p}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-primary/30 bg-primary-soft/30 p-4">
                    <p className="text-xs font-bold text-primary mb-1">
                      ApnaCare: {area.apnaCare.headline}
                    </p>
                    <ul className="space-y-1 text-xs text-foreground">
                      {area.apnaCare.solutions.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5 font-medium">
                          <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
