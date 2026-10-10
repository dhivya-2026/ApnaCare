import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, Phone, X, HeartHandshake, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/data/site";
import { track } from "@/lib/analytics";
import { Assistant } from "./Assistant";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/booking", label: "Booking" },
  { to: "/safety", label: "Safety" },
  { to: "/knowledge-hub", label: "Knowledge Hub" },
  { to: "/cities", label: "Cities" },
  { to: "/ecosystem-partners", label: "Partners" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function CallLink({
  className,
  children,
  variant = "outline",
  size,
}: {
  className?: string;
  children?: ReactNode;
  variant?: "outline" | "glass" | "ghost" | "default";
  size?: "default" | "sm" | "lg";
}) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={`tel:${SITE.SUPPORT_PHONE_TEL}`}
        onClick={() => track("support_call_click")}
        aria-label={`Call support at ${SITE.SUPPORT_PHONE}`}
      >
        <Phone /> {children ?? "Call Support"}
      </a>
    </Button>
  );
}

export function BookLink({
  service,
  className,
  children,
  size,
  variant,
}: {
  service?: string | undefined;
  className?: string;
  children?: ReactNode;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "warm" | "outline";
}) {
  return (
    <Button asChild size={size} variant={variant} className={className}>
      <Link
        to="/booking"
        search={service ? { service } : {}}
        onClick={() => track("booking_cta_click", { service })}
      >
        {children ?? "Book Now"}
      </Link>
    </Button>
  );
}

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2" aria-label="ApnaCare home">
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-2xs">
        <HeartHandshake className="size-5" />
      </span>
      <span className="font-display text-xl font-semibold tracking-tight">
        Apna<span className="text-primary">Care</span>
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-page flex h-18 items-center gap-6">
        <Logo />
        <nav
          aria-label="Main"
          className="ml-2 hidden items-center gap-4 whitespace-nowrap text-sm font-medium text-muted-foreground xl:flex"
        >
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-primary font-semibold" }}
              className="transition-colors hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/attendant-login"
            className="hidden whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground 2xl:block"
          >
            Attendant Login
          </Link>
          <CallLink className="hidden md:inline-flex" variant="ghost" size="sm" />
          <BookLink className="hidden sm:inline-flex" size="sm" />
          <Button
            variant="outline"
            size="icon"
            className="xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-border bg-background xl:hidden animate-fade-in">
          <div className="container-page grid gap-1 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-base font-medium hover:bg-secondary"
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "bg-secondary text-primary font-semibold" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/faq"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-base font-medium hover:bg-secondary"
            >
              FAQs
            </Link>
            <Link
              to="/attendant-login"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-base font-medium hover:bg-secondary text-primary"
            >
              Attendant Login
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-ink pb-24 text-ink-foreground md:pb-0">
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-foreground/75">
            Trusted women attendant services you can rely on. Safe, police-verified and compassionate support for every stage of care across South India.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <BookLink variant="warm" size="sm" />
            <CallLink variant="glass" size="sm" />
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide uppercase text-primary-foreground/90">Services & Care</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-foreground/70">
            <li><Link to="/services" className="hover:text-ink-foreground">All 11 Services</Link></li>
            <li><Link to="/booking" className="hover:text-ink-foreground">Booking Engine</Link></li>
            <li><Link to="/safety" className="hover:text-ink-foreground">Safety & Verification</Link></li>
            <li><Link to="/safety-guidelines" className="hover:text-ink-foreground">Safety Guidelines</Link></li>
            <li><Link to="/cities" className="hover:text-ink-foreground">Metro Cities Coverage</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide uppercase text-primary-foreground/90">Ecosystem & Trust</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-foreground/70">
            <li><Link to="/about" className="hover:text-ink-foreground">About ApnaCare</Link></li>
            <li><Link to="/ecosystem-partners" className="hover:text-ink-foreground">Ecosystem Partners</Link></li>
            <li><Link to="/knowledge-hub" className="hover:text-ink-foreground">Knowledge Hub</Link></li>
            <li><Link to="/faq" className="hover:text-ink-foreground">Frequently Asked Questions</Link></li>
            <li><Link to="/attendant-login" className="hover:text-ink-foreground">Attendant Portal Login</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide uppercase text-primary-foreground/90">Contact & Support</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-foreground/70">
            <li><a href={`tel:${SITE.SUPPORT_PHONE_TEL}`} onClick={() => track("support_call_click")} className="hover:text-ink-foreground flex items-center gap-1.5"><Phone className="size-3.5" />{SITE.SUPPORT_PHONE}</a></li>
            <li><a href={`mailto:${SITE.EMAIL}`} className="hover:text-ink-foreground">{SITE.EMAIL}</a></li>
            <li>24/7 Command Emergency Desk</li>
            <li><Link to="/contact" className="hover:text-ink-foreground">Regional Offices & Desk</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-foreground/10 py-6">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-foreground/60">
          <p>© {new Date().getFullYear()} {SITE.legalName}. All rights reserved. GST compliant invoicing.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy" className="hover:text-ink-foreground hover:underline">Privacy Policy (DPDP 2023)</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-ink-foreground hover:underline">Terms of Service</Link>
            <span>·</span>
            <Link to="/refund-policy" className="hover:text-ink-foreground hover:underline">Refund Policy</Link>
            <span>·</span>
            <Link to="/safety-guidelines" className="hover:text-ink-foreground hover:underline">Safety Guidelines</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
      <CallLink className="flex-1" />
      <BookLink className="flex-1" />
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
      <MobileBar />
      <Assistant />
      <a
        href={`https://wa.me/${SITE.WHATSAPP}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="sr-only"
      >
        <MessageCircle />
      </a>
    </div>
  );
}
