import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  BadgeCheck,
  Star,
  MapPin,
  Clock,
  Volume2,
  VolumeX,
  Play,
  Square,
  Sparkles,
  ArrowRight,
  Heart,
  Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

interface CaregiverProfile {
  id: string;
  name: string;
  city: string;
  role: string;
  experience: string;
  rating: number;
  reviewsCount: number;
  languages: string[];
  badges: string[];
  bio: string;
  imageUrl: string;
  voiceIntro: {
    language: string;
    greeting: string;
    transcript: string;
    duration: string;
  };
  serviceSlug: string;
}

const FEATURED_CAREGIVERS: CaregiverProfile[] = [
  {
    id: "sunitha-k",
    name: "Sunitha K.",
    city: "Bengaluru",
    role: "Senior Geriatric Care Specialist",
    experience: "8+ Years",
    rating: 4.92,
    reviewsCount: 148,
    languages: ["Kannada", "Tamil", "English"],
    badges: ["100% Police Cleared", "Aadhaar Verified", "BLS Certified"],
    bio: "Specializes in dementia patience, gentle bed-to-chair transfers, diabetic diet monitoring, and daily mobility accompaniment.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    voiceIntro: {
      language: "Kannada & English",
      greeting: "Namaskara! I am Sunitha.",
      transcript:
        "Namaskara! I am Sunitha. I have been caring for seniors for over 8 years in Bengaluru. I treat your parents just like my own family, ensuring they take timely tablets and feel happy and dignified every day.",
      duration: "0:18",
    },
    serviceSlug: "elderly-care",
  },
  {
    id: "lakshmi-m",
    name: "Lakshmi M.",
    city: "Chennai",
    role: "Maternal & Newborn Care Attendant",
    experience: "6+ Years",
    rating: 4.95,
    reviewsCount: 124,
    languages: ["Tamil", "Telugu", "English"],
    badges: ["100% Police Cleared", "Japa Certified", "Infant CPR"],
    bio: "Expert in traditional restorative baby massage, mother postpartum recovery nutrition, soothing techniques, and night vigils.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    voiceIntro: {
      language: "Tamil & English",
      greeting: "Vanakkam! I am Lakshmi.",
      transcript:
        "Vanakkam! I am Lakshmi. Bringing a baby home should be a joyful time, not exhausting. I take care of gentle baby baths and soothing so the new mother gets 7 hours of peaceful sleep to heal.",
      duration: "0:21",
    },
    serviceSlug: "post-natal-care",
  },
  {
    id: "anitha-r",
    name: "Anitha R.",
    city: "Hyderabad",
    role: "Hospital Bedside & Post-Op Attendant",
    experience: "7+ Years",
    rating: 4.88,
    reviewsCount: 96,
    languages: ["Telugu", "Hindi", "English"],
    badges: ["100% Police Cleared", "Infection Protocol", "BLS Certified"],
    bio: "Provides vigilant bedside support during hospital admissions, coordinates with ward nurses, and assists with post-surgical recovery.",
    imageUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=300&q=80",
    voiceIntro: {
      language: "Telugu & English",
      greeting: "Namaskaram! I am Anitha.",
      transcript:
        "Namaskaram! I am Anitha from Hyderabad. When a family member is in the hospital, you need peace of mind. I stay attentive at their bedside, alert the nurses immediately, and ensure safe transfers.",
      duration: "0:19",
    },
    serviceSlug: "hospital-attendants",
  },
  {
    id: "kavitha-s",
    name: "Kavitha S.",
    city: "Coimbatore",
    role: "Senior Companion & Mobility Attendant",
    experience: "5+ Years",
    rating: 4.90,
    reviewsCount: 82,
    languages: ["Tamil", "Malayalam"],
    badges: ["100% Police Cleared", "Aadhaar Verified", "Senior Ergonomics"],
    bio: "Focuses on preventing elderly fall hazards, unhurried morning garden walks, peaceful conversations, and vital sign recording.",
    imageUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=300&q=80",
    voiceIntro: {
      language: "Tamil",
      greeting: "Vanakkam, naan Kavitha.",
      transcript:
        "Vanakkam! I am Kavitha. I love spending time with elders in Coimbatore, walking with them safely, reading Tamil newspapers, and making sure they are never lonely while their children are at work.",
      duration: "0:17",
    },
    serviceSlug: "elderly-care",
  },
];

export function CaregiverShowcase() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);

  // Filter caregivers by city
  const filteredCaregivers = FEATURED_CAREGIVERS.filter(
    (c) => selectedCity === "All" || c.city.toLowerCase() === selectedCity.toLowerCase()
  );

  // Simulated voice audio playback effect
  useEffect(() => {
    let timer: any;
    if (playingVoiceId) {
      setAudioProgress(0);
      timer = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setPlayingVoiceId(null);
            return 0;
          }
          return prev + 5;
        });
      }, 300);
    } else {
      setAudioProgress(0);
    }
    return () => clearInterval(timer);
  }, [playingVoiceId]);

  const toggleVoiceIntro = (id: string) => {
    if (playingVoiceId === id) {
      setPlayingVoiceId(null);
    } else {
      setPlayingVoiceId(id);
      track("caregiver_voice_intro_play", { caregiverId: id });
    }
  };

  return (
    <section id="caregivers" className="container-page py-16 md:py-24 scroll-mt-20">
      {/* Header & City Tabs */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-border/60 pb-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-semibold text-primary">
            <Heart className="size-3.5 text-terracotta" />
            <span>Real Faces, Authentic Voices</span>
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Meet the Compassionate Hands Caring for Your Family
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            Every attendant is background-checked by state police, biometric Aadhaar verified, and clinically trained. Listen to their personal voice introductions in their native languages.
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex flex-wrap gap-2 shrink-0">
          {["All", "Bengaluru", "Chennai", "Hyderabad", "Coimbatore"].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setSelectedCity(c);
                track("caregiver_city_filter", { city: c });
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all min-h-[38px] ${
                selectedCity === c
                  ? "bg-primary text-primary-foreground shadow-xs font-bold"
                  : "border border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {c === "All" ? "All Metros" : c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Caregiver Showcase Cards */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredCaregivers.map((cg) => {
          const isPlaying = playingVoiceId === cg.id;

          return (
            <article
              key={cg.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lift"
            >
              <div>
                {/* Header Profile Photo & Badges */}
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={cg.imageUrl}
                    alt={cg.name}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  {/* Rating Top-Right */}
                  <div className="absolute top-3 right-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-bold text-foreground backdrop-blur flex items-center gap-1 shadow-xs">
                    <Star className="size-3.5 fill-terracotta text-terracotta" />
                    <span>{cg.rating}</span>
                    <span className="text-[10px] text-muted-foreground font-normal">({cg.reviewsCount})</span>
                  </div>

                  {/* City Top-Left */}
                  <div className="absolute top-3 left-3 rounded-full bg-primary/90 px-2.5 py-0.5 text-[11px] font-semibold text-primary-foreground backdrop-blur flex items-center gap-1">
                    <MapPin className="size-3" />
                    <span>{cg.city}</span>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-semibold text-lg leading-tight">{cg.name}</h3>
                    <p className="text-xs text-white/80 mt-0.5">{cg.role}</p>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cg.badges.map((b, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-full bg-primary-soft/80 border border-primary/20 px-2.5 py-0.5 text-[10px] font-semibold text-primary"
                    >
                      <ShieldCheck className="size-3" />
                      {b}
                    </span>
                  ))}
                </div>

                {/* Languages & Experience */}
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5 text-primary" />
                    <strong className="text-foreground">{cg.experience}</strong> Exp
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] truncate max-w-[140px]">
                    <Languages className="size-3 text-terracotta" />
                    {cg.languages.join(", ")}
                  </span>
                </div>

                {/* Bio text */}
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {cg.bio}
                </p>

                {/* ── Play Voice Intro Button & Simulated Audio Waveform ── */}
                <div className="mt-4 rounded-xl border border-terracotta/25 bg-secondary/30 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-foreground flex items-center gap-1.5">
                      {isPlaying ? (
                        <Volume2 className="size-3.5 text-terracotta animate-pulse" />
                      ) : (
                        <Volume2 className="size-3.5 text-muted-foreground" />
                      )}
                      Voice Intro ({cg.voiceIntro.language})
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleVoiceIntro(cg.id)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors ${
                        isPlaying
                          ? "bg-terracotta text-terracotta-foreground"
                          : "bg-card border border-border text-foreground hover:bg-secondary"
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Square className="size-2.5 fill-current" /> Stop
                        </>
                      ) : (
                        <>
                          <Play className="size-2.5 fill-current" /> Play ({cg.voiceIntro.duration})
                        </>
                      )}
                    </button>
                  </div>

                  {/* Audio Equalizer Wave Animation while playing */}
                  {isPlaying ? (
                    <div className="mt-2.5 space-y-1.5">
                      <div className="flex items-center gap-1 h-4">
                        {[40, 75, 30, 90, 60, 100, 45, 80, 50, 70, 95, 35].map((h, i) => (
                          <span
                            key={i}
                            className="w-1 bg-terracotta rounded-full transition-all duration-200"
                            style={{
                              height: `${(h * (audioProgress % 40 + 60)) / 100}%`,
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-[11px] italic text-foreground/90 font-medium leading-relaxed bg-card/80 p-2 rounded-lg border border-border/60">
                        "{cg.voiceIntro.transcript}"
                      </p>
                    </div>
                  ) : (
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      "{cg.voiceIntro.greeting}"
                    </p>
                  )}
                </div>
              </div>

              {/* Action Button: Book this attendant */}
              <div className="mt-5 pt-3 border-t border-border">
                <Button asChild size="sm" className="w-full rounded-xl min-h-[44px]">
                  <Link
                    to="/booking"
                    search={{ service: cg.serviceSlug, city: cg.city }}
                    onClick={() => track("caregiver_request_click", { caregiverId: cg.id })}
                  >
                    <span>Request {cg.name.split(" ")[0]}</span>
                    <ArrowRight className="size-3.5 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Safety Reassurance Footnote */}
      <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-soft/40 p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BadgeCheck className="size-5 text-primary shrink-0" />
          <p className="text-xs text-foreground font-medium">
            100% of caregivers assigned by ApnaCare are direct full-time vetted personnel. Zero unverified third-party contractors.
          </p>
        </div>
        <Link
          to="/safety"
          className="text-xs font-semibold text-primary hover:underline shrink-0"
        >
          View our complete 5-step vetting architecture →
        </Link>
      </div>
    </section>
  );
}
