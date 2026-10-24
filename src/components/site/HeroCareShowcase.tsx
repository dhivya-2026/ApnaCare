import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { BadgeCheck, Sparkles, ArrowRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import nursingCare from "@/assets/nursing-care.jpg";

export interface HeroCategory {
  id: string;
  tabLabel: string;
  tag: string;
  verifiedBadge: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  serviceSlug: string;
}

export const HERO_CATEGORIES: HeroCategory[] = [
  {
    id: "senior-care",
    tabLabel: "Senior Care",
    tag: "Senior Care",
    verifiedBadge: "Verified Staff",
    title: "Elderly Care at Home",
    subtitle: "Compassionate companionship & daily mobility support",
    image: hero1,
    alt: "Caregiver gently holding hands and assisting an elderly lady at home",
    serviceSlug: "elderly-care",
  },
  {
    id: "hospital-support",
    tabLabel: "Hospital Support",
    tag: "Hospital Support",
    verifiedBadge: "Bedside Attendants",
    title: "Hospital Bedside Assistance",
    subtitle: "Continuous bedside vigil, ward assistance & recovery care",
    image: hero2,
    alt: "Dedicated attendant assisting a recovering patient in hospital room",
    serviceSlug: "hospital-attendants",
  },
  {
    id: "clinical-nursing",
    tabLabel: "Clinical Nursing",
    tag: "Clinical Nursing",
    verifiedBadge: "GNM / B.Sc Nurse",
    title: "Licensed Home Clinical Nursing",
    subtitle: "Sterile dressings, injections & vital charting per doctor orders",
    image: nursingCare,
    alt: "Licensed registered nurse administering clinical care under physician prescription",
    serviceSlug: "nursing-services",
  },
  {
    id: "new-mothers",
    tabLabel: "New Mothers",
    tag: "Maternal & Infant",
    verifiedBadge: "Japa Specialist",
    title: "Post-Natal & Infant Care",
    subtitle: "Traditional newborn massage, soothing & restful maternal sleep",
    image: hero4,
    alt: "Experienced caregiver tenderly caring for newborn baby while mother rests",
    serviceSlug: "post-natal-care",
  },
  {
    id: "travel-transit",
    tabLabel: "Travel & Transit",
    tag: "Mobility & Transit",
    verifiedBadge: "Chauffeur & Escort",
    title: "Assisted Transit & Clinic Escort",
    subtitle: "Door-to-door clinic accompaniment, railway & airport transit",
    image: hero5,
    alt: "Professional woman driver providing safe escorted transit for family member",
    serviceSlug: "travel-assistance",
  },
  {
    id: "family-respite",
    tabLabel: "Family Respite",
    tag: "Respite & Logs",
    verifiedBadge: "Daily WhatsApp Logs",
    title: "Caregiver Respite & Distant Coordination",
    subtitle: "Relief shifts for family caregivers & scheduled daily WhatsApp logs",
    image: hero3,
    alt: "Caregiver and coordinator reviewing family care schedule and logistics",
    serviceSlug: "lifestyle-support",
  },
];

interface HeroCareShowcaseProps {
  className?: string;
  autoPlayInterval?: number; // ms, default 3500ms
}

export function HeroCareShowcase({
  className,
  autoPlayInterval = 3500,
}: HeroCareShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeCategory = HERO_CATEGORIES[activeIndex];

  // Auto-play loop cycle
  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_CATEGORIES.length);
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, autoPlayInterval]);

  const handleSelectCategory = (index: number) => {
    setActiveIndex(index);
    track("hero_showcase_tab_click", {
      category_id: HERO_CATEGORIES[index].id,
      tab_label: HERO_CATEGORIES[index].tabLabel,
    });
  };

  return (
    <div
      className={cn("relative mx-auto max-w-md lg:max-w-none select-none", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Decorative ambient glow */}
      <div
        className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-primary/15 via-terracotta/15 to-secondary/30 blur-xl opacity-75 -z-10"
        aria-hidden
      />

      {/* Main Showcase Card Container */}
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lift transition-all">
        {/* Media Frame with smooth crossfade layers */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          {HERO_CATEGORIES.map((cat, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <div
                key={cat.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-in-out",
                  isCurrent ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                )}
                aria-hidden={!isCurrent}
              >
                <img
                  src={cat.image}
                  alt={cat.alt}
                  width={800}
                  height={600}
                  loading={idx === 0 ? "eager" : "lazy"}
                  fetchPriority={idx === 0 ? "high" : "auto"}
                  className={cn(
                    "h-full w-full object-cover transition-transform duration-1000 ease-out",
                    isCurrent ? "scale-100" : "scale-105"
                  )}
                />

                {/* Dark Vignette Scrim for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/15" />

                {/* Top Left Tag Badge */}
                <div className="absolute top-4 left-4">
                  <span className="rounded-full bg-background/95 px-3 py-1 text-xs font-semibold text-foreground shadow-xs backdrop-blur">
                    {cat.tag}
                  </span>
                </div>

                {/* Top Right Verified Badge */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/95 px-2.5 py-1 text-[11px] font-semibold text-primary-foreground shadow-xs backdrop-blur">
                    <BadgeCheck className="size-3.5" />
                    {cat.verifiedBadge}
                  </span>
                </div>

                {/* Bottom Caption & Link */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <Link
                    to={`/services/${cat.serviceSlug}`}
                    className="group/caption block text-left"
                    onClick={() => {
                      track("hero_showcase_caption_click", {
                        category_id: cat.id,
                        service: cat.serviceSlug,
                      });
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-base sm:text-lg leading-snug group-hover/caption:underline">
                        {cat.title}
                      </h3>
                      <span className="inline-flex items-center gap-0.5 text-xs text-white/80 group-hover/caption:text-white shrink-0">
                        <span>Details</span>
                        <ArrowRight className="size-3 transition-transform group-hover/caption:translate-x-0.5" />
                      </span>
                    </div>
                    <p className="text-xs text-white/85 mt-1 line-clamp-2 leading-relaxed">
                      {cat.subtitle}
                    </p>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Category Switcher Footer (Matches user mockup with loop switching) ── */}
        <div className="p-2 sm:p-2.5 bg-secondary/35 border-t border-border">
          <div
            role="tablist"
            aria-label="Care Categories Showcase"
            className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth p-0.5"
          >
            {HERO_CATEGORIES.map((cat, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  id={`hero-tab-${cat.id}`}
                  aria-selected={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => handleSelectCategory(idx)}
                  className={cn(
                    "whitespace-nowrap px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0 min-h-[38px] flex items-center justify-center relative",
                    isSelected
                      ? "bg-card text-foreground font-bold shadow-soft border border-primary/20 ring-1 ring-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                  )}
                >
                  <span>{cat.tabLabel}</span>

                  {/* Tiny animated progress indicator line underneath active tab */}
                  {isSelected && (
                    <span
                      className="absolute bottom-0.5 inset-x-2 h-0.5 rounded-full bg-primary"
                      aria-hidden
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Sub-strip with live operational status */}
          <div className="mt-2 pt-2 border-t border-border/50 flex items-center justify-between px-2 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="font-medium text-foreground">
                Bengaluru · Chennai · Hyderabad · Coimbatore
              </span>
            </div>
            <a
              href="#family-situations"
              className="font-semibold text-primary hover:underline shrink-0"
              onClick={() => track("hero_showcase_explore_click")}
            >
              Explore All ↓
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
