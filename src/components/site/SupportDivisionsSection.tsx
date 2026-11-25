import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SUPPORT_DIVISIONS,
  SUPPORT_SERVICES,
  type SupportDivisionId,
} from "@/data/supportServices";
import { SUPPORT_IMAGES } from "@/components/site/SupportServiceDetail";

interface Props {
  /** Optional callback when a division's Explore Services CTA is clicked on /services */
  onSelectDivision?: (divisionId: SupportDivisionId) => void;
  /** Whether to show the expandable list of services inside this section */
  showDivisionServices?: boolean;
}

export function SupportDivisionsSection({ onSelectDivision, showDivisionServices = true }: Props) {
  const [activeDivision, setActiveDivision] = useState<SupportDivisionId>("home-care");
  const divisionServices = SUPPORT_SERVICES.filter((s) => s.division === activeDivision);

  const handleExplore = (id: SupportDivisionId) => {
    setActiveDivision(id);
    onSelectDivision?.(id);
    if (!onSelectDivision) {
      document.getElementById("division-services-drawer")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <section className="container-page py-12" aria-labelledby="three-divisions-heading">
      <div className="max-w-2xl">
        <span className="eyebrow">Three Support Divisions</span>
        <h2 id="three-divisions-heading" className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-foreground">
          Choose the support your family needs
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Every LifeSakhi service sits inside one of three clear divisions — so you never have to guess where to start.
        </p>
      </div>

      {/* Three Prominent Division Entry Cards */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {SUPPORT_DIVISIONS.map((div) => {
          const isSelected = activeDivision === div.id;
          return (
            <article
              key={div.id}
              className={`flex flex-col overflow-hidden rounded-3xl border bg-card transition-all ${
                isSelected ? "border-primary shadow-lift ring-1 ring-primary/30" : "border-border shadow-soft"
              }`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <img
                  src={SUPPORT_IMAGES[div.imageKey]}
                  alt={div.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 rounded-full bg-background/95 px-3 py-1 text-[11px] font-bold text-foreground">
                  {div.shortTitle}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-semibold text-foreground">{div.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">{div.description}</p>

                <div className="mt-4 space-y-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-foreground">Who it is for</p>
                  {div.whoFor.map((w) => (
                    <p key={w} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="size-3.5 shrink-0 text-primary mt-0.5" aria-hidden />
                      <span>{w}</span>
                    </p>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {div.keyOptions.map((opt) => (
                    <span
                      key={opt}
                      className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-foreground"
                    >
                      {opt}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-border/70">
                  <Button
                    type="button"
                    size="sm"
                    variant={isSelected ? "default" : "outline"}
                    className="flex-1 rounded-full text-xs font-semibold"
                    onClick={() => handleExplore(div.id)}
                  >
                    Explore Services
                    <ChevronRight className="size-3.5" />
                  </Button>
                  <Button asChild size="sm" variant="warm" className="flex-1 rounded-full text-xs font-semibold">
                    <Link
                      to="/booking"
                      search={{
                        service:
                          div.id === "home-care"
                            ? "elderly-care"
                            : div.id === "travel-mobility"
                            ? "pickup"
                            : "assisted-living-technology",
                      }}
                    >
                      Request Assistance
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Associated Services for the Selected Division */}
      {showDivisionServices && (
        <div
          id="division-services-drawer"
          className="mt-8 rounded-3xl border border-border bg-secondary/25 p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="eyebrow">Selected Division</span>
              <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
                {SUPPORT_DIVISIONS.find((d) => d.id === activeDivision)?.title} — Services
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUPPORT_DIVISIONS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setActiveDivision(d.id)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    activeDivision === d.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground border border-border hover:text-foreground"
                  }`}
                >
                  {d.shortTitle}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {divisionServices.map((svc) => (
              <div
                key={svc.id}
                className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-2xs"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                    {svc.careType === "clinical"
                      ? "Licensed Clinical"
                      : svc.careType === "travel"
                      ? "Travel & Mobility"
                      : svc.careType === "technology"
                      ? "Assisted Living Tech"
                      : "Non-Clinical Support"}
                  </span>
                  <h4 className="mt-1 font-semibold text-base text-foreground">{svc.name}</h4>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{svc.shortDesc}</p>
                </div>

                <div className="mt-4 flex items-center gap-2 pt-3 border-t border-border/60">
                  <Button asChild size="sm" variant="outline" className="flex-1 rounded-full text-xs">
                    <Link to={svc.path}>
                      View Details
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="warm" className="rounded-full text-xs">
                    <Link to="/booking" search={{ service: svc.routeSlug }}>
                      Book
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
