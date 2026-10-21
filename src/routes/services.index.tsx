import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, LayoutGrid } from "lucide-react";
import { PageHero } from "@/components/site/Cards";
import { GuidedCareDiscovery } from "@/components/site/GuidedCareDiscovery";
import { ComprehensiveServiceCatalog } from "@/components/site/ComprehensiveServiceCatalog";
import { track } from "@/lib/analytics";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services/")({
  head: () =>
    seo(
      "Our Services — Verified Care, Nursing & Transit | ApnaCare",
      "Explore all verified and specialized care services: elderly care, hospital attendants, certified nursing, post-natal care, and women drivers across Bengaluru, Chennai, Hyderabad & Coimbatore."
    ),
  component: ServicesPage,
});

function ServicesPage() {
  const [viewMode, setViewMode] = useState<"catalog" | "guided">("catalog");

  return (
    <>
      <PageHero
        eyebrow="Verified Care Services"
        title="Our Complete Service Portfolio"
        sub="Women-Led Attendant Solutions for Homes, Healthcare, Travel, Security and Lifestyle Support across Bengaluru, Chennai, Hyderabad & Coimbatore."
      />

      <section className="container-page py-8">
        {/* View Switcher: Comprehensive Industry Catalog vs Interactive Care Finder */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
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
              <span>Full Categorized Catalog</span>
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
          <div className="mt-8 animate-fade-in">
            <GuidedCareDiscovery />
          </div>
        ) : (
          <div className="animate-fade-in">
            <ComprehensiveServiceCatalog className="px-0" />
          </div>
        )}
      </section>
    </>
  );
}
