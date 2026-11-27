import { useState, useMemo } from "react";
import {
  ChevronDown,
  ChevronUp,
  Cpu,
  Search,
  Check,
  ArrowRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ASSISTED_LIVING_TECH_CATEGORIES,
  type AssistedLivingTechCategory,
  type DeploymentStatusLabel,
} from "@/data/assistedLivingTech";
import { cn } from "@/lib/utils";

export const STATUS_BADGE_CLASSES: Record<DeploymentStatusLabel, string> = {
  "Deployed on LifeSakhi": "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30",
  "Available Through Partners": "bg-primary/10 text-primary border-primary/25",
  "Under Evaluation": "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30",
  "Future Opportunity": "bg-secondary text-muted-foreground border-border",
};

interface Props {
  onSelectTechForEnquiry: (tech: AssistedLivingTechCategory) => void;
}

export function TechnologyExplorer({ onSelectTechForEnquiry }: Props) {
  const [statusFilter, setStatusFilter] = useState<"All" | DeploymentStatusLabel>("All");
  const [query, setQuery] = useState("");
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    "remote-patient-monitoring": true,
  });

  const filtered = useMemo(() => {
    return ASSISTED_LIVING_TECH_CATEGORIES.filter((item) => {
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        `${item.name} ${item.shortTagline} ${item.whatItIs} ${item.problemsAddressed.join(" ")}`
          .toLowerCase()
          .includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [statusFilter, query]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const statusFilters: Array<"All" | DeploymentStatusLabel> = [
    "All",
    "Deployed on LifeSakhi",
    "Available Through Partners",
    "Under Evaluation",
    "Future Opportunity",
  ];

  return (
    <div className="space-y-6">
      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter technologies by deployment status">
            {statusFilters.map((st) => {
              const active = statusFilter === st;
              return (
                <button
                  key={st}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setStatusFilter(st)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors",
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary/40 text-foreground border-border hover:border-primary/50"
                  )}
                >
                  {st === "All" ? `All (${ASSISTED_LIVING_TECH_CATEGORIES.length})` : st}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden />
            <Input
              aria-label="Search assisted living technologies"
              placeholder="Search sensors, SOS, telehealth..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 h-10 rounded-xl text-xs"
            />
          </div>
        </div>
      </div>

      {/* Technology Cards Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
          No technology categories matched your filter. Try clearing the search or selecting &ldquo;All&rdquo;.
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {filtered.map((tech) => {
            const isOpen = !!expandedIds[tech.id];
            return (
              <article
                key={tech.id}
                id={tech.id}
                className={cn(
                  "rounded-3xl border bg-card p-6 transition-all flex flex-col justify-between",
                  isOpen ? "border-primary/50 shadow-lift" : "border-border shadow-2xs hover:border-primary/30"
                )}
              >
                <div>
                  {/* Concise Header */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Category {tech.number}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold",
                        STATUS_BADGE_CLASSES[tech.status]
                      )}
                    >
                      <Cpu className="size-3" aria-hidden />
                      {tech.status}
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-xl font-semibold text-foreground">{tech.name}</h3>
                  <p className="mt-1 text-xs sm:text-sm text-primary font-medium">{tech.shortTagline}</p>
                  <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">{tech.whatItIs}</p>

                  {/* Expandable Deep-Dive */}
                  {isOpen && (
                    <div className="mt-5 space-y-4 border-t border-border/70 pt-4 text-xs animate-fade-in">
                      <div className="rounded-2xl bg-secondary/35 p-3.5 border border-border/60">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-primary">How it works</p>
                        <p className="mt-1 text-foreground leading-relaxed">{tech.howItWorks}</p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-secondary/25 p-3.5 border border-border/60">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                            Devices &amp; Equipment Required
                          </p>
                          <ul className="mt-1.5 space-y-1">
                            {tech.devicesRequired.map((d) => (
                              <li key={d} className="flex items-start gap-1.5 text-muted-foreground">
                                <Check className="size-3.5 shrink-0 text-primary mt-0.5" aria-hidden />
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-2xl bg-secondary/25 p-3.5 border border-border/60">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                            Who Benefits &amp; Problems Addressed
                          </p>
                          <ul className="mt-1.5 space-y-1">
                            {tech.whoBenefits.map((w) => (
                              <li key={w} className="flex items-start gap-1.5 text-muted-foreground">
                                <Check className="size-3.5 shrink-0 text-terracotta mt-0.5" aria-hidden />
                                <span>{w}</span>
                              </li>
                            ))}
                            {tech.problemsAddressed.slice(0, 2).map((p) => (
                              <li key={p} className="flex items-start gap-1.5 text-muted-foreground">
                                <Info className="size-3.5 shrink-0 text-primary mt-0.5" aria-hidden />
                                <span>Addresses: {p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl bg-primary-soft/35 p-3.5 border border-primary/15">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                            Benefits for Seniors
                          </p>
                          <ul className="mt-1.5 space-y-1">
                            {tech.benefitsForSeniors.map((b) => (
                              <li key={b} className="text-foreground">• {b}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-2xl bg-primary-soft/35 p-3.5 border border-primary/15">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                            Benefits for Families
                          </p>
                          <ul className="mt-1.5 space-y-1">
                            {tech.benefitsForFamilies.map((b) => (
                              <li key={b} className="text-foreground">• {b}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-border/70 bg-background p-3.5">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          Real-World Usage Scenario
                        </p>
                        <p className="mt-1 text-foreground leading-relaxed">{tech.realWorldScenarios[0]}</p>
                        <p className="mt-2 text-[11px] text-muted-foreground">
                          <strong>Availability Status:</strong> {tech.status} — {tech.statusNote}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-border/70">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleExpand(tech.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-primary transition-colors py-1.5"
                  >
                    {isOpen ? (
                      <>
                        Hide Full Details <ChevronUp className="size-3.5" />
                      </>
                    ) : (
                      <>
                        Explore Full Details <ChevronDown className="size-3.5" />
                      </>
                    )}
                  </button>

                  <Button
                    type="button"
                    size="sm"
                    variant="warm"
                    className="rounded-full text-xs font-semibold"
                    onClick={() => onSelectTechForEnquiry(tech)}
                  >
                    {tech.ctaLabel}
                    <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
