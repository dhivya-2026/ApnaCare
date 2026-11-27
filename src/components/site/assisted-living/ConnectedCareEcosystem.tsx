import { ArrowRight, Cpu, Layers, HeartHandshake, Users } from "lucide-react";
import { ECOSYSTEM_COMPONENTS, ECOSYSTEM_ROLES } from "@/data/assistedLivingTech";

const COMPONENT_ICONS = [Cpu, Layers, HeartHandshake, Users];

export function ConnectedCareEcosystem() {
  return (
    <div className="space-y-8">
      {/* Central Proposition Banner */}
      <div className="rounded-3xl border border-primary/25 bg-primary-soft/35 p-6 sm:p-8 text-center max-w-4xl mx-auto">
        <p className="font-display text-xl sm:text-2xl font-semibold text-foreground leading-snug">
          &ldquo;Technology can tell us when something changes. Human care helps us understand what needs to happen next.&rdquo;
        </p>
      </div>

      {/* 4 Interconnected Components */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {ECOSYSTEM_COMPONENTS.map((comp, idx) => {
          const Icon = COMPONENT_ICONS[idx] ?? Cpu;
          return (
            <div key={comp.id} className="relative rounded-3xl border border-border bg-card p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="text-xs font-bold text-muted-foreground">{comp.step}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{comp.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{comp.summary}</p>
                <ul className="mt-4 space-y-1.5 border-t border-border/60 pt-3 text-xs text-foreground">
                  {comp.examples.map((ex) => (
                    <li key={ex}>• {ex}</li>
                  ))}
                </ul>
              </div>
              {idx < ECOSYSTEM_COMPONENTS.length - 1 && (
                <div className="hidden lg:flex items-center justify-end mt-4 text-primary">
                  <ArrowRight className="size-4" aria-hidden />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 6 Ecosystem Roles */}
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
        <h3 className="font-display text-xl font-semibold text-foreground">
          How people and partners work together
        </h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ECOSYSTEM_ROLES.map((r) => (
            <div key={r.role} className="rounded-2xl border border-border/70 bg-secondary/25 p-4">
              <p className="font-semibold text-sm text-primary">{r.role}</p>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{r.responsibility}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
