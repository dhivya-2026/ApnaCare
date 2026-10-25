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
  Heart,
  Activity,
  Baby,
  Briefcase,
  Car,
  ShieldCheck,
  Users,
  Stethoscope,
  Home,
  Plane,
  Train,
  Layers,
  MapPin,
  Building2,
  Network,
  PhoneCall,
  Sparkles,
  KeyRound,
  CheckCircle2,
  BadgePercent,
  BookOpen,
  HelpCircle,
  FileText,
  Check,
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
        onClick={() => {
          track("phone_contact_clicked", {
            channel_type: "support_phone",
            destination_number: SITE.SUPPORT_PHONE_TEL,
            source_page: typeof window !== "undefined" ? window.location.pathname : "",
          });
          track("support_call_click");
        }}
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
  onClick,
}: {
  service?: string | undefined;
  city?: string | undefined;
  className?: string;
  children?: ReactNode;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "warm" | "outline";
  onClick?: () => void;
}) {
  const searchParams: { service?: string; city?: string } = {};
  if (service) searchParams.service = service;
  if (city) searchParams.city = city;

  return (
    <Button asChild size={size} variant={variant} className={className}>
      <Link
        to="/booking"
        search={searchParams}
        onClick={() => {
          track("consultation_cta_clicked", {
            service,
            city,
            target_url: "/booking",
            cta_text: typeof children === "string" ? children : "Request Assistance",
          });
          track("booking_cta_click", { service, city });
          if (onClick) onClick();
        }}
      >
        {children ?? "Request Assistance"}
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
  badge?: string;
  icon?: any;
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
      {
        label: "About ApnaCare",
        to: "/about",
        description: "Our story, founding mission & compassionate care values",
        badge: "Mission",
        icon: Building2,
      },
      {
        label: "Ecosystem Partners",
        to: "/ecosystem-partners",
        description: "Hospitals, NGOs & healthcare skill development centers",
        badge: "Network",
        icon: Network,
      },
      {
        label: "Contact Us",
        to: "/contact",
        description: "24/7 command center & regional care coordination desks",
        badge: "24/7 Desk",
        icon: PhoneCall,
      },
    ],
  },
  {
    label: "Who We Serve",
    twoColumn: {
      col1Title: "Family & Clinical Support",
      col1Items: [
        {
          label: "Ageing Parents & Families",
          to: "/solutions/families-elderly",
          description: "Dignified in-home companionship & daily living support",
          badge: "Daily Living",
          icon: Heart,
        },
        {
          label: "Post-Hospital Recovery",
          to: "/solutions/post-hospitalization",
          description: "Bedside assistance, surgical recovery & smooth transition",
          badge: "Post-Surgical",
          icon: Activity,
        },
        {
          label: "New Mothers & Newborns",
          to: "/solutions/new-mothers",
          description: "Fourth-trimester care, infant handling & maternal healing",
          badge: "4th Trimester",
          icon: Baby,
        },
        {
          label: "Women Balancing Caregiving",
          to: "/solutions/women-caregivers",
          description: "Equitable care support, dignity, and restorative time for women",
          badge: "Respite",
          icon: HeartHandshake,
        },
      ],
      col2Title: "Workplace & Mobility Logistics",
      col2Items: [
        {
          label: "Urban Professionals",
          to: "/solutions/urban-professionals",
          description: "Balancing intense careers with eldercare & hospital vigils",
          badge: "Dual Career",
          icon: Briefcase,
        },
        {
          label: "Women Commuters",
          to: "/solutions/women-commuters",
          description: "Verified chauffeuses, station/airport assistance & late-night transit",
          badge: "Safe Transit",
          icon: Car,
        },
        {
          label: "Safety-Focused Partners",
          to: "/solutions/safety-partners",
          description: "Corporate transport compliance, hospital bedside vigils & escorts",
          badge: "B2B Escort",
          icon: ShieldCheck,
        },
        {
          label: "Community & Family Initiatives",
          to: "/solutions/community-initiatives",
          description: "Educational child safety guides & forthcoming community partnerships",
          badge: "Community",
          icon: Users,
        },
      ],
    },
  },
  {
    label: "Services",
    twoColumn: {
      col1Title: "In-Home & Clinical Care",
      col1Items: [
        {
          label: "Elderly Care",
          to: "/services/elderly-care",
          description: "Compassionate companionship & mobility assistance",
          badge: "Senior Living",
          icon: Heart,
        },
        {
          label: "Hospital Assistance / Bedside",
          to: "/services/hospital-attendants",
          description: "Bedside vigil & hospital ward coordination",
          badge: "24/7 Ward",
          icon: Activity,
        },
        {
          label: "Nursing Services",
          to: "/services/nursing-services",
          description: "Registered GNM/B.Sc nurses for clinical home care",
          badge: "GNM / B.Sc",
          icon: Stethoscope,
        },
        {
          label: "Post-Natal Care",
          to: "/services/post-natal-care",
          description: "Newborn care assistance & maternal recovery",
          badge: "Infant Care",
          icon: Baby,
        },
        {
          label: "Home & Personal Care",
          to: "/services/home-personal-care",
          description: "Empathetic daily living & personal hygiene support",
          badge: "Daily Living",
          icon: Home,
        },
        {
          label: "Lifestyle & Concierge",
          to: "/services/lifestyle-support",
          description: "Daily family errands & home management support",
          badge: "Family Help",
          icon: Sparkles,
        },
      ],
      col2Title: "Mobility, Travel & Specialized Care",
      col2Items: [
        {
          label: "Women Drivers & Chauffeuses",
          to: "/services/women-drivers",
          description: "Verified women chauffeuses for safe commutes",
          badge: "Safe Transit",
          icon: Car,
        },
        {
          label: "Accompanied Travel Assistance",
          to: "/services/travel-assistance",
          description: "Vetted companion for outstation & solo travel",
          badge: "Companion",
          icon: Plane,
        },
        {
          label: "Airport Meet & Greet",
          to: "/services/airport-pickup",
          description: "Arrival meet, luggage trolley & terminal escort",
          badge: "Airport Escort",
          icon: Plane,
        },
        {
          label: "Railway Station Assistance",
          to: "/services/railway-assistance",
          description: "Platform escort, coach boarding & luggage support",
          badge: "Station Escort",
          icon: Train,
        },
        {
          label: "Security & Safety Support",
          to: "/services/security-support",
          description: "Verified residential & transit safety escorts",
          badge: "Security",
          icon: ShieldCheck,
        },
        {
          label: "View All Services",
          to: "/services",
          description: "Complete catalogue with transparent pricing & SLAs",
          badge: "Full Catalogue",
          icon: Layers,
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
        badge: "Directory",
        icon: Users,
      },
      {
        label: "Attendant Login",
        to: "/attendant-login",
        description: "Secure portal for care professionals",
        badge: "Caregiver Portal",
        icon: KeyRound,
      },
      {
        label: "Become an Attendant",
        to: "/become-an-attendant",
        description: "Apply to join our vetted women care network",
        badge: "Careers",
        icon: Sparkles,
      },
    ],
  },
  {
    label: "More",
    twoColumn: {
      col1Title: "Trust & Transparency",
      col1Items: [
        {
          label: "How ApnaCare Works",
          to: "/#how-it-works",
          description: "5-step transparent journey to dependable care",
          badge: "Process",
          icon: CheckCircle2,
        },
        {
          label: "Trust & Verification Standards",
          to: "/safety",
          description: "Police clearance & clinical vs attendant limits",
          badge: "100% Vetted",
          icon: ShieldCheck,
        },
        {
          label: "Transparent Pricing",
          to: "/#pricing",
          description: "Clear daytime, overnight & live-in rates with GST",
          badge: "Zero Hidden Fees",
          icon: BadgePercent,
        },
      ],
      col2Title: "Resources & Answers",
      col2Items: [
        {
          label: "Knowledge Hub",
          to: "/knowledge-hub",
          description: "Problem-first care guides & health resources",
          badge: "Guides",
          icon: BookOpen,
        },
        {
          label: "Frequently Asked Questions",
          to: "/faq",
          description: "Answers to common family care questions",
          badge: "Help Desk",
          icon: HelpCircle,
        },
        {
          label: "Safety Guidelines & Boundaries",
          to: "/safety-guidelines",
          description: "Clear clinical protocols and attendant limits",
          badge: "Protocols",
          icon: FileText,
        },
      ],
    },
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
      const el = document.getElementById(hash);
      if (el) {
        e.preventDefault();
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
            item.twoColumn ? "w-[760px] 2xl:w-[820px]" : "w-96"
          } overflow-hidden rounded-2xl border border-border/90 bg-card/98 text-card-foreground shadow-2xl ring-1 ring-black/10 animate-fade-in backdrop-blur-2xl`}
        >
          {item.twoColumn ? (
            <div>
              <div className="grid grid-cols-2 divide-x divide-border/80 bg-card/95">
                {/* Column 1 */}
                <div className="p-3.5">
                  <div className="flex items-center justify-between px-3 py-1.5 mb-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      {item.twoColumn.col1Title}
                    </p>
                  </div>
                  <div className="grid gap-1">
                    {item.twoColumn.col1Items.map((child) => {
                      const isHash = child.to.includes("#");
                      const Icon = child.icon ?? HeartHandshake;
                      const content = (
                        <div className="flex items-start gap-3">
                          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 transition-all duration-200">
                            <Icon className="size-4.5" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="text-sm font-semibold group-hover:text-primary transition-colors truncate">
                                {child.label}
                              </span>
                              {child.badge && (
                                <span className="text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 bg-secondary text-secondary-foreground shrink-0 border border-border/60">
                                  {child.badge}
                                </span>
                              )}
                            </div>
                            {child.description && (
                              <span className="mt-0.5 text-xs text-muted-foreground leading-snug line-clamp-1 block">
                                {child.description}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                      if (isHash) {
                        return (
                          <a
                            key={child.to}
                            href={child.to}
                            role="menuitem"
                            onClick={(e) => handleHashLinkClick(e, child.to)}
                            className="group rounded-xl p-2.5 transition-colors hover:bg-secondary/50"
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
                          className="group rounded-xl p-2.5 transition-colors hover:bg-secondary/50"
                        >
                          {content}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Column 2 */}
                <div className="p-3.5 bg-secondary/15">
                  <div className="flex items-center justify-between px-3 py-1.5 mb-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {item.twoColumn.col2Title}
                    </p>
                  </div>
                  <div className="grid gap-1">
                    {item.twoColumn.col2Items.map((child) => {
                      const isHash = child.to.includes("#");
                      const Icon = child.icon ?? MapPin;
                      const content = (
                        <div className="flex items-start gap-3">
                          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 transition-all duration-200">
                            <Icon className="size-4.5" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1.5">
                              <span className="text-sm font-semibold group-hover:text-primary transition-colors truncate">
                                {child.label}
                              </span>
                              {child.badge && (
                                <span className="text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 bg-primary-soft text-primary shrink-0">
                                  {child.badge}
                                </span>
                              )}
                            </div>
                            {child.description && (
                              <span className="mt-0.5 text-xs text-muted-foreground leading-snug line-clamp-1 block">
                                {child.description}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                      if (isHash) {
                        return (
                          <a
                            key={child.to}
                            href={child.to}
                            role="menuitem"
                            onClick={(e) => handleHashLinkClick(e, child.to)}
                            className="group rounded-xl p-2.5 transition-colors hover:bg-secondary/50"
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
                          className="group rounded-xl p-2.5 transition-colors hover:bg-secondary/50"
                        >
                          {content}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Reassurance & Care Coordination Strip */}
              <div className="border-t border-border bg-gradient-to-r from-primary-soft/40 via-secondary/30 to-background px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>South India Care Command Desks Active · &lt; 90 Min Emergency Dispatch</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs">
                  <a href={`tel:${SITE.SUPPORT_PHONE_TEL}`} className="font-semibold text-primary hover:underline flex items-center gap-1">
                    <Phone className="size-3" /> Call {SITE.SUPPORT_PHONE}
                  </a>
                  <span className="text-muted-foreground">•</span>
                  <a href={buildWhatsAppUrl("Hi ApnaCare! I need guidance choosing the right care plan.")} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#128C7E] hover:underline flex items-center gap-1">
                    <MessageCircle className="size-3" /> WhatsApp Coordinator
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-1 p-3 bg-card text-card-foreground">
              {item.children?.map((child) => {
                const isHash = child.to.includes("#");
                const Icon = child.icon ?? HeartHandshake;
                const content = (
                  <div className="flex items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 transition-all duration-200">
                      <Icon className="size-4.5" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="text-sm font-semibold group-hover:text-primary transition-colors">
                          {child.label}
                        </span>
                        {child.badge && (
                          <span className="text-[10px] font-bold uppercase tracking-wider rounded-full px-2 py-0.5 bg-secondary text-secondary-foreground shrink-0 border border-border/60">
                            {child.badge}
                          </span>
                        )}
                      </div>
                      {child.description && (
                        <span className="mt-0.5 text-xs text-muted-foreground leading-snug line-clamp-1 block">
                          {child.description}
                        </span>
                      )}
                    </div>
                  </div>
                );

                if (isHash) {
                  return (
                    <a
                      key={child.to}
                      href={child.to}
                      role="menuitem"
                      onClick={(e) => handleHashLinkClick(e, child.to)}
                      className="group rounded-xl p-2.5 transition-colors hover:bg-secondary/50"
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
                    className="group rounded-xl p-2.5 transition-colors hover:bg-secondary/50"
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
                <p className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  {item.twoColumn.col1Title}
                </p>
                <div className="grid gap-0.5">
                  {item.twoColumn.col1Items.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to as any}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                    >
                      <span>{child.label}</span>
                      {child.badge && (
                        <span className="text-[10px] font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                          {child.badge}
                        </span>
                      )}
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
                      className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                    >
                      <span>{child.label}</span>
                      {child.badge && (
                        <span className="text-[10px] font-bold text-primary bg-primary-soft px-2 py-0.5 rounded-full">
                          {child.badge}
                        </span>
                      )}
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
                        const el = document.getElementById(hash);
                        if (el) {
                          e.preventDefault();
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                          window.history.pushState(null, "", child.to);
                        }
                      }
                    }}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <span>{child.label}</span>
                    {child.badge && (
                      <span className="text-[10px] font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                        {child.badge}
                      </span>
                    )}
                  </a>
                );
              }
              return (
                <Link
                  key={child.to}
                  to={child.to as any}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <span>{child.label}</span>
                  {child.badge && (
                    <span className="text-[10px] font-bold text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                      {child.badge}
                    </span>
                  )}
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
              onClick={() => {
                track("whatsapp_contact_clicked", { source_location: "header_desktop" });
                track("whatsapp_header_click");
              }}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 px-3.5 py-2 text-xs font-semibold text-[#128C7E] transition-colors hover:bg-[#25D366]/20 shrink-0 whitespace-nowrap min-h-[44px]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-[#25D366]" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            <BookLink className="hidden sm:inline-flex shrink-0 whitespace-nowrap min-h-[44px] rounded-full font-bold" size="sm" variant="warm">
              Request Assistance
            </BookLink>

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
            <div className="mt-3 pt-3 border-t border-border grid gap-2.5">
              <BookLink
                onClick={() => setMobileOpen(false)}
                className="w-full justify-center min-h-[48px] rounded-xl font-bold shadow-soft"
                variant="warm"
              >
                Request Assistance
              </BookLink>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track("whatsapp_contact_clicked", { source_location: "mobile_menu" });
                  track("whatsapp_mobile_click");
                  setMobileOpen(false);
                }}
                className="flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-base font-semibold text-[#128C7E] bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30"
              >
                <MessageCircle className="size-4" />
                Chat on WhatsApp
              </a>
              <Link
                to="/attendant-login"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2 text-sm text-center font-medium hover:bg-secondary text-muted-foreground hover:text-foreground"
              >
                Attendant Portal Login
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
            Care that feels closer to home. Safe, police-verified women attendants and licensed nurses for every stage of family care across South India.
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
                View All Services
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
        Talk to Team
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
      onClick={() => {
        track("whatsapp_contact_clicked", { source_location: "floating_fab" });
        track("whatsapp_floating_click");
      }}
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
