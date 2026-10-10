import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IMPACT, PARTNER_BENEFITS, PARTNER_CATEGORIES, PARTNER_JOURNEY, PARTNER_TYPES, STATE_PARTNERS, SUCCESS_STORIES } from "@/data/site";
import { PageHero, SectionHeading } from "@/components/site/Cards";
import { fieldErrors, partnerSchema } from "@/lib/validation";
import { track } from "@/lib/analytics";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ecosystem-partners")({
  head: () => seo("Ecosystem Partners — ApnaCare", "Partner with ApnaCare to empower women through verified services, professional training and community collaboration."),
  component: Partners,
});

function Partners() {
  const [sel, setSel] = useState(STATE_PARTNERS[0]?.state || "Tamil Nadu");
  const max = Math.max(...STATE_PARTNERS.map((s) => s.count));
  return (
    <>
      <PageHero eyebrow="Ecosystem Partners" title="Building a trusted network" sub="Building a trusted network of organizations to empower women through verified services, professional training, and community collaboration.">
        <Button asChild size="lg"><a href="#partner-form" onClick={() => track("partner_form_open")}>Become an Ecosystem Partner</a></Button>
      </PageHero>
      <section className="container-page grid grid-cols-2 gap-4 py-12 md:grid-cols-4">
        {IMPACT.map(([n, l]) => <div key={l} className="card-soft p-6 text-center"><p className="font-display text-4xl font-semibold text-primary">{n}</p><p className="mt-1 text-sm text-muted-foreground">{l}</p></div>)}
      </section>
      <section className="container-page py-12">
        <SectionHeading title="Ecosystem categories" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PARTNER_CATEGORIES.map((c) => <div key={c.name} className="card-soft p-5"><p className="font-display text-2xl font-semibold text-primary">{c.count}</p><h3 className="mt-2 font-semibold">{c.name}</h3><p className="mt-1 text-sm text-muted-foreground">{c.desc}</p></div>)}
        </div>
      </section>
      <section className="bg-secondary/40 py-16">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Partner network across India" sub="25+ states and union territories. Select a state to see partner counts." />
            <ul className="mt-8 space-y-2">
              {STATE_PARTNERS.map((s) => (
                <li key={s.state}><button onClick={() => setSel(s.state)} aria-pressed={sel === s.state} className={cn("w-full rounded-2xl border p-3 text-left", sel === s.state ? "border-primary bg-card" : "border-transparent")}>
                  <div className="flex justify-between text-sm font-semibold"><span>{s.state}</span><span>{s.count}</span></div>
                  <div className="mt-2 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-primary" style={{ width: `${(s.count / max) * 100}%` }} /></div>
                </button></li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading title="Why partner with ApnaCare" />
            <div className="mt-8 grid grid-cols-2 gap-3">{PARTNER_BENEFITS.map((b) => <div key={b} className="rounded-2xl bg-card p-4 text-sm font-semibold shadow-soft">{b}</div>)}</div>
            <p className="mt-6 text-sm text-muted-foreground">Partner types: {PARTNER_TYPES.join(" · ")}</p>
          </div>
        </div>
      </section>
      <section className="container-page py-16">
        <SectionHeading title="Partnership journey" />
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNER_JOURNEY.map(([t, d], i) => <li key={t} className="card-soft p-5 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}><p className="font-display text-sm text-terracotta">0{i + 1}</p><h3 className="mt-1 font-semibold">{t}</h3><p className="text-sm text-muted-foreground">{d}</p></li>)}
        </ol>
        <h3 className="mt-14 text-xl font-semibold">Success stories</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{SUCCESS_STORIES.map((s) => <div key={s.org} className="rounded-2xl border border-dashed border-border p-5"><p className="font-semibold">{s.org}</p><p className="text-xs text-muted-foreground">{s.note}</p></div>)}</div>
      </section>
      <PartnerForm />
    </>
  );
}

function PartnerForm() {
  const [f, setF] = useState({ orgName: "", orgType: "", contact: "", email: "", phone: "", website: "", state: "", city: "", members: "", category: "", interest: "" });
  const [e, setE] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const set = (k: keyof typeof f) => (ev: { target: { value: string } }) => setF({ ...f, [k]: ev.target.value });
  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (state === "loading") return;
    const r = partnerSchema.safeParse(f);
    if (!r.success) { setE(fieldErrors(r.error)); return; }
    setE({}); setState("loading"); track("partner_form_submit");
    // TODO: POST /api/partner-enquiries once a backend is connected.
    await new Promise((r) => setTimeout(r, 800));
    track("partner_form_success"); setState("done");
  };
  const field = (k: keyof typeof f, label: string, type = "text") => (
    <div><Label htmlFor={k}>{label}</Label><Input id={k} type={type} value={f[k]} onChange={set(k)} className="mt-1.5 h-12" />{e[k] && <p role="alert" className="mt-1 text-sm text-destructive">{e[k]}</p>}</div>
  );
  return (
    <section id="partner-form" className="bg-secondary/40 py-16">
      <div className="container-page max-w-3xl">
        <SectionHeading title="Become an Ecosystem Partner" />
        {state === "done" ? (
          <div className="mt-8 card-soft p-8"><CheckCircle2 className="size-10 text-primary" /><p className="mt-3 text-xl font-semibold">Thank you — enquiry received.</p><p className="text-muted-foreground">Our team will review and reach out to discuss next steps.</p></div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-8 grid gap-5 card-soft p-6 md:grid-cols-2 md:p-8">
            {field("orgName", "Organization Name *")}
            <div><Label htmlFor="orgType">Organization Type *</Label><select id="orgType" value={f.orgType} onChange={set("orgType")} className="mt-1.5 h-12 w-full rounded-md border border-input bg-card px-3"><option value="">Select</option>{PARTNER_TYPES.map((t) => <option key={t}>{t}</option>)}</select>{e["orgType"] && <p className="mt-1 text-sm text-destructive">{e["orgType"]}</p>}</div>
            {field("contact", "Contact Person *")}{field("email", "Email *", "email")}{field("phone", "Phone Number *", "tel")}{field("website", "Website", "url")}
            {field("state", "State *")}{field("city", "City *")}{field("members", "Number of Members")}
            <div><Label htmlFor="category">Partnership Category</Label><select id="category" value={f.category} onChange={set("category")} className="mt-1.5 h-12 w-full rounded-md border border-input bg-card px-3"><option value="">Select</option>{PARTNER_CATEGORIES.map((c) => <option key={c.name}>{c.name}</option>)}</select></div>
            <div className="md:col-span-2"><Label htmlFor="interest">Partnership Interest</Label><Textarea id="interest" value={f.interest} onChange={set("interest")} className="mt-1.5" rows={4} /></div>
            <Button type="submit" size="lg" disabled={state === "loading"} className="md:col-span-2">{state === "loading" ? "Sending…" : "Become an Ecosystem Partner"}</Button>
          </form>
        )}
      </div>
    </section>
  );
}
