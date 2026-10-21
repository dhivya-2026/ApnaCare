import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Sparkles, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CATEGORIES, SERVICES } from "@/data/site";
import { PageHero, ServiceCard } from "@/components/site/Cards";
import { GuidedCareDiscovery } from "@/components/site/GuidedCareDiscovery";
import { track } from "@/lib/analytics";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services/")({
  head: () =>
    seo(
      "Our Services — Verified Care, Nursing & Transit | ApnaCare",
      "Explore 11 verified services: elderly care, hospital attendants, certified nursing, post-natal care, and women drivers across Bengaluru, Chennai, Hyderabad & Coimbatore."
    ),
  component: ServicesPage,
});

function ServicesPage() {
  const [viewMode, setViewMode] = useState<"catalog" | "guided">("catalog");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");

  const list = useMemo(
    () =>
      SERVICES.filter(
        (s) =>
          s.active &&
          (cat === "all" || s.category === cat) &&
          (s.name + s.description).toLowerCase().includes(q.toLowerCase())
      ),
    [q, cat]
  );

  return (
    <>
      <PageHero
        eyebrow="Verified Care Services"
        title="Our Complete Service Portfolio"
        sub="Women-Led Attendant Solutions for Homes, Healthcare, Travel, Security and Lifestyle Support across Bengaluru, Chennai, Hyderabad & Coimbatore."
      />

      <section className="container-page py-12">
        {/* View Switcher: Interactive Finder vs Full Directory */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div className="flex rounded-full border border-border bg-card p-1 shadow-2xs">
            <button
              type="button"
              onClick={() => {
                setViewMode("catalog");
                track("services_view_mode_toggle", { mode: "catalog" });
              }}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition-all min-h-[40px]",
                viewMode === "catalog"
                  ? "bg-primary text-primary-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="size-4" />
              <span>Browse All 11 Services</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode("guided");
                track("services_view_mode_toggle", { mode: "guided" });
              }}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold transition-all min-h-[40px]",
                viewMode === "guided"
                  ? "bg-primary text-primary-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Sparkles className="size-4 text-terracotta" />
              <span>Interactive Care Finder</span>
            </button>
          </div>

          <p className="text-xs text-muted-foreground">
            All services include 100% police verification & guaranteed 90-min backup dispatch.
          </p>
        </div>

        {viewMode === "guided" ? (
          <div className="animate-fade-in">
            <GuidedCareDiscovery />
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* Search & Category Filter Pills */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="relative w-full max-w-md">
                <Search
                  className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  aria-label="Search services"
                  placeholder="Search services (e.g., elderly, hospital, nursing)…"
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value);
                    track("service_search", { q: e.target.value });
                  }}
                  className="h-12 rounded-full bg-card pl-11 shadow-2xs"
                />
              </div>

              <div
                role="tablist"
                aria-label="Service categories"
                className="flex flex-wrap gap-2"
              >
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={cat === c.id}
                    onClick={() => {
                      setCat(c.id);
                      track("service_filter", { cat: c.id });
                    }}
                    className={cn(
                      "inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold min-h-[44px] transition-all",
                      cat === c.id
                        ? "border-primary bg-primary text-primary-foreground shadow-xs"
                        : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Grid */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((s) => (
                <ServiceCard key={s.id} s={s} />
              ))}
            </div>

            {list.length === 0 && (
              <div className="mt-10 rounded-3xl bg-secondary/40 p-10 text-center">
                <p className="text-base font-semibold text-foreground">No matching services found</p>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Try adjusting your search keywords or call our care desk at +91 80000 00000. We regularly arrange custom shift schedules.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
