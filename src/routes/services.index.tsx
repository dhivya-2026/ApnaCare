import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CATEGORIES, SERVICES } from "@/data/site";
import { PageHero, ServiceCard } from "@/components/site/Cards";
import { track } from "@/lib/analytics";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services/")({
  head: () => seo("Our Services — ApnaCare Women Attendants", "Elderly care, hospital attendants, nursing, post-natal care, women drivers and airport assistance by verified women attendants."),
  component: ServicesPage,
});

function ServicesPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const list = useMemo(() => SERVICES.filter((s) => s.active && (cat === "all" || s.category === cat) && (s.name + s.description).toLowerCase().includes(q.toLowerCase())), [q, cat]);
  return (
    <>
      <PageHero eyebrow="Services" title="Our Service Portfolio" sub="Women-Led Attendant Solutions for Homes, Healthcare, Travel, Security and Lifestyle Support." />
      <section className="container-page py-12">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input aria-label="Search services" placeholder="Search services…" value={q} onChange={(e) => { setQ(e.target.value); track("service_search", { q: e.target.value }); }} className="h-12 rounded-full bg-card pl-11" />
        </div>
        <div role="tablist" aria-label="Service categories" className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button key={c.id} role="tab" aria-selected={cat === c.id} onClick={() => { setCat(c.id); track("service_filter", { cat: c.id }); }}
              className={cn("inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium min-h-[44px] transition-colors", cat === c.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:border-primary")}>{c.label}</button>
          ))}
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((s) => <ServiceCard key={s.id} s={s} />)}</div>
        {list.length === 0 && <p className="mt-10 rounded-2xl bg-secondary p-8 text-center text-muted-foreground">No services match yet. Try another search, or call support — we can often arrange custom care.</p>}
      </section>
    </>
  );
}
