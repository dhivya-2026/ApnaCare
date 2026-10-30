import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  LayoutGrid,
  SlidersHorizontal,
} from "lucide-react";
import { formatINR } from "@/data/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import nursingCare from "@/assets/nursing-care.jpg";

export interface FamilySituation {
  id: string;
  title: string;
  tagline: string;
  trigger: string;
  description: string;
  serviceName: string;
  serviceSlug: string;
  image: string;
  alt: string;
  badge: string;
  highlights: string[];
  startingPrice: number;
}

export const FAMILY_SITUATIONS: FamilySituation[] = [
  {
    id: "aging-parent",
    title: "Helping an Ageing Parent",
    tagline: "Dignified everyday living at home",
    trigger: "When everyday living becomes difficult or parents live independently.",
    description:
      "Gentle personal hygiene assistance, mobility support, medication routines, and warm companionship so seniors live safely and comfortably at home.",
    serviceName: "Elderly Care at Home",
    serviceSlug: "elderly-care",
    image: hero1,
    alt: "Caregiver gently holding hands and assisting an elderly lady at home",
    badge: "Senior Living",
    highlights: ["Daily mobility & transfer", "Medication reminder logging", "Nutritious meal accompaniment"],
    startingPrice: 1299,
  },
  {
    id: "post-hospital",
    title: "Supporting Hospital Recovery",
    tagline: "Bedside vigil & steady recovery",
    trigger: "When ward fatigue sets in or hospital discharge begins.",
    description:
      "Dedicated bedside attendants during hospital stays and post-discharge recovery at home, coordinating with doctors and nursing staff for seamless recuperation.",
    serviceName: "Hospital & Bedside Support",
    serviceSlug: "hospital-attendants",
    image: hero2,
    alt: "Attendant assisting a recovering patient in hospital corridor",
    badge: "Recovery & Hospital",
    highlights: ["Bedside observation & nurse call coordination", "Hygiene & bed-bound comfort", "Post-op home discharge care"],
    startingPrice: 1499,
  },
  {
    id: "clinical-nursing",
    title: "Prescribed Home Clinical Nursing",
    tagline: "Licensed procedures under doctor orders",
    trigger: "When sterile surgical dressings, IVs, or clinical monitoring are required.",
    description:
      "Registered GNM/B.Sc nurses who execute medical procedures, sterile wound dressings, and vital sign monitoring strictly per written physician prescription.",
    serviceName: "Certified Clinical Nursing",
    serviceSlug: "nursing-services",
    image: nursingCare,
    alt: "Registered nurse administering sterile clinical care under doctor prescription",
    badge: "Clinical Nursing",
    highlights: ["Sterile surgical dressings & bedsores", "IV infusions & prescribed injections", "Catheter & clinical charting"],
    startingPrice: 1999,
  },
  {
    id: "postnatal-newborn",
    title: "Postnatal Rest & Infant Support",
    tagline: "Restorative sleep for mother & baby",
    trigger: "When nighttime feedings and healing require trusted practical hands.",
    description:
      "Trained maternal and infant caregivers who assist with gentle newborn massage, soothing routines, and night vigil so new mothers get restorative rest.",
    serviceName: "Post-Natal Maternal Support",
    serviceSlug: "post-natal-care",
    image: hero4,
    alt: "Experienced caregiver tenderly caring for newborn baby while mother rests",
    badge: "Maternal & Infant",
    highlights: ["Gentle newborn bath & massage", "Feeding accompaniment", "Night-time rest coverage for mothers"],
    startingPrice: 1999,
  },
  {
    id: "travel-mobility",
    title: "Assisted Travel & Clinic Accompaniment",
    tagline: "Safe transit & appointment assisted travel",
    trigger: "When medical checkups, outstation transit, or rail journeys need support.",
    description:
      "Vetted women chauffeuses and mobility companions for medical visits, airport arrivals, railway journeys, and safe local city transit.",
    serviceName: "Travel & Mobility Support",
    serviceSlug: "travel-assistance",
    image: hero5,
    alt: "Professional woman driver providing safe assisted travel for family member",
    badge: "Mobility & Transit",
    highlights: ["Door-to-door medical assisted travel", "Airport & railway platform assistance", "Licensed women drivers"],
    startingPrice: 999,
  },
  {
    id: "caregiver-respite",
    title: "Caregiver Respite & Distant Coordination",
    tagline: "Burnout relief & remote oversight",
    trigger: "When primary family caregivers need time off or live in another city.",
    description:
      "Temporary relief coverage for tired family caregivers and structured daily WhatsApp care logs for children coordinating their parents' care from another city.",
    serviceName: "Family Respite & Lifestyle Support",
    serviceSlug: "lifestyle-support",
    image: hero3,
    alt: "Caregiver taking notes and coordinating health schedule with elderly family",
    badge: "Respite & Coordination",
    highlights: ["Scheduled WhatsApp updates for remote family", "Flexible half-day or weekend relief shifts", "Care continuity during helper leaves"],
    startingPrice: 899,
  },
];

export function CareSituationSlider() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"slider" | "grid">("slider");
  const touchStartX = useRef<number | null>(null);
  const totalItems = FAMILY_SITUATIONS.length;

  // Determine how many cards are visible per page (1 on mobile, 2 on tablet, 3 on desktop)
  const maxIndex = totalItems - 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    track("care_situation_slider_nav", { direction: "prev" });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    track("care_situation_slider_nav", { direction: "next" });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const currentSituation = FAMILY_SITUATIONS[currentIndex];

  return (
    <section
      id="family-situations"
      className="py-16 md:py-24 border-b border-border/60 bg-background scroll-mt-20"
      aria-labelledby="situations-heading"
    >
      <div className="container-page">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="size-3.5" />
              <span>Your Family Needs</span>
            </div>
            <h2
              id="situations-heading"
              className="mt-3 text-fluid-section font-display font-semibold text-foreground tracking-tight"
            >
              Care, Curated for Every Need
            </h2>
            <p className="mt-3 text-fluid-body text-readable-muted">
              Every family circumstance is unique. Select your situation to explore verified, compassionate care options designed for your exact scenario.
            </p>
          </div>

          {/* Controls: Slider/Grid Toggle + Navigation Buttons */}
          <div className="flex items-center gap-3 self-start md:self-end shrink-0">
            <button
              type="button"
              onClick={() => {
                const next = viewMode === "slider" ? "grid" : "slider";
                setViewMode(next);
                track("care_situation_mode_toggle", { mode: next });
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-secondary/40 transition-colors shadow-2xs min-h-[44px] cursor-pointer"
              aria-label={viewMode === "slider" ? "Switch to grid view of all 6 scenarios" : "Switch to carousel view"}
            >
              {viewMode === "slider" ? (
                <>
                  <LayoutGrid className="size-4 text-primary" />
                  <span className="hidden sm:inline">View All in Grid</span>
                </>
              ) : (
                <>
                  <SlidersHorizontal className="size-4 text-primary" />
                  <span className="hidden sm:inline">View as Carousel</span>
                </>
              )}
            </button>

            {viewMode === "slider" && (
              <div className="flex items-center gap-2" role="group" aria-label="Carousel navigation">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="size-11 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:bg-secondary hover:border-primary/40 transition-colors shadow-2xs cursor-pointer min-h-[44px] min-w-[44px]"
                  aria-label="Previous care situation"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <span className="text-xs font-mono font-bold text-foreground px-1" aria-live="polite">
                  {currentIndex + 1} / {totalItems}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="size-11 rounded-full border border-border bg-card flex items-center justify-center text-foreground hover:bg-secondary hover:border-primary/40 transition-colors shadow-2xs cursor-pointer min-h-[44px] min-w-[44px]"
                  aria-label="Next care situation"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── VIEW MODE 1: INTERACTIVE CAROUSEL SLIDER ── */}
        {viewMode === "slider" && (
          <div
            className="mt-10"
            role="region"
            aria-roledescription="carousel"
            aria-label="Family Care Scenarios"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Featured Active Card */}
            <div className="rounded-3xl border border-border bg-card shadow-lift overflow-hidden grid lg:grid-cols-12 transition-all duration-300">
              {/* Media Frame (5 cols on desktop) */}
              <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto w-full overflow-hidden bg-muted">
                <img
                  src={currentSituation.image}
                  alt={currentSituation.alt}
                  width={800}
                  height={500}
                  loading="eager"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur shadow-xs">
                  {currentSituation.badge}
                </span>
              </div>

              {/* Information Content (7 cols on desktop) */}
              <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
                    {currentSituation.tagline}
                  </span>
                  <h3 className="mt-2 text-2xl sm:text-3xl font-display font-bold text-foreground">
                    {currentSituation.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm font-medium text-foreground/85 italic border-l-2 border-primary/40 pl-3">
                    "{currentSituation.trigger}"
                  </p>
                  <p className="mt-3 text-sm sm:text-base text-readable-muted leading-relaxed">
                    {currentSituation.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="mt-6 border-t border-border/70 pt-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-foreground block mb-2">
                      Care Includes:
                    </span>
                    <ul className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-foreground">
                      {currentSituation.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-primary shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer with Pricing and Action */}
                <div className="mt-8 pt-6 border-t border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-readable-muted uppercase font-medium">Starting from</span>
                    <span className="text-xl sm:text-2xl font-bold text-foreground font-display">
                      {formatINR(currentSituation.startingPrice)}/day
                    </span>
                    <span className="text-[11px] text-readable-muted">+ 18% statutory GST (Invoiced)</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      to="/services/$slug"
                      params={{ slug: currentSituation.serviceSlug }}
                      onClick={() => {
                        track("care_situation_selected", {
                          situation_id: currentSituation.id,
                          situation_title: currentSituation.title,
                          suggested_service: currentSituation.serviceSlug,
                          source: "homepage_situation_slider",
                        });
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs sm:text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 transition-all min-h-[44px]"
                    >
                      <span>Explore {currentSituation.serviceName}</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick-Jump Scenario Indicators */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {FAMILY_SITUATIONS.map((sit, idx) => (
                <button
                  key={sit.id}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(idx);
                    track("care_situation_dot_click", { index: idx, id: sit.id });
                  }}
                  className={cn(
                    "h-2.5 rounded-full transition-all cursor-pointer min-h-[20px] px-1 flex items-center",
                    idx === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2.5 bg-border hover:bg-muted-foreground/40"
                  )}
                  aria-label={`Go to slide ${idx + 1}: ${sit.title}`}
                  aria-current={idx === currentIndex ? "true" : undefined}
                >
                  <span className="sr-only">{sit.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── VIEW MODE 2: RESPONSIVE GRID OF ALL 6 ── */}
        {viewMode === "grid" && (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in">
            {FAMILY_SITUATIONS.map((situation) => (
              <article
                key={situation.id}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    <img
                      src={situation.image}
                      alt={situation.alt}
                      width={600}
                      height={375}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-2.5 py-0.5 text-[11px] font-semibold text-foreground backdrop-blur">
                      {situation.badge}
                    </span>
                  </div>

                  <div className="p-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-terracotta">
                      {situation.tagline}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {situation.title}
                    </h3>
                    <p className="mt-1.5 text-[11px] font-medium text-foreground/85 italic">
                      "{situation.trigger}"
                    </p>
                    <p className="mt-2 text-xs text-readable-muted leading-relaxed">
                      {situation.description}
                    </p>

                    <ul className="mt-4 space-y-1.5 border-t border-border/60 pt-3">
                      {situation.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2 text-[11px] text-foreground/85">
                          <CheckCircle2 className="size-3 text-primary shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-border/50 mt-4 flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-readable-muted uppercase font-medium">Starting from</span>
                    <span className="text-sm font-bold text-foreground font-display">
                      {formatINR(situation.startingPrice)}/day
                    </span>
                    <span className="text-[10px] text-readable-muted">+ 18% statutory GST</span>
                  </div>
                  <Link
                    to="/services/$slug"
                    params={{ slug: situation.serviceSlug }}
                    onClick={() => {
                      track("care_situation_selected", {
                        situation_id: situation.id,
                        situation_title: situation.title,
                        suggested_service: situation.serviceSlug,
                        source: "homepage_family_situations_grid",
                      });
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline min-h-[36px]"
                  >
                    <span>View Care Details</span>
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
