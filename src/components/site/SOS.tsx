import { useEffect, useState } from "react";
import { AlertTriangle, BellRing, Check, MapPin, Radio, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { track } from "@/lib/analytics";

const STEPS = [
  { icon: BellRing, label: "SOS triggered (simulated)" },
  { icon: Radio, label: "Control room acknowledged" },
  { icon: ShieldCheck, label: "Operator assigned" },
  { icon: Users, label: "Family contacts notified (mock SMS/Email)" },
  { icon: MapPin, label: "Live GPS link shared" },
];

export function SOSDemoButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<"confirm" | "running">("confirm");
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (phase !== "running" || step >= STEPS.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), 900);
    return () => clearTimeout(t);
  }, [phase, step]);

  const reset = () => { setPhase("confirm"); setStep(0); };

  return (
    <>
      <Button variant="sos" size="lg" className={className} onClick={() => { setOpen(true); reset(); track("sos_demo_open"); }}>
        <AlertTriangle /> Trigger Demo SOS Alert
      </Button>
      <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <p className="w-fit rounded-full bg-sos/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-sos">Demo · Simulation only</p>
            <DialogTitle className="font-display text-2xl">Emergency SOS demo</DialogTitle>
            <DialogDescription>This is a simulation. No police, emergency responder or real contact will be notified.</DialogDescription>
          </DialogHeader>
          {phase === "confirm" ? (
            <div className="flex flex-col gap-3 pt-2">
              <Button variant="sos" size="lg" onClick={() => { setPhase("running"); track("sos_demo_trigger"); }}>Start simulation</Button>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              <ol className="space-y-3" aria-live="polite">
                {STEPS.map((s, i) => {
                  const done = i < step;
                  return (
                    <li key={s.label} className={`flex items-center gap-3 rounded-2xl border p-3 text-sm transition-opacity ${done ? "border-primary/30 bg-primary-soft" : "border-border opacity-40"}`}>
                      <s.icon className={`size-5 ${done ? "text-primary" : ""}`} aria-hidden />
                      <span className="flex-1">{s.label}</span>
                      {done && <Check className="size-4 text-primary" aria-label="done" />}
                    </li>
                  );
                })}
              </ol>
              {step >= STEPS.length && <p className="rounded-2xl bg-secondary p-3 text-sm">Simulated operator: “We can see the attendant's location and are on the line with the family.”</p>}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={reset}>Reset</Button>
                <Button className="flex-1" onClick={() => setOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
