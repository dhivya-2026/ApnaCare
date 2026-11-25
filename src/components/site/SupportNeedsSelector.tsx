import { useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CARE_BUILDER_CATEGORIES, SUPPORT_CITIES, getSupportService } from "@/data/supportServices";
import { checkCityServiceAvailability } from "@/data/cityAvailability";

export function SupportNeedsSelector() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [city, setCity] = useState<string>("Bengaluru");
  const [serviceDate, setServiceDate] = useState<string>("");
  const [hasPrescription, setHasPrescription] = useState<string>("Available");
  const [travelRoute, setTravelRoute] = useState<string>("");
  const [livingSituation, setLivingSituation] = useState<string>("Lives alone");
  const [reviewed, setReviewed] = useState(false);

  const toggleOption = (id: string) => {
    setReviewed(false);
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const selectedItems = useMemo(() => {
    const out: { id: string; label: string; category: string; serviceId: string }[] = [];
    for (const cat of CARE_BUILDER_CATEGORIES) {
      for (const opt of cat.options) {
        if (selectedIds.includes(opt.id)) {
          out.push({ id: opt.id, label: opt.label, category: cat.title, serviceId: opt.serviceId });
        }
      }
    }
    return out;
  }, [selectedIds]);

  const primaryServiceId = selectedItems[0]?.serviceId || "elderly-care";
  const needsNursing = selectedIds.some((id) => id === "nursing" || id === "post-op-recovery");
  const needsTravel = selectedItems.some((s) => s.category === "Travel");
  const needsTech = selectedItems.some((s) => s.category === "Technology");

  const availability = useMemo(
    () => checkCityServiceAvailability(city.toLowerCase(), primaryServiceId),
    [city, primaryServiceId]
  );

  const handleTransferToBooking = () => {
    const summaryLines = [
      `[Consolidated Support Plan]`,
      `Selected Support: ${selectedItems.map((i) => `${i.label} (${i.category})`).join(", ")}`,
      `City: ${city} (${availability.readiness})`,
      serviceDate ? `Preferred Date: ${serviceDate}` : "",
      needsNursing ? `Doctor Prescription: ${hasPrescription}` : "",
      needsTravel && travelRoute ? `Travel Route / Hub: ${travelRoute}` : "",
      needsTech ? `Living Situation: ${livingSituation}` : "",
    ].filter(Boolean);

    try {
      sessionStorage.setItem(
        "apnacare_active_care_plan",
        JSON.stringify({
          planId: `CP-${Date.now().toString(36).toUpperCase().slice(-5)}`,
          totalNeedsSelected: selectedItems.length,
          recommendedModules: Array.from(new Set(selectedItems.map((i) => i.serviceId))).map((sid) => ({
            name: getSupportService(sid)?.name || sid,
            serviceSlug: getSupportService(sid)?.canonicalSlug || sid,
          })),
          selectedTasks: selectedItems.map((i) => ({ name: i.label })),
          notesSummary: summaryLines.join("\n"),
        })
      );
    } catch {
      // ignore storage errors
    }

    const targetSlug = getSupportService(primaryServiceId)?.canonicalSlug || primaryServiceId;
    navigate({
      to: "/booking",
      search: {
        service: targetSlug,
        city,
      },
    });
  };

  return (
    <div className="mb-8 rounded-3xl border border-primary/20 bg-primary-soft/25 p-5 sm:p-7 space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="size-3.5" aria-hidden />
            Quick Support Plan Builder
          </span>
          <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
            Select only the support you need
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Tick one or more options across Home Care, Mother &amp; Child, Travel, or Technology. We will only ask relevant questions.
          </p>
        </div>
        {selectedItems.length > 0 && (
          <span className="rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-bold">
            {selectedItems.length} selected
          </span>
        )}
      </div>

      {/* Four Support Category Checkbox Groups */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {CARE_BUILDER_CATEGORIES.map((cat) => (
          <div key={cat.id} className="rounded-2xl border border-border bg-card p-4 space-y-2.5">
            <div>
              <h4 className="font-semibold text-sm text-foreground">{cat.title}</h4>
              <p className="text-[11px] text-muted-foreground">{cat.description}</p>
            </div>
            <div className="space-y-1.5 pt-1">
              {cat.options.map((opt) => {
                const checked = selectedIds.includes(opt.id);
                return (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-2 rounded-xl border px-2.5 py-1.5 text-xs cursor-pointer transition-colors ${
                      checked
                        ? "border-primary bg-primary-soft/60 font-semibold text-foreground"
                        : "border-transparent hover:bg-secondary/60 text-muted-foreground"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleOption(opt.id)}
                      className="sr-only"
                    />
                    <span
                      className={`grid size-4 shrink-0 place-items-center rounded border ${
                        checked ? "bg-primary border-primary text-white" : "border-border bg-background"
                      }`}
                    >
                      {checked && <Check className="size-3" />}
                    </span>
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Relevant Follow-Up Questions (only rendered when matching services are selected) */}
      {selectedItems.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label htmlFor="builder-city">City *</Label>
              <select
                id="builder-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1.5 h-10 w-full rounded-xl border border-input bg-background px-3 text-xs font-medium"
              >
                {SUPPORT_CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="builder-date">Preferred Start / Travel Date</Label>
              <Input
                id="builder-date"
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                value={serviceDate}
                onChange={(e) => setServiceDate(e.target.value)}
                className="mt-1.5 h-10 rounded-xl text-xs"
              />
            </div>

            {needsNursing && (
              <div>
                <Label htmlFor="builder-rx">Doctor Prescription Status</Label>
                <select
                  id="builder-rx"
                  value={hasPrescription}
                  onChange={(e) => setHasPrescription(e.target.value)}
                  className="mt-1.5 h-10 w-full rounded-xl border border-input bg-background px-3 text-xs"
                >
                  <option value="Available">Available — will share with nurse</option>
                  <option value="Will obtain">Will obtain before the visit</option>
                </select>
              </div>
            )}

            {needsTravel && (
              <div>
                <Label htmlFor="builder-route">Station / Airport / Route</Label>
                <Input
                  id="builder-route"
                  value={travelRoute}
                  onChange={(e) => setTravelRoute(e.target.value)}
                  placeholder="e.g. BLR Terminal 2 or KSR Station"
                  className="mt-1.5 h-10 rounded-xl text-xs"
                />
              </div>
            )}

            {needsTech && (
              <div>
                <Label htmlFor="builder-living">Elder Living Situation</Label>
                <select
                  id="builder-living"
                  value={livingSituation}
                  onChange={(e) => setLivingSituation(e.target.value)}
                  className="mt-1.5 h-10 w-full rounded-xl border border-input bg-background px-3 text-xs"
                >
                  <option value="Lives alone">Lives alone</option>
                  <option value="Lives with spouse">Lives with spouse</option>
                  <option value="Lives with family">Lives with family</option>
                </select>
              </div>
            )}
          </div>

          {/* Availability Notice */}
          <div className="rounded-xl bg-secondary/50 px-3.5 py-2.5 text-xs flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>{city}:</strong> {availability.message}
            </span>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
              {availability.readiness}
            </span>
          </div>

          {/* Review & Submit Plan */}
          {!reviewed ? (
            <div className="flex justify-end">
              <Button type="button" size="sm" variant="outline" className="rounded-full" onClick={() => setReviewed(true)}>
                Review Consolidated Care Plan
              </Button>
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="size-4" />
                Consolidated Support Plan Ready
              </div>
              <ul className="flex flex-wrap gap-1.5">
                {selectedItems.map((item) => (
                  <li key={item.id} className="rounded-full bg-card border border-border px-2.5 py-1 text-xs font-medium">
                    {item.label}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <span className="text-xs text-muted-foreground">
                  Selected services will transfer directly into the booking form.
                </span>
                <Button type="button" variant="warm" size="sm" className="rounded-full font-semibold" onClick={handleTransferToBooking}>
                  Continue to Booking
                  <ArrowRight className="size-3.5" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
