import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Heart,
  Activity,
  Baby,
  Volume2,
  VolumeX,
  Play,
  Square,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Phone,
  Check,
  Languages,
  Clock,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero4 from "@/assets/hero-4.jpg";

interface ScenarioData {
  id: "elderly" | "hospital" | "postnatal";
  tabLabel: string;
  tabIcon: string;
  headline: string;
  subhead: string;
  image: string;
  imageAlt: string;
  solutionLink: string;
  withoutApnaCare: {
    tag: string;
    description: string;
    painPoints: string[];
  };
  withApnaCare: {
    tag: string;
    description: string;
    reliefPoints: string[];
  };
  voiceNote: {
    caregiverName: string;
    role: string;
    city: string;
    duration: string;
    language: string;
    quote: string;
    transcript: string;
  };
  whatsAppUpdate: {
    sender: string;
    avatarInitials: string;
    timestamp: string;
    message1: string;
    time1: string;
    message2: string;
    time2: string;
  };
}

const SCENARIOS: ScenarioData[] = [
  {
    id: "elderly",
    tabLabel: "Living Away from Ageing Parents",
    tabIcon: "👵",
    headline: "When you are miles away, distance amplifies every little worry.",
    subhead:
      "Balancing demanding meetings while aging parents live alone creates constant emotional anxiety about unattended slips, missed meals, or delayed medication.",
    image: hero1,
    imageAlt: "Caregiver gently holding hands with an elderly woman at home",
    solutionLink: "/solutions/families-elderly",
    withoutApnaCare: {
      tag: "Without ApnaCare: The Stressful Reality",
      description:
        "Every phone call that goes unanswered makes your heart skip a beat. You worry constantly during work hours.",
      painPoints: [
        "Unanswered calls trigger instant panic about sudden falls in the bathroom.",
        "Unmonitored medication timers leading to skipped BP and diabetes doses.",
        "Unreliable local maids arrive late, cancel abruptly, with zero backup.",
        "Growing social isolation and quiet loneliness affecting parents' cognitive health.",
      ],
    },
    withApnaCare: {
      tag: "With ApnaCare: Peace of Mind for the Family",
      description:
        "Your parents have a gentle, verified companion who speaks their language and treats them with genuine filial dignity.",
      reliefPoints: [
        "Punctual, police-cleared attendant arrives with warm greetings in Kannada/Tamil/Telugu.",
        "Medication logged on time, blood pressure recorded, and warm tea prepared to their liking.",
        "Unhurried 15-minute garden walk with safe mobility accompaniment.",
        "Instant daily WhatsApp updates sent to you with vital signs and photos.",
      ],
    },
    voiceNote: {
      caregiverName: "Sunitha K.",
      role: "Senior Geriatric Specialist",
      city: "Bengaluru",
      duration: "0:15",
      language: "Kannada & English",
      quote: "I treat every mother and father just like my own...",
      transcript:
        "Namaskara! I am Sunitha from Bengaluru. When adult children are abroad or at the office, I make sure parents take their tablets on time, walk safely, and never feel lonely. You can work peacefully knowing they are safe.",
    },
    whatsAppUpdate: {
      sender: "Sunitha K. (ApnaCare)",
      avatarInitials: "SK",
      timestamp: "Today",
      time1: "9:15 AM",
      message1:
        "Namaskara Ananth sir! Amma had her idli breakfast and morning BP checked (120/80 - normal). We're taking a 15-min walk in the garden now! 🌿",
      time2: "2:00 PM",
      message2:
        "Post-lunch tablets given on time. Amma had curd rice and is resting comfortably. Vitals are completely steady. Will update at 5 PM! 🙏",
    },
  },
  {
    id: "hospital",
    tabLabel: "Post-Surgery / Hospital Discharge Stress",
    tabIcon: "🏥",
    headline: "Leaving the hospital brings relief—but the first 14 days are critical.",
    subhead:
      "Hospital corridors and post-operative weeks place immense physical exhaustion on family members balancing office work, childcare, and bedside vigils.",
    image: hero2,
    imageAlt: "Attendant providing walking assistance to a patient in hospital corridor",
    solutionLink: "/solutions/post-hospitalization",
    withoutApnaCare: {
      tag: "Without ApnaCare: The Stressful Reality",
      description:
        "Family members spend sleepless nights in hospital chairs, exhausted and terrified of accidental readmission.",
      painPoints: [
        "Sleepless nights in uncomfortable hospital chairs trying to stay alert 24/7.",
        "Fear of accidental slips or pulling surgical drains during bathroom transfers.",
        "Exhausted spouse or children unable to focus on work or rest.",
        "High risk of unplanned emergency readmission due to improper post-op handling.",
      ],
    },
    withApnaCare: {
      tag: "With ApnaCare: Peace of Mind for the Family",
      description:
        "A trained bedside attendant stays vigilant around the clock, assisting with hygiene and coordinating with nurses so family can recharge.",
      reliefPoints: [
        "Trained bedside attendant assists with nurse call bells, hygiene, and safe bed transfers.",
        "Incision hygiene monitoring and sterile handling reducing infection risks.",
        "Vigilant night watch so family members can sleep peacefully at home and recharge.",
        "Smooth transition from hospital bed to home bedroom with zero disruption.",
      ],
    },
    voiceNote: {
      caregiverName: "Anitha R.",
      role: "Hospital Bedside Specialist",
      city: "Hyderabad",
      duration: "0:18",
      language: "Telugu & English",
      quote: "I stay awake through the night so family can sleep...",
      transcript:
        "Namaskaram! I am Anitha from Hyderabad. Hospital corridors are exhausting for family. I stay alert by the patient's bedside, call the nurse when needed, and assist with safe walking so you can rest.",
    },
    whatsAppUpdate: {
      sender: "Anitha R. (ApnaCare Hospital Desk)",
      avatarInitials: "AR",
      timestamp: "Today",
      time1: "11:30 AM",
      message1:
        "Hello Priya ma'am! Uncle completed his 10-minute physiotherapy walking session smoothly. Pulse 78 bpm, SpO2 98%. Ward sister gave the IV drip.",
      time2: "4:15 PM",
      message2:
        "Surgical dressing is completely clean & dry. Uncle had warm soup and is watching news comfortably. Everything is smooth! 👍",
    },
  },
  {
    id: "postnatal",
    tabLabel: "Exhausted New Parents (Fourth Trimester)",
    tabIcon: "🍼",
    headline: "The fourth trimester is about healing—not sheer physical exhaustion.",
    subhead:
      "Bringing a newborn home brings immense joy, but physical recovery from delivery combined with round-the-clock feeding cycles leaves mothers deeply overwhelmed.",
    image: hero4,
    imageAlt: "Post-natal attendant gently holding and caring for a newborn baby",
    solutionLink: "/solutions/new-mothers",
    withoutApnaCare: {
      tag: "Without ApnaCare: The Stressful Reality",
      description:
        "Sleepless nights and physical pain leave new parents overwhelmed, anxious, and depleted of energy.",
      painPoints: [
        "Mother waking up every 90 minutes with zero continuous deep sleep to heal incisions.",
        "Nervousness around newborn umbilical cord care and first slippery baby baths.",
        "Partner burnt out balancing cooking, household chores, and baby soothing.",
        "Postpartum fatigue leading to heightened stress, tears, and anxiety.",
      ],
    },
    withApnaCare: {
      tag: "With ApnaCare: Peace of Mind for the Family",
      description:
        "An experienced maternal caregiver takes over newborn bath, soothing, and massage routines so mom gets 7+ hours of restorative sleep.",
      reliefPoints: [
        "Experienced Japa-trained attendant handles traditional newborn massage and warm water baths.",
        "Mother gets 7+ hours of continuous restorative sleep while baby is gently soothed.",
        "Nutritious postpartum dietary accompaniment supporting lactation and wound healing.",
        "A peaceful, supportive home atmosphere where parents can joyfully bond with baby.",
      ],
    },
    voiceNote: {
      caregiverName: "Lakshmi M.",
      role: "Post-Natal & Infant Specialist",
      city: "Chennai",
      duration: "0:20",
      language: "Tamil & English",
      quote: "Mother's healing sleep is our highest priority...",
      transcript:
        "Vanakkam! I am Lakshmi from Chennai. Bringing a baby home should be joyful, not exhausting. I take care of gentle baby massage, burping, and soothing so the new mother gets 7 hours of peaceful sleep to heal.",
    },
    whatsAppUpdate: {
      sender: "Lakshmi M. (ApnaCare Maternal)",
      avatarInitials: "LM",
      timestamp: "Today",
      time1: "8:30 AM",
      message1:
        "Vanakkam Karthik sir! Baby had gentle warm almond oil massage and warm bath at 8 AM. Slept soundly. Kavitha ma'am got 7 hours of uninterrupted sleep last night! 🌸",
      time2: "1:45 PM",
      message2:
        "Post-natal herbal soup prepared for ma'am. Baby burped and resting comfortably on the crib. Both doing wonderfully! 👶✨",
    },
  },
];

export function InteractiveLifeMoments() {
  const [activeTab, setActiveTab] = useState<"elderly" | "hospital" | "postnatal">("elderly");
  const [viewMode, setViewMode] = useState<"without" | "with">("with");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const scenario = SCENARIOS.find((s) => s.id === activeTab) || SCENARIOS[0]!;

  // Reset audio when tab changes
  useEffect(() => {
    setIsPlayingAudio(false);
    setAudioProgress(0);
  }, [activeTab]);

  // Audio wave playback simulation
  useEffect(() => {
    let timer: any;
    if (isPlayingAudio) {
      setAudioProgress(0);
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 6;
        });
      }, 300);
    } else {
      setAudioProgress(0);
    }
    return () => clearInterval(timer);
  }, [isPlayingAudio]);

  const toggleAudio = () => {
    setIsPlayingAudio((prev) => !prev);
    track("life_moments_voice_play", { scenario: scenario.id });
  };

  return (
    <section className="bg-gradient-to-b from-secondary/35 via-background to-secondary/20 py-16 md:py-24 border-y border-border/50">
      <div className="container-page">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1 text-xs font-semibold text-primary backdrop-blur">
            <Sparkles className="size-3.5 text-terracotta" />
            <span>Interactive Life Moments</span>
          </div>

          <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl leading-tight">
            We bridge the distance between your worry and their well-being.
          </h2>
          <p className="mt-3 text-pretty text-base text-muted-foreground md:text-lg leading-relaxed">
            Because care shouldn't feel like hiring an agency—it should feel like family. Explore how ApnaCare transforms everyday family moments from anxiety into peaceful reassurance.
          </p>

          {/* High-Trust Dignified Micro-Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-card px-3 py-1 text-xs font-semibold text-foreground shadow-2xs">
              <ShieldCheck className="size-3.5 text-primary" />
              100% Police Verified
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-card px-3 py-1 text-xs font-semibold text-foreground shadow-2xs">
              <Languages className="size-3.5 text-terracotta" />
              Language-Matched (Tamil / Telugu / Kannada / English)
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-card px-3 py-1 text-xs font-semibold text-foreground shadow-2xs">
              <CheckCircle2 className="size-3.5 text-primary" />
              Zero Hidden Fees
            </span>
          </div>
        </div>

        {/* 3 Quick-Toggle Scenario Tabs */}
        <div className="mt-10 flex flex-wrap gap-2.5" role="tablist" aria-label="Care situations">
          {SCENARIOS.map((s) => {
            const isActive = activeTab === s.id;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveTab(s.id);
                  track("life_moments_scenario_switch", { scenario: s.id });
                }}
                className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs md:text-sm font-semibold transition-all duration-200 min-h-[46px] ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft ring-2 ring-primary/30 font-bold"
                    : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-secondary/40 hover:text-foreground"
                }`}
              >
                <span className="text-base">{s.tabIcon}</span>
                <span>{s.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* ── Main Interactive Showcase Card ── */}
        <div className="mt-8 overflow-hidden rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-card via-card to-secondary/30 shadow-lift transition-all duration-300">
          {/* Top Bar inside Card: Scenario Headline & Before/After Toggle Switch */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-border/80 bg-secondary/30 p-6 md:p-8">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
                Real-World Family Scenario
              </span>
              <h3 className="mt-1 font-display text-xl md:text-2xl font-bold text-foreground leading-snug">
                {scenario.headline}
              </h3>
              <p className="mt-1 text-xs md:text-sm text-muted-foreground">
                {scenario.subhead}
              </p>
            </div>

            {/* Before vs. ApnaCare Toggle Switch */}
            <div className="flex items-center rounded-full border border-border bg-background p-1 shadow-soft shrink-0">
              <button
                type="button"
                onClick={() => {
                  setViewMode("without");
                  track("life_moments_view_toggle", { mode: "without" });
                }}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all min-h-[38px] ${
                  viewMode === "without"
                    ? "bg-destructive/15 text-destructive border border-destructive/30 shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                ⚠️ Without ApnaCare
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode("with");
                  track("life_moments_view_toggle", { mode: "with" });
                }}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all min-h-[38px] ${
                  viewMode === "with"
                    ? "bg-primary text-primary-foreground shadow-xs font-extrabold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                ✨ With ApnaCare Relief
              </button>
            </div>
          </div>

          {/* Main Card Body */}
          <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column (5 Cols): High-Res Authentic Photography + Audio Voice Note */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-muted shadow-soft">
                <img
                  src={scenario.image}
                  alt={scenario.imageAlt}
                  width={700}
                  height={525}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-white/80">
                    Verified Attendant Care
                  </p>
                  <p className="text-sm font-semibold">{scenario.voiceNote.caregiverName} · {scenario.voiceNote.city}</p>
                </div>
              </div>

              {/* Native Audio Voice Note Badge */}
              <div className="rounded-2xl border border-terracotta/30 bg-secondary/40 p-4 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="grid size-8 place-items-center rounded-full bg-terracotta/20 text-terracotta">
                      {isPlayingAudio ? (
                        <Volume2 className="size-4 animate-pulse" />
                      ) : (
                        <Volume2 className="size-4" />
                      )}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-foreground">
                        Voice Note: {scenario.voiceNote.caregiverName}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {scenario.voiceNote.language} · {scenario.voiceNote.duration}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={toggleAudio}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                      isPlayingAudio
                        ? "bg-terracotta text-terracotta-foreground shadow-xs"
                        : "border border-border bg-card text-foreground hover:bg-secondary"
                    }`}
                  >
                    {isPlayingAudio ? (
                      <>
                        <Square className="size-3 fill-current" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="size-3 fill-current" /> Listen (15s)
                      </>
                    )}
                  </button>
                </div>

                {/* Animated Equalizer Wave when playing */}
                {isPlayingAudio ? (
                  <div className="mt-3 space-y-2 animate-fade-in">
                    <div className="flex items-center gap-1 h-3.5">
                      {[30, 80, 45, 95, 60, 100, 50, 75, 40, 90, 65, 35, 85].map((h, i) => (
                        <span
                          key={i}
                          className="w-1 bg-terracotta rounded-full transition-all duration-200"
                          style={{
                            height: `${(h * (audioProgress % 30 + 70)) / 100}%`,
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-xs italic text-foreground leading-relaxed bg-card/90 p-2.5 rounded-xl border border-border">
                      "{scenario.voiceNote.transcript}"
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 text-xs italic text-muted-foreground">
                    "{scenario.voiceNote.quote}"
                  </p>
                )}
              </div>
            </div>

            {/* Right Column (7 Cols): The Toggle Content (Without vs With) + Real WhatsApp Snapshot */}
            <div className="lg:col-span-7 space-y-6">
              {viewMode === "without" ? (
                /* ── WITHOUT APNACARE: The Stressful Reality ── */
                <div className="rounded-3xl border border-destructive/25 bg-destructive/5 p-6 md:p-8 animate-fade-in">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-destructive/15 px-3 py-1 text-xs font-bold text-destructive">
                    <AlertCircle className="size-3.5" />
                    <span>The Stressful Reality (Without Dedicated Care)</span>
                  </div>

                  <h4 className="mt-3 text-xl font-bold text-foreground">
                    {scenario.withoutApnaCare.tag}
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {scenario.withoutApnaCare.description}
                  </p>

                  <div className="mt-5 space-y-3">
                    {scenario.withoutApnaCare.painPoints.map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-2xl bg-card/80 p-3.5 border border-destructive/20 text-xs md:text-sm text-foreground/90 font-medium"
                      >
                        <span className="grid size-5 place-items-center rounded-full bg-destructive/15 text-destructive shrink-0 mt-0.5">
                          ×
                        </span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-destructive/20 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Ready to experience peace of mind?
                    </p>
                    <button
                      type="button"
                      onClick={() => setViewMode("with")}
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      See how ApnaCare brings relief →
                    </button>
                  </div>
                </div>
              ) : (
                /* ── WITH APNACARE: The Peace of Mind ── */
                <div className="rounded-3xl border border-primary/30 bg-primary-soft/30 p-6 md:p-8 animate-fade-in shadow-soft">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    <CheckCircle2 className="size-3.5" />
                    <span>The Peace of Mind (With ApnaCare)</span>
                  </div>

                  <h4 className="mt-3 text-xl font-bold text-foreground">
                    {scenario.withApnaCare.tag}
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {scenario.withApnaCare.description}
                  </p>

                  {/* Relief Points Grid */}
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {scenario.withApnaCare.reliefPoints.map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 rounded-2xl bg-card p-3.5 border border-primary/20 text-xs md:text-sm text-foreground font-medium shadow-2xs"
                      >
                        <Check className="size-4 text-primary shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* ── REAL WHATSAPP DAILY CARE LOG SNAPSHOT ── */}
                  <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-[#EFEAE2] dark:bg-card p-4 shadow-lift">
                    {/* WhatsApp Header */}
                    <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="grid size-8 place-items-center rounded-full bg-[#128C7E] text-white text-xs font-bold">
                          {scenario.whatsAppUpdate.avatarInitials}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-foreground leading-none">
                            {scenario.whatsAppUpdate.sender}
                          </p>
                          <span className="text-[10px] text-[#128C7E] dark:text-[#25D366] font-semibold flex items-center gap-1">
                            <span className="size-1.5 rounded-full bg-[#25D366]"></span>
                            Online · Daily Care Desk
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-muted-foreground text-xs">
                        <Phone className="size-3.5" />
                        <MessageCircle className="size-3.5" />
                      </div>
                    </div>

                    {/* WhatsApp Messages */}
                    <div className="mt-3 space-y-2.5 text-xs">
                      {/* Message 1 */}
                      <div className="flex justify-start">
                        <div className="max-w-[88%] rounded-2xl rounded-tl-xs bg-white dark:bg-secondary p-3 shadow-xs text-foreground leading-relaxed">
                          <p>{scenario.whatsAppUpdate.message1}</p>
                          <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
                            <span>{scenario.whatsAppUpdate.time1}</span>
                            <span className="text-[#34B7F1] font-bold">✓✓</span>
                          </div>
                        </div>
                      </div>

                      {/* Message 2 */}
                      <div className="flex justify-start">
                        <div className="max-w-[88%] rounded-2xl rounded-tl-xs bg-white dark:bg-secondary p-3 shadow-xs text-foreground leading-relaxed">
                          <p>{scenario.whatsAppUpdate.message2}</p>
                          <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
                            <span>{scenario.whatsAppUpdate.time2}</span>
                            <span className="text-[#34B7F1] font-bold">✓✓</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Micro-Action CTA */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-primary/20">
                    <p className="text-xs text-muted-foreground font-medium">
                      Guaranteed 90-min backup dispatch in Bengaluru, Chennai, Hyderabad & Coimbatore.
                    </p>

                    <Button asChild size="lg" className="rounded-full px-7 shadow-soft font-bold min-h-[46px]">
                      <a
                        href="#care-navigator"
                        onClick={() =>
                          track("life_moments_match_caregiver_click", {
                            scenario: scenario.id,
                          })
                        }
                      >
                        Match a Caregiver for My Family
                        <ArrowRight className="ml-2 size-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
