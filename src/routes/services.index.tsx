import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { z } from "zod";
import {
  Search,
  ShieldCheck,
  Check,
  BadgeCheck,
  Building2,
  Phone,
  Sparkles,
  ArrowRight,
  Info,
  SlidersHorizontal,
  Home,
  HeartHandshake,
  Car,
  Plane,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Cards";
import { BookLink, CallLink } from "@/components/site/Layout";
import {
  CATALOGUE_CATEGORIES,
  CATALOGUE_SERVICES,
  type CatalogueCategoryId,
  type CatalogueService,
} from "@/data/serviceCatalogue";
import { CatalogueDetailModal } from "@/components/site/CatalogueDetailModal";
import { BusinessEnquiryModal } from "@/components/site/BusinessEnquiryModal";
import { CustomerHelpSection } from "@/components/site/CustomerHelpSection";
import { formatINR, SITE } from "@/data/site";
import { track } from "@/lib/analytics";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  cat: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/services/")({
  validateSearch: searchSchema,
  head: () =>
    seo(
      "Service Catalogue & Care Portfolios — ApnaCare",
      "Explore comprehensive care services across Care at Home, Hospital Assistance, Travel Assistance, Women's Mobility, Family Support, and Business Partnerships."
    ),
  component: ServicesPage,
});

const CATEGORY_ICONS: Record<CatalogueCategoryId, React.ElementType> = {
  "care-at-home": Home,
  "hospital-assistance": Building2,
  "travel-assistance": Plane,
  "womens-mobility": Car,
  "family-support": HeartHandshake,
  "business-institutional": Building2,
};

function ServicesPage() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q || "");
  const [selectedCat, setSelectedCat] = useState<string>(search.cat || "all");
  const [detailService, setDetailService] = useState<CatalogueService | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [businessModalOpen, setBusinessModalOpen] = useState(false);
  const [businessService, setBusinessService] = useState<CatalogueService | null>(null);

  // Sync if search params change
  useEffect(() => {
    if (search.cat) {
      setSelectedCat(search.cat);
    }
  }, [search.cat]);

  const filteredServices = useMemo(() => {
    return CATALOGUE_SERVICES.filter((s) => {
      const matchCat = selectedCat === "all" || s.categoryId === selectedCat;
      const matchQuery =
        !q.trim() ||
        (s.name + " " + s.description + " " + s.intendedCustomer + " " + s.whatIncluded.join(" "))
          .toLowerCase()
          .includes(q.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [selectedCat, q]);

  const handleOpenDetail = (s: CatalogueService) => {
    setDetailService(s);
    setDetailOpen(true);
    track("catalogue_service_view", { serviceId: s.id, category: s.categoryId });
  };

  const handleOpenBusiness = (s?: CatalogueService) => {
    setBusinessService(s || null);
    setBusinessModalOpen(true);
    track("business_enquiry_opened", { service: s?.name || "General" });
  };

  return (
    <>
      <PageHero
        eyebrow="Comprehensive Service Catalogue"
        title="Care & Assistance Portfolios Built Around Real Life"
        sub="Organized into six specialized categories for individuals, families, seniors, women travelers, and healthcare institutions across South India."
      >
        <div className="flex flex-wrap gap-3">
          <Button
            variant="warm"
            size="lg"
            className="min-h-[44px]"
            onClick={() => {
              const el = document.getElementById("catalogue-grid");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Browse Catalogue
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-h-[44px]"
            onClick={() => handleOpenBusiness()}
          >
            <Building2 className="size-4 mr-2" />
            Institutional & Corporate Partnerships
          </Button>
        </div>
      </PageHero>

      {/* ── 1. Customer-Focused Entry Points ("How Can We Help You?") ── */}
      <CustomerHelpSection
        onOpenBusinessEnquiry={() => handleOpenBusiness()}
        className="bg-secondary/30 border-b border-border"
      />

      {/* ── 2. Primary Service Catalogue ── */}
      <section className="container-page py-14" id="catalogue-grid">
        {/* Search & Filter Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-foreground">
              Explore Our Six Care & Assistance Categories
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Select a category below or search by specific daily assistance requirement.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search
              className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              aria-label="Search care services"
              placeholder="Search by need or task…"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                track("catalogue_search", { q: e.target.value });
              }}
              className="h-11 rounded-full bg-card pl-10 text-sm shadow-2xs"
            />
          </div>
        </div>

        {/* Six Category Selector Tabs */}
        <div
          role="tablist"
          aria-label="Service categories"
          className="mt-6 flex flex-wrap gap-2.5"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedCat === "all"}
            onClick={() => {
              setSelectedCat("all");
              track("catalogue_category_filter", { cat: "all" });
            }}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs sm:text-sm font-semibold min-h-[44px] transition-all",
              selectedCat === "all"
                ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                : "border-border bg-card hover:border-primary/50 text-foreground"
            )}
          >
            <span>All Categories ({CATALOGUE_SERVICES.length})</span>
          </button>

          {CATALOGUE_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || Home;
            const isSelected = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setSelectedCat(cat.id);
                  track("catalogue_category_filter", { cat: cat.id });
                }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs sm:text-sm font-semibold min-h-[44px] transition-all",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-2xs"
                    : "border-border bg-card hover:border-primary/50 text-foreground"
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span>
                  {cat.code}. {cat.title}
                </span>
                {cat.isInstitutional && (
                  <span className="rounded bg-accent/20 px-1.5 py-0.5 text-[10px] font-bold">
                    B2B
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Category Description Banner when filtered */}
        {selectedCat !== "all" && (
          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-soft/30 p-5 animate-fade-in">
            {(() => {
              const currentCat = CATALOGUE_CATEGORIES.find((c) => c.id === selectedCat);
              if (!currentCat) return null;
              return (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Category {currentCat.code} · {currentCat.targetAudience}
                    </span>
                    <h3 className="text-lg font-bold text-foreground mt-0.5">{currentCat.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{currentCat.description}</p>
                  </div>
                  {currentCat.isInstitutional && (
                    <Button
                      variant="warm"
                      size="sm"
                      onClick={() => handleOpenBusiness()}
                      className="shrink-0"
                    >
                      <Building2 className="size-4 mr-2" />
                      Submit Partnership RFP
                    </Button>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* Service Cards Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((s) => {
            const isInstitutional = s.actionType === "business_enquiry";

            return (
              <article
                key={s.id}
                className={cn(
                  "group flex flex-col justify-between rounded-3xl border p-6 transition-all duration-200 card-soft",
                  "hover:-translate-y-1 hover:shadow-lift",
                  isInstitutional ? "border-primary/30 bg-primary-soft/10" : "border-border"
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {s.categoryId.replace(/-/g, " ")}
                    </span>
                    {s.isClinical ? (
                      <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 dark:text-blue-300">
                        Clinical RN
                      </span>
                    ) : (
                      <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                        Non-Medical
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
                    {s.name}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {s.shortDesc}
                  </p>

                  <div className="mt-3.5 rounded-xl bg-secondary/50 p-2.5 text-xs text-foreground/80">
                    <span className="font-semibold text-primary">For: </span>
                    <span className="line-clamp-1">{s.intendedCustomer}</span>
                  </div>

                  <ul className="mt-4 space-y-1.5 border-t border-border/60 pt-3">
                    {s.keyBenefits.slice(0, 2).map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-foreground/90">
                        <Check className="size-3.5 shrink-0 text-primary mt-0.5" aria-hidden />
                        <span className="line-clamp-1">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 border-t border-border pt-4">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <p className="text-[11px] text-muted-foreground">
                        {isInstitutional ? "Pricing Model" : "Starting Rate"}
                      </p>
                      {s.startingPrice ? (
                        <p className="font-display text-xl font-bold text-foreground">
                          {formatINR(s.startingPrice)}
                          <span className="text-xs font-normal text-muted-foreground">
                            /{s.pricingUnit || "day"}
                          </span>
                        </p>
                      ) : (
                        <p className="font-display text-sm font-bold text-primary">
                          Institutional SLA / Quote
                        </p>
                      )}
                    </div>
                    <span className="text-[11px] text-muted-foreground">
                      {isInstitutional ? "Enterprise Billing" : "+ 18% GST Invoiced"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDetail(s)}
                      className="flex-1 min-h-[44px] text-xs font-semibold"
                    >
                      View Details
                    </Button>

                    {isInstitutional ? (
                      <Button
                        variant="warm"
                        size="sm"
                        onClick={() => handleOpenBusiness(s)}
                        className="flex-1 min-h-[44px] text-xs font-semibold"
                      >
                        Enquire
                      </Button>
                    ) : (
                      <BookLink
                        service={s.mappedCoreServiceSlug || "elderly-care"}
                        variant="warm"
                        size="sm"
                        className="flex-1 min-h-[44px] text-xs font-semibold"
                      >
                        {s.actionType === "request" ? "Request" : "Book Service"}
                      </BookLink>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="mt-10 rounded-3xl bg-secondary/60 p-10 text-center">
            <Info className="size-8 text-primary mx-auto mb-2" />
            <h3 className="text-lg font-bold text-foreground">No matching services found</h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
              We frequently arrange customized care packages. Try another search term, or connect with our regional care coordinators directly.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <Button variant="outline" onClick={() => { setQ(""); setSelectedCat("all"); }}>
                Reset Filters
              </Button>
              <CallLink variant="warm">Speak to Coordinator</CallLink>
            </div>
          </div>
        )}
      </section>

      {/* ── 3. Dedicated Trust, Safety & Clinical Boundaries Section ── */}
      <section className="border-t border-border bg-card py-16">
        <div className="container-page">
          <div className="max-w-2xl mx-auto text-center">
            <span className="eyebrow flex items-center justify-center gap-1.5">
              <ShieldCheck className="size-4 text-primary" />
              Safety, Credentials & Safeguards
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-semibold text-foreground">
              Clear Boundaries, Thorough Verification
            </h2>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed">
              ApnaCare serves people in delicate moments. We maintain transparent operational standards and explicit healthcare distinctions.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-border p-6 bg-background space-y-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary font-bold">
                1
              </div>
              <h3 className="text-lg font-bold text-foreground">5-Step Background Verification</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Every attendant undergoes biometric Aadhaar verification, court record checks, verified residential address inspection, credential verification, and practical patient handling assessments.
              </p>
            </div>

            <div className="rounded-2xl border border-border p-6 bg-background space-y-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-foreground">Non-Medical vs Clinical Nursing</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                General Duty Assistants (GDAs) provide non-clinical support (mobility, bathing, companionship). Prescription injections, wound care, and catheters are strictly reserved for licensed Registered Nurses (GNM / B.Sc).
              </p>
            </div>

            <div className="rounded-2xl border border-border p-6 bg-background space-y-3">
              <div className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary font-bold">
                3
              </div>
              <h3 className="text-lg font-bold text-foreground">Travel & Mobility Boundaries</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Travel companions provide watchful logistical and physical accompaniment throughout journeys. They provide reassurance and station navigation rather than armed personal security or guaranteed immunity.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary-soft/40 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="font-bold text-foreground">Need advice on choosing the appropriate service?</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Our care coordinators listen to your family circumstance with zero sales pressure.
              </p>
            </div>
            <div className="flex gap-3">
              <CallLink variant="outline">Call {SITE.SUPPORT_PHONE}</CallLink>
              <BookLink variant="warm">Book Care Assessment</BookLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Reusable Modals ── */}
      <CatalogueDetailModal
        service={detailService}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onOpenBusinessEnquiry={(s) => handleOpenBusiness(s)}
      />

      <BusinessEnquiryModal
        open={businessModalOpen}
        onOpenChange={setBusinessModalOpen}
        selectedService={businessService}
      />
    </>
  );
}
