import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  HeartHandshake,
  Users,
  Building2,
  Stethoscope,
  Activity,
  ShieldAlert,
  Brain,
  Car,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Search,
  X,
  Clock,
  ShieldCheck,
  Phone,
  MessageCircle,
  Check,
  Sparkles,
  Info,
  Calendar,
  Languages,
  ChevronRight,
} from "lucide-react";
import {
  SENIOR_CARE_CATEGORIES,
  SENIOR_CARE_SERVICES,
  type SeniorCareCategoryId,
  type SeniorCareServiceItem,
  getSeniorCareService,
} from "@/data/senior-care-catalog";
import { SITE, buildWhatsAppUrl, formatINR } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { track } from "@/lib/analytics";

interface SeniorCareDirectoryProps {
  initialServiceSlug?: string;
  initialCategoryId?: SeniorCareCategoryId;
  initialQuery?: string;
}

export function SeniorCareDirectory({
  initialServiceSlug,
  initialCategoryId,
  initialQuery = "",
}: SeniorCareDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<SeniorCareCategoryId | "all">(
    initialCategoryId || "all"
  );
  const [activeModalService, setActiveModalService] = useState<SeniorCareServiceItem | null>(() => {
    if (initialServiceSlug) {
      return getSeniorCareService(initialServiceSlug) || null;
    }
    return null;
  });

  // Keep state in sync if initialServiceSlug changes via URL
  useEffect(() => {
    if (initialServiceSlug) {
      const found = getSeniorCareService(initialServiceSlug);
      if (found) {
        setActiveModalService(found);
      }
    }
  }, [initialServiceSlug]);

  // Filtered services
  const filteredServices = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return SENIOR_CARE_SERVICES.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.categoryId !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (!q) return true;

      const inName = item.name.toLowerCase().includes(q);
      const inOneLiner = item.oneLiner.toLowerCase().includes(q);
      const inDesc = item.description.toLowerCase().includes(q);
      const inCategory = item.categoryLabel.toLowerCase().includes(q);
      const inInclusions = item.inclusions.some((inc) => inc.toLowerCase().includes(q));
      const inWhoFor = item.whoFor.some((w) => w.toLowerCase().includes(q));
      const inProvider = item.providerType.toLowerCase().includes(q);

      return inName || inOneLiner || inDesc || inCategory || inInclusions || inWhoFor || inProvider;
    });
  }, [searchQuery, selectedCategory]);

  const activeCategoryInfo = useMemo(() => {
    if (selectedCategory === "all") return null;
    return SENIOR_CARE_CATEGORIES.find((c) => c.id === selectedCategory) || null;
  }, [selectedCategory]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    track("senior_directory_reset_filters");
  };

  const openServiceDetails = (service: SeniorCareServiceItem) => {
    setActiveModalService(service);
    track("senior_directory_view_details", {
      service_slug: service.slug,
      service_name: service.name,
      category: service.categoryId,
    });
  };

  const closeServiceDetails = () => {
    setActiveModalService(null);
  };

  return (
    <div className="bg-background text-foreground">
      {/* ─────────────────────────────────────────────────────────────
          1. DIRECTORY HERO: Context & Scope
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/40 via-background to-background py-16 md:py-24">
        <div className="container-page">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="size-3.5 text-muted-foreground/60" />
            <Link to="/services" className="hover:text-foreground">Services</Link>
            <ChevronRight className="size-3.5 text-muted-foreground/60" />
            <span className="font-semibold text-foreground">Senior Care Directory</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur">
              <Sparkles className="size-3.5 text-terracotta" />
              <span>Comprehensive Senior Care Directory</span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight">
              Every Senior Care Need. Clearly Defined, Verified & Supported.
            </h1>

            <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg leading-relaxed">
              From routine daily bathing and warm companionship to hospital outpatient companions and post-surgical recovery—discover the exact support your parents need. Filter by daily challenges, clinical requirements, or hospital appointments.
            </p>

            {/* High-Trust Dignified Micro-Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5 text-xs font-semibold text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-card px-3 py-1 text-foreground shadow-2xs">
                <ShieldCheck className="size-3.5 text-primary" />
                25+ Specialized Senior Offerings
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-card px-3 py-1 text-foreground shadow-2xs">
                <Languages className="size-3.5 text-terracotta" />
                Language-Matched (Tamil / Telugu / Kannada / English)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-card px-3 py-1 text-foreground shadow-2xs">
                <CheckCircle2 className="size-3.5 text-primary" />
                100% Background-Screened Attendants
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-card px-3 py-1 text-foreground shadow-2xs">
                <Clock className="size-3.5 text-primary" />
                90-Min Standby Replacement Backup
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. LIVE SEARCH & QUICK NEED FILTERS
      ───────────────────────────────────────────────────────────── */}
      <section className="sticky top-16 z-20 border-b border-border bg-card/95 py-4 backdrop-blur shadow-2xs">
        <div className="container-page space-y-3">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Live Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by need: e.g. hospital visit, bathing, dementia, injection, wheelchair..."
                className="w-full rounded-2xl border border-border bg-background pl-10 pr-9 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                aria-label="Search senior care services"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
                  aria-label="Clear search"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Results counter & Reset */}
            <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
              <span>
                Showing <strong className="text-foreground">{filteredServices.length}</strong> of{" "}
                {SENIOR_CARE_SERVICES.length} services
              </span>
              {(searchQuery || selectedCategory !== "all") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="font-semibold text-primary hover:underline"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Quick Need Category Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" role="tablist" aria-label="Service categories">
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "all"}
              onClick={() => setSelectedCategory("all")}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "border border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              All Categories ({SENIOR_CARE_SERVICES.length})
            </button>
            {SENIOR_CARE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = SENIOR_CARE_SERVICES.filter((s) => s.categoryId === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    track("senior_directory_category_select", { category: cat.id });
                  }}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-2xs"
                      : "border border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  <span className="font-bold opacity-75">{cat.code}.</span>
                  <span>{cat.shortName}</span>
                  <span className="rounded-full bg-black/10 dark:bg-white/10 px-1.5 py-0.2 text-[10px]">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. ACTIVE CATEGORY BANNER (If Selected)
      ───────────────────────────────────────────────────────────── */}
      {activeCategoryInfo && (
        <section className="border-b border-border bg-secondary/30 py-6">
          <div className="container-page flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
                Category {activeCategoryInfo.code} · {activeCategoryInfo.badge}
              </span>
              <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-foreground">
                {activeCategoryInfo.name}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-2xl">
                {activeCategoryInfo.description}
              </p>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-card p-3 text-xs text-foreground/90 max-w-md shadow-2xs">
              <p className="font-bold text-primary flex items-center gap-1.5 mb-0.5">
                <Info className="size-3.5" /> Provider Scope & Safety:
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {activeCategoryInfo.providerScopeNotice}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. SERVICE CATALOGUE CARDS GRID
      ───────────────────────────────────────────────────────────── */}
      <section className="container-page py-12 md:py-16">
        {filteredServices.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-secondary text-muted-foreground mb-3">
              <Search className="size-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">No matching services found</h3>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              We couldn't find a service matching "{searchQuery}". Try broader search terms like "bath", "hospital", "companion", or browse all categories.
            </p>
            <Button onClick={resetFilters} variant="outline" size="sm" className="mt-4 rounded-full">
              Reset search & filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => {
              const isHospitalCompanion = service.slug === "hospital-visit-companion";
              return (
                <div
                  key={service.id}
                  className={`group flex flex-col justify-between rounded-3xl border transition-all duration-300 hover:shadow-lift ${
                    isHospitalCompanion
                      ? "border-primary/40 bg-gradient-to-b from-primary-soft/40 via-card to-card shadow-soft ring-1 ring-primary/20"
                      : "border-border bg-card hover:border-primary/30"
                  } p-6 sm:p-7`}
                >
                  <div className="space-y-4">
                    {/* Header: Category Code & Provider Role Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                        Cat {service.categoryCode} · {service.categoryLabel}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          service.providerRoleTag === "Clinical Nurse"
                            ? "bg-blue-500/15 text-blue-700 dark:text-blue-400"
                            : service.providerRoleTag === "Therapist / Doctor"
                            ? "bg-purple-500/15 text-purple-700 dark:text-purple-400"
                            : service.providerRoleTag === "Transit Escort"
                            ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                            : "bg-primary/15 text-primary"
                        }`}
                      >
                        {service.providerRoleTag}
                      </span>
                    </div>

                    {/* Service Name */}
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {service.name}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {service.oneLiner}
                      </p>
                    </div>

                    {/* Who It Is For */}
                    <div className="rounded-2xl bg-secondary/40 p-3 text-xs">
                      <p className="font-bold text-foreground/80 mb-1">Recommended For:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        {service.whoFor.slice(0, 2).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-primary mt-0.5">•</span>
                            <span className="line-clamp-2">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Inclusions checklist (3 items) */}
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Key Inclusions:
                      </p>
                      <ul className="space-y-1.5 text-xs text-foreground/90">
                        {service.inclusions.slice(0, 3).map((inc, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="size-3.5 text-primary shrink-0 mt-0.5" />
                            <span className="line-clamp-2">{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer: Status, Price & CTAs */}
                  <div className="mt-6 pt-5 border-t border-border/80 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">{service.estimatedRate}</span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          service.status === "VERIFIED_AVAILABLE"
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                            : service.status === "ASSESSMENT_REQUIRED"
                            ? "bg-amber-500/15 text-amber-700 dark:text-amber-400"
                            : "bg-purple-500/15 text-purple-700 dark:text-purple-400"
                        }`}
                      >
                        <span className="size-1.5 rounded-full bg-current"></span>
                        {service.statusBadge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => openServiceDetails(service)}
                        className="flex-1 rounded-full text-xs font-semibold"
                      >
                        View Details
                      </Button>

                      <Button
                        asChild
                        variant={isHospitalCompanion ? "warm" : "default"}
                        size="sm"
                        className="flex-1 rounded-full text-xs font-bold"
                      >
                        <Link
                          to="/booking"
                          search={{
                            service: service.baseBookingSlug,
                            situation: service.name,
                          }}
                          onClick={() =>
                            track("senior_directory_book_click", {
                              service_slug: service.slug,
                              service_name: service.name,
                            })
                          }
                        >
                          Book Service
                          <ArrowRight className="ml-1 size-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. HOSPITAL VISIT COMPANION SPOTLIGHT (Featured Requirement)
      ───────────────────────────────────────────────────────────── */}
      <section className="border-y border-primary/20 bg-gradient-to-b from-primary-soft/30 via-secondary/20 to-card py-16 md:py-24">
        <div className="container-page">
          <div className="max-w-3xl">
            <span className="eyebrow text-terracotta">Featured Specialization</span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Hospital Visit Companion (Outpatient OPD & Scans)
            </h2>
            <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
              When work meetings clash with your father's multi-hour hospital checkup or diagnostic scan, ApnaCare steps in. We provide door-to-door accompaniment, wheelchair navigation, waiting lounge vigil, and safe return home.
            </p>
          </div>

          {/* 5-Step Roadmap */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                step: "01",
                title: "Doorstep Meet",
                desc: "Companion arrives 45 mins early at residence, checks appointment slip, and coordinates cab.",
              },
              {
                step: "02",
                title: "Registration & Token",
                desc: "Secures wheelchair at hospital porch, stands in OPD token queues, and gets registration done.",
              },
              {
                step: "03",
                title: "Waiting Vigil",
                desc: "Sits with senior through long waits, provides water, helps with washrooms, and tracks tokens.",
              },
              {
                step: "04",
                title: "Lab & Scans",
                desc: "Escorts senior to phlebotomy or radiology departments and collects pharmacy prescription.",
              },
              {
                step: "05",
                title: "Safe Return",
                desc: "Accompanies senior safely into home living room and dispatches WhatsApp completion log to family.",
              },
            ].map((st) => (
              <div
                key={st.step}
                className="relative rounded-3xl border border-border bg-card p-6 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <span className="font-display text-2xl font-bold text-primary opacity-60">
                    {st.step}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-foreground">{st.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Explicit Safety Boundary Card */}
          <div className="mt-8 rounded-3xl border border-border/80 bg-card p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2 mb-3">
                  <CheckCircle2 className="size-4" /> What Hospital Companions Do:
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-foreground/90">
                  <li className="flex items-start gap-2">
                    <Check className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>Provide gentle physical elbow support and hospital wheelchair coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>Stand in long registration, token, and pharmacy billing queues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>Send milestone WhatsApp updates (Arrived / With Doctor / Returning)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>Ensure senior is safely settled back into their home armchair</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-destructive flex items-center gap-2 mb-3">
                  <XCircle className="size-4" /> Strict Boundaries (What Companions Do NOT Do):
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive font-bold shrink-0">✕</span>
                    <span>Companions do NOT make medical decisions or give consent on behalf of the family</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive font-bold shrink-0">✕</span>
                    <span>Companions do NOT diagnose, interpret CT/MRI films, or alter prescriptions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive font-bold shrink-0">✕</span>
                    <span>Companions do NOT act as emergency resuscitation ambulances (call 108 for critical emergencies)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-foreground">
                  Need a companion for an upcoming appointment?
                </p>
                <p className="text-xs text-muted-foreground">
                  Starting at ₹1,199 per visit (up to 5 hours) across Bengaluru, Chennai, Hyderabad & Coimbatore.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Button asChild variant="warm" className="rounded-full px-6 font-bold">
                  <Link
                    to="/booking"
                    search={{
                      service: "hospital-attendants",
                      situation: "Hospital Visit Companion (Outpatient OPD)",
                    }}
                  >
                    Book Hospital Companion
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <a
                  href={buildWhatsAppUrl(
                    "Hi ApnaCare! I would like to book a Hospital Visit Companion for my parent's upcoming doctor appointment."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#25D366] bg-[#25D366]/10 px-5 py-2 text-xs font-semibold text-[#128C7E] hover:bg-[#25D366]/20 transition-colors"
                >
                  <MessageCircle className="size-3.5 text-[#25D366]" />
                  WhatsApp Desk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. ASSISTED INTAKE: "Not Sure What You Need?"
      ───────────────────────────────────────────────────────────── */}
      <section className="container-page py-16 md:py-20">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-secondary/30 p-8 sm:p-12 shadow-soft">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] items-center">
            <div>
              <span className="eyebrow">Assisted Intake Consultation</span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-foreground">
                Not sure what kind of care your parent needs?
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                Aging health needs rarely fit into neat single checkboxes. Speak directly with an ApnaCare care coordinator. We will listen to your parent's mobility, medications, and routine, and suggest an honest, right-sized care plan without pushing unnecessary services.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={buildWhatsAppUrl(
                    "Hello ApnaCare Coordinator! I am not sure what care service my elderly parent needs. Can you help me evaluate?"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#128C7E] px-6 py-3 text-sm font-bold text-white shadow-soft transition-transform hover:scale-102"
                >
                  <MessageCircle className="size-4" />
                  Free 10-Min Care Assessment on WhatsApp
                </a>

                <a
                  href={`tel:${SITE.SUPPORT_PHONE_TEL}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary/40 transition-colors"
                >
                  <Phone className="size-4 text-primary" />
                  Call {SITE.SUPPORT_PHONE}
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-background/90 p-6 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-terracotta">
                Care Assessment Checklist
              </h3>
              <ul className="space-y-2.5 text-xs text-foreground/90 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>Mobility assessment (walker, bed-bound, or steady)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>Shift timing recommendation (4 hrs, 12 hrs, or 24 hrs)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>Language preference matched (Tamil / Kannada / Telugu)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>Clinical vs. supportive care boundary verification</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. HOW IT WORKS: 4-Step Trust Protocol
      ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-secondary/20 py-16 md:py-24">
        <div className="container-page">
          <div className="max-w-2xl">
            <span className="eyebrow">Operating Protocol</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              How ApnaCare Coordinates Your Senior's Care
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Four structured checkpoints ensuring your family receives safe, respectful, and verified care.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Need Intake",
                desc: "We review your senior's health condition, mobility status, language requirement, and preferred shift hours.",
              },
              {
                step: "02",
                title: "Caregiver Matching",
                desc: "We match a verified female attendant or registered nurse trained in geriatric handling who speaks their language.",
              },
              {
                step: "03",
                title: "Profile & ID Sharing",
                desc: "Before placement, you receive the attendant's photo, Aadhaar verification badge, and police clearance dossier.",
              },
              {
                step: "04",
                title: "Daily Care Logs",
                desc: "Daily WhatsApp health updates recording meal times, vitals, and medication administration with coordinator oversight.",
              },
            ].map((p) => (
              <div key={p.step} className="rounded-3xl border border-border bg-card p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="font-display text-3xl font-bold text-primary/40">{p.step}</span>
                  <h3 className="mt-3 text-base font-bold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. TRUST & SAFETY VERIFICATION STANDARDS
      ───────────────────────────────────────────────────────────── */}
      <section className="container-page py-16 md:py-24">
        <div className="max-w-3xl">
          <span className="eyebrow">Verified Safety Standards</span>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
            Why Families Can Rely on ApnaCare Caregivers
          </h2>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            Inviting an attendant into your aging parents' home is a sacred matter of trust. Every caregiver passes our mandatory 5-step screening protocol before their first placement.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-2xs">
            <span className="grid size-10 place-items-center rounded-2xl bg-primary/10 text-primary font-bold mb-3">
              <ShieldCheck className="size-5" />
            </span>
            <h3 className="text-base font-bold text-foreground">100% Police & Court Screened</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Biometric Aadhaar identity validation combined with criminal record checks through certified legal intelligence partners before any home entry.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-2xs">
            <span className="grid size-10 place-items-center rounded-2xl bg-terracotta/10 text-terracotta font-bold mb-3">
              <Clock className="size-5" />
            </span>
            <h3 className="text-base font-bold text-foreground">90-Minute Emergency Standby</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              If an attendant falls unwell or faces a personal emergency, our local city cluster dispatch ensures verified backup within 90 minutes.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-2xs">
            <span className="grid size-10 place-items-center rounded-2xl bg-primary/10 text-primary font-bold mb-3">
              <Languages className="size-5" />
            </span>
            <h3 className="text-base font-bold text-foreground">Language & Cultural Comfort</h3>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              Attendants are matched by native mother tongue (Tamil, Telugu, Kannada, Hindi) to ensure natural conversation and familiar dietary habits.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. SENIOR CARE FREQUENTLY ASKED QUESTIONS
      ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-border bg-secondary/20 py-16 md:py-24">
        <div className="container-page max-w-4xl">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Frequently Asked Questions</span>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Senior Care Questions Answered
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Clear answers regarding shifts, qualifications, hospital permissions, and service boundaries.
            </p>
          </div>

          <div className="mt-10">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="faq-1" className="rounded-2xl border border-border bg-card px-6 py-1">
                <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground text-left">
                  What is the difference between a General Duty Attendant (GDA) and a Registered Nurse?
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  A General Duty Attendant provides non-clinical personal care: bathing, grooming, walker support, seated transfers, meal serving, and prescription timekeeping. A Registered Nurse (GNM or B.Sc. Nursing) is medically licensed to perform sterile clinical procedures: surgical wound dressings, IV infusions, injections, and urinary catheter management.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2" className="rounded-2xl border border-border bg-card px-6 py-1">
                <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground text-left">
                  How does the Hospital Visit Companion service work if I live in the US or another city?
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Our companion arrives at your parents' residence, coordinates a verified cab, assists them into the hospital with wheelchair support, stands in OPD registration queues, waits with them, escorts them through diagnostic labs, and accompanies them back home. You receive live milestone WhatsApp messages at each stage with photos and doctor slip receipts.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3" className="rounded-2xl border border-border bg-card px-6 py-1">
                <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground text-left">
                  What shift durations can we book for elderly care at home?
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  We offer flexible shift options tailored to family needs: 4-hour short errand or outing blocks, 8 to 12-hour day shifts, 12-hour night vigil shifts, and 24-hour continuous live-in care arrangements with rotational weekly relief.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-4" className="rounded-2xl border border-border bg-card px-6 py-1">
                <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground text-left">
                  What if my parent does not get along with the assigned caregiver?
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Caregiver-patient rapport is vital for comfort. If your parent feels uncomfortable with an attendant for any reason, notify your dedicated care coordinator and we will arrange a smooth replacement within 24 to 48 hours at zero additional replacement fee.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-5" className="rounded-2xl border border-border bg-card px-6 py-1">
                <AccordionTrigger className="text-sm sm:text-base font-semibold text-foreground text-left">
                  Are there any hidden agency registration fees?
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  None. ApnaCare operates with complete financial transparency. You pay an agreed daily or package rate plus statutory 18% GST with an official tax invoice. There are zero hidden registration or commission charges.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. FINAL BOOKING CTA
      ───────────────────────────────────────────────────────────── */}
      <section className="container-page py-16 md:py-20">
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-primary-soft/40 p-8 sm:p-12 text-center shadow-soft">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="eyebrow">Ready for Reassurance?</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Give Your Parents the Dignified Care They Deserve
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Reserve a verified caregiver today in Bengaluru, Chennai, Hyderabad, or Coimbatore with dedicated coordinator support.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8 font-bold shadow-soft">
                <Link to="/booking" search={{ service: "elderly-care" }}>
                  Book Care for My Parents
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <a
                href={buildWhatsAppUrl("Hi ApnaCare! I would like to book elderly care for my parents.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary/40 transition-colors shadow-2xs"
              >
                <MessageCircle className="size-4 text-[#25D366]" />
                WhatsApp Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          11. INTERACTIVE SERVICE DETAIL MODAL / DRAWER
      ───────────────────────────────────────────────────────────── */}
      {activeModalService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-fade-in"
          onClick={closeServiceDetails}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-lift"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeServiceDetails}
              className="absolute right-5 top-5 rounded-full bg-secondary p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>

            {/* Modal Header */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
                Category {activeModalService.categoryCode} · {activeModalService.categoryLabel}
              </span>
              <h2 id="modal-title" className="mt-1 font-display text-2xl sm:text-3xl font-bold text-foreground">
                {activeModalService.name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {activeModalService.description}
              </p>
            </div>

            {/* Provider and Status Info */}
            <div className="mt-5 grid gap-3 sm:grid-cols-2 rounded-2xl bg-secondary/30 p-4 border border-border/60 text-xs">
              <div>
                <p className="font-bold text-foreground">Provider Qualification:</p>
                <p className="text-muted-foreground mt-0.5">{activeModalService.providerType}</p>
              </div>
              <div>
                <p className="font-bold text-foreground">Availability & Rate:</p>
                <p className="text-primary font-semibold mt-0.5">
                  {activeModalService.estimatedRate} · {activeModalService.statusBadge}
                </p>
              </div>
            </div>

            {/* Recommended For */}
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                Who Should Consider This Service:
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm text-foreground/90">
                {activeModalService.whoFor.map((w, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Detailed Inclusions */}
            <div className="mt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="size-4" /> What's Included:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-foreground/90">
                {activeModalService.inclusions.map((inc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="size-4 text-primary shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Process Steps (if applicable, e.g. Hospital Companion) */}
            {activeModalService.processSteps && (
              <div className="mt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-terracotta mb-3">
                  Step-by-Step Service Process:
                </h3>
                <div className="space-y-2.5">
                  {activeModalService.processSteps.map((step) => (
                    <div
                      key={step.step}
                      className="rounded-2xl border border-border/80 bg-background/80 p-3.5 text-xs"
                    >
                      <p className="font-bold text-foreground">
                        Step {step.step}: {step.title}
                      </p>
                      <p className="mt-1 text-muted-foreground leading-relaxed">{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exclusions & Boundaries */}
            <div className="mt-6 rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-xs">
              <h3 className="font-bold text-destructive flex items-center gap-1.5 mb-1.5">
                <AlertCircle className="size-4" /> Explicit Exclusions & Safety Boundaries:
              </h3>
              <ul className="space-y-1 text-muted-foreground">
                {activeModalService.exclusions.map((exc, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-destructive">✕</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
              {activeModalService.clinicalBoundaryNotice && (
                <p className="mt-2 pt-2 border-t border-destructive/20 text-foreground/80 font-medium italic">
                  {activeModalService.clinicalBoundaryNotice}
                </p>
              )}
            </div>

            {/* Service FAQs */}
            {activeModalService.faqs.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                  Common Questions:
                </h3>
                <div className="space-y-2 text-xs">
                  {activeModalService.faqs.map((faq, idx) => (
                    <div key={idx} className="rounded-xl bg-secondary/30 p-3">
                      <p className="font-bold text-foreground">{faq.q}</p>
                      <p className="mt-1 text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="mt-8 pt-5 border-t border-border flex flex-wrap items-center justify-between gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={closeServiceDetails}
                className="rounded-full"
              >
                Close
              </Button>

              <div className="flex items-center gap-2">
                <a
                  href={buildWhatsAppUrl(
                    `Hi ApnaCare! I would like to inquire about ${activeModalService.name} for my family.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#25D366] bg-[#25D366]/15 px-4 py-2 text-xs font-semibold text-[#128C7E] hover:bg-[#25D366]/25 transition-colors"
                >
                  <MessageCircle className="size-3.5 text-[#25D366]" />
                  WhatsApp Consultation
                </a>

                <Button asChild variant="warm" size="sm" className="rounded-full font-bold">
                  <Link
                    to="/booking"
                    search={{
                      service: activeModalService.baseBookingSlug,
                      situation: activeModalService.name,
                    }}
                    onClick={() => {
                      closeServiceDetails();
                      track("senior_directory_modal_book_click", {
                        service_slug: activeModalService.slug,
                      });
                    }}
                  >
                    Request This Service
                    <ArrowRight className="ml-1 size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
