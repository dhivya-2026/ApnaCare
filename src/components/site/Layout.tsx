import { Link, useLocation } from "@tanstack/react-router";
import { useState, useRef, useEffect, type ReactNode } from "react";
import {
  Menu,
  Phone,
  X,
  HeartHandshake,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, CITIES, buildWhatsAppUrl } from "@/data/site";
import { track, useAutoTelemetry } from "@/lib/analytics";
import { Assistant } from "./Assistant";
import { PersonalizedWelcome } from "./PersonalizedWelcome";

// ─── Shared Link Components ──────────────────────────────────────────────────

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
  city,
  className,
  children,
  size,
  variant,
}: {
  service?: string | undefined;
  city?: string | undefined;
  className?: string;
  children?: ReactNode;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "warm" | "outline";
}) {
  const searchParams: { service?: string; city?: string } = {};
  if (service) searchParams.service = service;
  if (city) searchParams.city = city;

  return (
    <Button asChild size={size} variant={variant} className={className}>
      <Link
        to="/booking"
        search={searchParams}
        onClick={() => track("booking_cta_click", { service, city })}
      >
        {children ?? "Book a Service"}
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

// ─── Dropdown Nav Definitions ────────────────────────────────────────────────

// ─── Dropdown Nav Definitions ────────────────────────────────────────────────

interface DropdownChild {
  label: string;
  to: string;
  description?: string;
}

interface NavItem {
  label: string;
  to?: string;
  children?: DropdownChild[];
  twoColumn?: {
    col1Title: string;
    col1Items: DropdownChild[];
    col2Title: string;
    col2Items: DropdownChild[];
  };
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "About",
    children: [
      { label: "About ApnaCare", to: "/about", description: "Our story, mission & compassionate care values" },
      {
        label: "Ecosystem Partners",
        to: "/ecosystem-partners",
        description: "Hospitals, NGOs & healthcare skill centers",
      },
      { label: "Contact Us", to: "/contact", description: "24/7 command center & regional care desks" },
    ],
  },
  {
    label: "Who We Serve",
    children: [
      {
        label: "Urban Professionals",
        to: "/solutions/urban-professionals",
        description: "Balancing intense careers with eldercare & hospital vigils",
      },
      {
        label: "Ageing Parents & Families",
        to: "/solutions/families-elderly",
        description: "Dignified in-home companionship & daily living support",
      },
      {
        label: "Post-Hospital Recovery",
        to: "/solutions/post-hospitalization",
        description: "Bedside assistance, surgical recovery & smooth discharge transition",
      },
      {
        label: "New Mothers & Newborns",
        to: "/solutions/new-mothers",
        description: "Fourth-trimester care, infant handling & maternal healing",
      },
      {
        label: "Women Balancing Caregiving",
        to: "/solutions/women-caregivers",
        description: "Equitable care support, dignity, and restorative time for women",
      },
      {
        label: "Community & Family Initiatives",
        to: "/solutions/community-initiatives",
        description: "Educational child safety guides & forthcoming community partnerships",
      },
      {
        label: "Women Commuters",
        to: "/solutions/women-commuters",
        description: "Verified chauffeuses, station/airport assistance & late-night transit",
      },
      {
        label: "Safety-Focused Partners",
        to: "/solutions/safety-partners",
        description: "Corporate transport compliance, hospital bedside vigils & escorts",
      },
    ],
  },
  {
    label: "Services",
    twoColumn: {
      col1Title: "Care Services",
      col1Items: [
        {
          label: "Elderly Care",
          to: "/services/elderly-care",
          description: "Compassionate companionship & mobility support",
        },
        {
          label: "Hospital Assistance / Bedside",
          to: "/services/hospital-attendants",
          description: "Bedside vigil & hospital ward coordination",
        },
        {
          label: "Nursing Services",
          to: "/services/nursing-services",
          description: "Registered GNM/B.Sc nurses for clinical home care",
        },
        {
          label: "Post-Natal Care",
          to: "/services/post-natal-care",
          description: "Newborn care assistance & maternal recovery",
        },
        {
          label: "Home & Personal Care",
          to: "/services/home-personal-care",
          description: "Empathetic daily living & personal hygiene support",
        },
        {
          label: "Women Drivers",
          to: "/services/women-drivers",
          description: "Verified women chauffeuses for safe commutes",
        },
        {
          label: "Travel Assistance",
          to: "/services/travel-assistance",
          description: "Airport meet-and-greet & train journey escorts",
        },
        {
          label: "View All 11 Services",
          to: "/services",
          description: "Browse our complete directory of care offerings",
        },
      ],
      col2Title: "Cities Served (South India)",
      col2Items: [
        {
          label: "Bengaluru",
          to: "/cities/bengaluru",
          description: "Indiranagar, Koramangala, Whitefield, HSR & more",
        },
        {
          label: "Chennai",
          to: "/cities/chennai",
          description: "Adyar, Anna Nagar, T. Nagar, Mylapore & more",
        },
        {
          label: "Hyderabad",
          to: "/cities/hyderabad",
          description: "Hitec City, Banjara Hills, Gachibowli & more",
        },
        {
          label: "Coimbatore",
          to: "/cities/coimbatore",
          description: "RS Puram, Peelamedu, Race Course & more",
        },
        {
          label: "View All Operating Cities",
          to: "/cities",
          description: "Regional coordination hubs & local coverage",
        },
      ],
    },
  },
  {
    label: "Attendants",
    children: [
      {
        label: "Browse Attendants",
        to: "/#attendants",
        description: "View verified attendant profiles & ratings",
      },
      {
        label: "Attendant Login",
        to: "/attendant-login",
        description: "Secure portal for care professionals",
      },
      {
        label: "Become an Attendant",
        to: "/become-an-attendant",
        description: "Apply to join our vetted women care network",
      },
    ],
  },
  {
    label: "More",
    children: [
      {
        label: "How ApnaCare Works",
        to: "/#how-it-works",
        description: "5-step transparent journey to dependable care",
      },
      {
        label: "Knowledge Hub",
        to: "/knowledge-hub",
        description: "Problem-first care guides & health resources",
      },
      {
        label: "Transparent Pricing",
        to: "/#pricing",
        description: "Clear daytime, overnight & live-in rates with GST",
      },
      {
        label: "Trust & Verification Standards",
        to: "/safety",
        description: "Police clearance & clinical vs attendant boundaries",
      },
      {
        label: "Frequently Asked Questions",
        to: "/faq",
        description: "Answers to common family care questions",
      },
    ],
  },
];

// ─── Desktop Dropdown ─────────────────────────────────────────────────────────

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function keyHandler(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  const handleHashLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    const [path, hash] = href.split("#");
    const targetPath = path || "/";
    if (window.location.pathname === targetPath && hash) {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", href);
      }
    }
  };

  if (!item.children && !item.twoColumn) {
    return (
      <Link
        to={item.to!}
        activeOptions={{ exact: item.to === "/" }}
        activeProps={{ className: "text-primary font-semibold" }}
        className="transition-colors hover:text-foreground text-[13px] 2xl:text-sm font-medium text-muted-foreground whitespace-nowrap px-1 xl:px-1.5 2xl:px-2 py-2"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`flex items-center gap-0.5 xl:gap-1 text-[13px] 2xl:text-sm font-medium whitespace-nowrap transition-colors py-2 px-1 xl:px-1.5 2xl:px-2 ${
          open ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {item.label}
        <ChevronDown
          className={`size-3 2xl:size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute ${
            item.label === "More"
              ? "right-0"
              : item.twoColumn
              ? "left-1/2 -translate-x-1/2"
              : "left-0"
          } top-full z-[200] mt-1.5 ${
            item.twoColumn ? "w-[640px] 2xl:w-[700px]" : "w-80"
          } overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-lift ring-1 ring-black/5 animate-fade-in`}
        >
          {item.twoColumn ? (
            <div className="grid grid-cols-2 divide-x divide-border bg-card">
              <div className="p-3">
                <p className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                  {item.twoColumn.col1Title}
                </p>
                <div className="mt-1 grid gap-0.5">
                  {item.twoColumn.col1Items.map((child) => {
                    const isHash = child.to.includes("#");
                    const content = (
                      <>
                        <span className="text-sm font-medium group-hover:text-primary transition-colors">
                          {child.label}
                        </span>
                        {child.description && (
                          <span className="mt-0.5 text-xs text-muted-foreground leading-snug line-clamp-1">
                            {child.description}
                          </span>
                        )}
                      </>
                    );
                    if (isHash) {
                      return (
                        <a
                          key={child.to}
                          href={child.to}
                          role="menuitem"
                          onClick={(e) => handleHashLinkClick(e, child.to)}
                          className="group flex flex-col rounded-xl px-3 py-2 transition-colors hover:bg-secondary"
                        >
                          {content}
                        </a>
                      );
                    }
                    return (
                      <Link
                        key={child.to}
                        to={child.to as any}
                        role="menuitem"
                        onClick={() => setOpen(false)}
                        className="group flex flex-col rounded-xl px-3 py-2 transition-colors hover:bg-secondary"
                      >
                        {content}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="p-3 bg-secondary/20">
                <p className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {item.twoColumn.col2Title}
                </p>
                <div className="mt-1 grid gap-0.5">
                  {item.twoColumn.col2Items.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to as any}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="group flex flex-col rounded-xl px-3 py-2 transition-colors hover:bg-secondary"
                    >
                      <span className="text-sm font-medium group-hover:text-primary transition-colors flex items-center justify-between">
                        {child.label}
                        <span className="text-[11px] font-semibold text-primary/80">Active Hub</span>
                      </span>
                      {child.description && (
                        <span className="mt-0.5 text-xs text-muted-foreground leading-snug line-clamp-1">
                          {child.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-1 p-2.5 bg-card text-card-foreground">
              {item.children?.map((child) => {
                const isHash = child.to.includes("#");
                const content = (
                  <>
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">
                      {child.label}
                    </span>
                    {child.description && (
                      <span className="mt-0.5 text-xs text-muted-foreground leading-snug">
                        {child.description}
                      </span>
                    )}
                  </>
                );

                if (isHash) {
                  return (
                    <a
                      key={child.to}
                      href={child.to}
                      role="menuitem"
                      onClick={(e) => handleHashLinkClick(e, child.to)}
                      className="group flex flex-col rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <Link
                    key={child.to}
                    to={child.to as any}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className="group flex flex-col rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary"
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Mobile Accordion Item ────────────────────────────────────────────────────

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);

  if (!item.children && !item.twoColumn) {
    return (
      <Link
        to={item.to!}
        onClick={onClose}
        className="flex items-center rounded-xl px-3 py-2.5 text-base font-medium hover:bg-secondary"
        activeOptions={{ exact: item.to === "/" }}
        activeProps={{ className: "bg-secondary text-primary font-semibold" }}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-base font-medium hover:bg-secondary text-left"
      >
        <span>{item.label}</span>
        <ChevronRight
          className={`size-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        />
      </button>
      {open && (
        <div className="ml-3 mt-1 grid gap-2 border-l-2 border-border pl-3">
          {item.twoColumn ? (
            <>
              <div>
                <p className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {item.twoColumn.col1Title}
                </p>
                <div className="grid gap-0.5">
                  {item.twoColumn.col1Items.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to as any}
                      onClick={onClose}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t border-border">
                <p className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {item.twoColumn.col2Title}
                </p>
                <div className="grid gap-0.5">
                  {item.twoColumn.col2Items.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to as any}
                      onClick={onClose}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </>
          ) : (
            item.children?.map((child) => {
              const isHash = child.to.includes("#");
              if (isHash) {
                return (
                  <a
                    key={child.to}
                    href={child.to}
                    onClick={(e) => {
                      onClose();
                      const [path, hash] = child.to.split("#");
                      const targetPath = path || "/";
                      if (window.location.pathname === targetPath && hash) {
                        e.preventDefault();
                        const el = document.getElementById(hash);
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                          window.history.pushState(null, "", child.to);
                        }
                      }
                    }}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    {child.label}
                  </a>
                );
              }
              return (
                <Link
                  key={child.to}
                  to={child.to as any}
                  onClick={onClose}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {child.label}
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const waUrl = buildWhatsAppUrl("Hi ApnaCare! I'd like to enquire about your services.");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur w-full">
      <div className="container-page flex h-18 items-center justify-between gap-2 sm:gap-4">
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Desktop nav and actions grouped together for a compact, controlled gap between About and Phone */}
        <div className="flex items-center gap-2 xl:gap-2.5 shrink-0">
          <nav aria-label="Main" className="hidden items-center gap-0.5 xl:gap-1 2xl:gap-1.5 xl:flex">
            {NAV_ITEMS.map((item) => (
              <DesktopDropdown key={item.label} item={item} />
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Button asChild variant="ghost" size="icon" className="hidden lg:inline-flex shrink-0 size-11 text-muted-foreground hover:text-foreground touch-target">
              <a
                href={`tel:${SITE.SUPPORT_PHONE_TEL}`}
                onClick={() => track("support_call_click")}
                aria-label={`Call support at ${SITE.SUPPORT_PHONE}`}
                title={`Call support at ${SITE.SUPPORT_PHONE}`}
              >
                <Phone className="size-4" />
              </a>
            </Button>

            {/* WhatsApp CTA in header */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              onClick={() => track("whatsapp_header_click")}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-3.5 py-2 text-xs font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366]/20 shrink-0 whitespace-nowrap min-h-[44px]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-[#25D366]" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            <BookLink className="hidden sm:inline-flex shrink-0 whitespace-nowrap min-h-[44px]" size="sm" />

            {/* Mobile menu toggle */}
            <Button
              variant="outline"
              size="icon"
              className="xl:hidden shrink-0 size-11 touch-target"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          aria-label="Mobile"
          className="border-t border-border bg-background xl:hidden animate-fade-in"
        >
          <div className="container-page grid gap-1 py-4 max-h-[80vh] overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <MobileNavItem key={item.label} item={item} onClose={() => setMobileOpen(false)} />
            ))}
            <div className="mt-2 pt-2 border-t border-border grid gap-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track("whatsapp_mobile_click");
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-base font-medium text-[#128C7E] hover:bg-[#25D366]/10"
              >
                <MessageCircle className="size-4" />
                Chat on WhatsApp
              </a>
              <Link
                to="/attendant-login"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-base font-medium hover:bg-secondary text-primary"
              >
                Attendant Login
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-ink pb-24 text-ink-foreground md:pb-0" role="contentinfo">
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-foreground/85">
            Trusted women attendant services you can rely on. Safe, police-verified and
            compassionate support for every stage of care across South India.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <BookLink variant="warm" size="sm" className="min-h-[44px]" />
            <CallLink variant="glass" size="sm" className="min-h-[44px]" />
          </div>
        </div>

        <nav aria-label="Footer Services">
          <p className="text-xs font-bold tracking-wider uppercase text-primary-foreground">
            Services & Care
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-foreground/80">
            <li>
              <Link to="/solutions/$slug" params={{ slug: "women-commuters" }} className="hover:text-white font-medium text-primary-foreground transition-colors">
                Women Commuters
              </Link>
            </li>
            <li>
              <Link to="/solutions/$slug" params={{ slug: "urban-professionals" }} className="hover:text-white font-medium text-primary-foreground transition-colors">
                Urban Professionals
              </Link>
            </li>
            <li>
              <Link to="/solutions/$slug" params={{ slug: "safety-partners" }} className="hover:text-white font-medium text-primary-foreground transition-colors">
                Safety-Focused Partners
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-white transition-colors">
                All 11 Services
              </Link>
            </li>
            <li>
              <Link to="/booking" className="hover:text-white transition-colors">
                Booking Engine
              </Link>
            </li>
            <li>
              <Link to="/safety" className="hover:text-white transition-colors">
                Safety & Verification
              </Link>
            </li>
            <li>
              <Link to="/safety-guidelines" className="hover:text-white transition-colors">
                Safety Guidelines
              </Link>
            </li>
            <li>
              <Link to="/cities" className="hover:text-white transition-colors">
                Metro Cities Coverage
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer Trust and Ecosystem">
          <p className="text-xs font-bold tracking-wider uppercase text-primary-foreground">
            Ecosystem & Trust
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-foreground/80">
            <li>
              <Link to="/about" className="hover:text-white transition-colors">
                About ApnaCare
              </Link>
            </li>
            <li>
              <Link to="/ecosystem-partners" className="hover:text-white transition-colors">
                Ecosystem Partners
              </Link>
            </li>
            <li>
              <Link to="/knowledge-hub" className="hover:text-white transition-colors">
                Knowledge Hub
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white transition-colors">
                Frequently Asked Questions
              </Link>
            </li>
            <li>
              <Link to="/attendant-login" className="hover:text-white transition-colors">
                Attendant Portal Login
              </Link>
            </li>
            <li>
              <Link to="/become-an-attendant" className="hover:text-white transition-colors">
                Become an Attendant
              </Link>
            </li>
          </ul>
        </nav>

        <div aria-label="Footer Contact">
          <p className="text-xs font-bold tracking-wider uppercase text-primary-foreground">
            Contact & Support
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-foreground/80">
            <li>
              <a
                href={`tel:${SITE.SUPPORT_PHONE_TEL}`}
                onClick={() => track("support_call_click")}
                className="hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Phone className="size-3.5" />
                {SITE.SUPPORT_PHONE}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.EMAIL}`} className="hover:text-white transition-colors">
                {SITE.EMAIL}
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppUrl("Hello ApnaCare, I need assistance.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_footer_click")}
                className="hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="size-3.5" />
                WhatsApp Us
              </a>
            </li>
            <li>
              <a
                href={SITE.LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("linkedin_footer_click")}
                className="hover:text-sky-300 flex items-center gap-1.5 text-sky-400 transition-colors"
              >
                <Linkedin className="size-3.5" />
                Follow on LinkedIn
              </a>
            </li>
            <li>24/7 Command Emergency Desk</li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">
                Regional Offices & Desk
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-foreground/15 py-6">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-foreground/75">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved. GST compliant
            invoicing.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy" className="hover:text-white hover:underline transition-colors">
              Privacy Policy (DPDP Act, 2023)
            </Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-white hover:underline transition-colors">
              Terms of Service
            </Link>
            <span>·</span>
            <Link to="/refund-policy" className="hover:text-white hover:underline transition-colors">
              Refund Policy
            </Link>
            <span>·</span>
            <Link to="/safety-guidelines" className="hover:text-white hover:underline transition-colors">
              Safety Guidelines
            </Link>
            <span>·</span>
            <a
              href={SITE.LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("linkedin_footer_bottom_click")}
              className="hover:text-sky-300 hover:underline flex items-center gap-1 text-sky-400 transition-colors"
            >
              <Linkedin className="size-3" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Mobile Bottom Bar ────────────────────────────────────────────────────────

function MobileBar() {
  const waUrl = buildWhatsAppUrl("Hi ApnaCare! I'd like to book a service.");
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden shadow-lift" role="toolbar" aria-label="Quick actions">
      <CallLink className="flex-1 text-sm min-h-[44px]" size="sm">
        <span className="hidden xs:inline">Call Now</span>
        <span className="xs:hidden">Call</span>
      </CallLink>
      <BookLink className="flex-1 text-sm min-h-[44px]" size="sm" variant="warm">
        Book Care
      </BookLink>
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => track("whatsapp_mobile_bar_click")}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#25D366] bg-[#25D366]/10 px-3 py-2 text-xs font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366]/20 active:bg-[#25D366]/30 min-h-[44px]"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-[#25D366] shrink-0" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="hidden xs:inline">WhatsApp</span>
      </a>
    </div>
  );
}

// ─── Floating WhatsApp Button (bottom-left) ───────────────────────────────────

function FloatingWhatsApp() {
  const waUrl = buildWhatsAppUrl(
    "Hi ApnaCare! I'd like to know more about your women attendant services.",
  );
  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ApnaCare on WhatsApp"
      onClick={() => track("whatsapp_floating_click")}
      className="fixed bottom-6 left-4 z-40 hidden items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105 md:flex size-14 focus-ring"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-7" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

// ─── Site Layout ──────────────────────────────────────────────────────────────

export function SiteLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  useAutoTelemetry(location.pathname);

  useEffect(() => {
    function scrollToHash() {
      if (typeof window !== "undefined" && window.location.hash) {
        const id = window.location.hash.replace("#", "");
        if (id) {
          const el = document.getElementById(id);
          if (el) {
            setTimeout(() => {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
          }
        }
      }
    }

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileBar />
      {/* Personalized welcome card — bottom-left, above WhatsApp */}
      <PersonalizedWelcome />
      {/* Floating WhatsApp — bottom-left */}
      <FloatingWhatsApp />
      {/* Chatbot assistant — bottom-right */}
      <Assistant />
    </div>
  );
}
