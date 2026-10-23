import { Link } from "@tanstack/react-router";
import {
  Heart,
  UserPlus,
  Activity,
  Baby,
  Compass,
  Train,
  Car,
  Home,
  Building2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { CUSTOMER_ENTRY_POINTS, type CustomerEntryPoint } from "@/data/serviceCatalogue";
import { BookLink } from "./Layout";
import { cn } from "@/lib/utils";

interface CustomerHelpSectionProps {
  onSelectEntryPoint?: (entry: CustomerEntryPoint) => void;
  onOpenBusinessEnquiry?: () => void;
  className?: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  "entry-elderly": Heart,
  "entry-patient": UserPlus,
  "entry-surgery": Activity,
  "entry-maternal": Baby,
  "entry-travel-companion": Compass,
  "entry-transit-hub": Train,
  "entry-women-mobility": Car,
  "entry-temporary-home": Home,
  "entry-institutional": Building2,
};

export function CustomerHelpSection({
  onSelectEntryPoint,
  onOpenBusinessEnquiry,
  className,
}: CustomerHelpSectionProps) {
  return (
    <section className={cn("py-12 md:py-16", className)} id="how-can-we-help">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow flex items-center justify-center gap-1.5">
            <Sparkles className="size-3.5 text-primary" />
            Customer Situations & Pathways
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-semibold text-foreground">
            How Can We Help You?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Finding the right care starts with what is happening in your life right now. Select your situation to explore tailored support options.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CUSTOMER_ENTRY_POINTS.map((entry) => {
            const Icon = ICON_MAP[entry.id] || Heart;
            const isInstitutional = entry.targetCategoryId === "business-institutional";

            return (
              <div
                key={entry.id}
                className={cn(
                  "group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-200",
                  "bg-card hover:border-primary/50 hover:shadow-lift",
                  isInstitutional ? "border-primary/30 bg-primary-soft/20" : "border-border"
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={cn(
                        "grid size-11 place-items-center rounded-xl transition-colors",
                        isInstitutional
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary-soft text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                      )}
                    >
                      <Icon className="size-5" />
                    </div>
                    {isInstitutional && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary uppercase">
                        Enterprise
                      </span>
                    )}
                  </div>

                  {isInstitutional ? (
                    <Link
                      to="/ecosystem-partners"
                      className="block group/link"
                    >
                      <h3 className="mt-4 text-lg font-bold text-foreground leading-snug group-hover/link:text-primary transition-colors">
                        “{entry.question}”
                      </h3>
                    </Link>
                  ) : (
                    <Link
                      to="/services/$slug"
                      params={{ slug: entry.mappedCoreServiceSlug }}
                      className="block group/link"
                    >
                      <h3 className="mt-4 text-lg font-bold text-foreground leading-snug group-hover/link:text-primary transition-colors">
                        “{entry.question}”
                      </h3>
                    </Link>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {entry.subtitle}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                  {isInstitutional ? (
                    <div className="flex items-center gap-3">
                      <Link
                        to="/ecosystem-partners"
                        className="inline-flex items-center text-xs font-bold text-primary hover:underline gap-1"
                      >
                        <span>Institutional Details</span>
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                      {onOpenBusinessEnquiry && (
                        <button
                          type="button"
                          onClick={() => onOpenBusinessEnquiry()}
                          className="text-xs font-semibold text-muted-foreground hover:text-foreground underline cursor-pointer"
                        >
                          Enquire
                        </button>
                      )}
                    </div>
                  ) : (
                    <Link
                      to="/services/$slug"
                      params={{ slug: entry.mappedCoreServiceSlug }}
                      className="inline-flex items-center text-xs font-bold text-primary hover:underline gap-1"
                    >
                      <span>Explore Services</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  )}

                  {!isInstitutional && (
                    <BookLink
                      service={entry.mappedCoreServiceSlug}
                      size="sm"
                      variant="outline"
                      className="text-xs h-8 px-3"
                    >
                      Book Now
                    </BookLink>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
