import { Link } from "@tanstack/react-router";
import {
  HeartHandshake,
  CheckCircle2,
  ShieldCheck,
  CalendarCheck,
  MessageCircle,
  ArrowRight,
  Info,
  Clock,
  Sparkles,
} from "lucide-react";
import hero2 from "@/assets/hero-2.jpg";
import { buildWhatsAppUrl } from "@/data/site";
import { track } from "@/lib/analytics";

interface CareRecoveryStoryProps {
  className?: string;
  sourceContext?: string;
}

export function CareRecoveryStory({
  className = "",
  sourceContext = "homepage",
}: CareRecoveryStoryProps) {
  const waUrl = buildWhatsAppUrl(
    "Hello ApnaCare team, I need help arranging post-hospital recovery support for a family member. Could you guide me through attendant vs nursing availability and timelines?"
  );

  return (
    <section
      id="recovery-story"
      className={`py-16 md:py-24 border-b border-border/60 bg-gradient-to-b from-secondary/15 via-background to-secondary/20 scroll-mt-20 ${className}`}
      aria-labelledby="recovery-story-heading"
    >
      <div className="container-page">
        {/* Story Container */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 lg:p-12 shadow-soft">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            {/* Visual Column (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted border border-border shadow-lift">
                <img
                  src={hero2}
                  alt="Attendant providing gentle, dignified bedside assistance to a recovering family member"
                  width={800}
                  height={600}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="rounded-full bg-primary/95 px-2.5 py-1 text-[11px] font-semibold text-primary-foreground backdrop-blur">
                    Hospital to Home Recovery
                  </span>
                  <p className="font-semibold text-sm sm:text-base mt-1.5 leading-snug">
                    Gentle bedside vigil, mobility transfer, and doctor prescription compliance.
                  </p>
                </div>
              </div>

              {/* Verified Trust Strip */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/40 border border-border/80 text-xs">
                <div className="flex items-center gap-1.5 text-readable-muted font-medium">
                  <ShieldCheck className="size-4 text-primary shrink-0" />
                  <span>100% Police & Photo ID Verified</span>
                </div>
                <div className="flex items-center gap-1.5 text-readable-muted font-medium">
                  <Clock className="size-4 text-primary shrink-0" />
                  <span>90-Min Cluster Standby</span>
                </div>
              </div>
            </div>

            {/* Narrative & Step Sequence Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft/80 px-3.5 py-1 text-xs font-semibold text-primary">
                  <HeartHandshake className="size-3.5" />
                  <span>Empathetic Care Story</span>
                </div>

                {/* Approved Priority Headline */}
                <h2
                  id="recovery-story-heading"
                  className="mt-3 text-fluid-section font-display font-semibold text-foreground tracking-tight"
                >
                  Recovery is hard enough. You shouldn't have to coordinate everything alone.
                </h2>

                {/* Situation Description */}
                <p className="mt-3 text-fluid-body text-readable-muted">
                  Hospital discharge day is overwhelming. Between discharge summaries, medicine schedules, surgical wound dressing, and bedside comfort, family caregivers face immediate exhaustion. ApnaCare steps in with verified support so your family can focus on healing.
                </p>

                {/* Three Simple Coordination Steps */}
                <div className="mt-8 space-y-4">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3.5 rounded-2xl bg-secondary/35 p-4 border border-border/70">
                    <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">
                        Comprehensive Triage & Clinical Scope Check
                      </h4>
                      <p className="text-xs text-readable-muted mt-1 leading-relaxed">
                        We clarify whether your loved one needs non-clinical living assistance (attendant) or licensed medical procedures (GNM/B.Sc nurse) to guarantee clinical safety.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3.5 rounded-2xl bg-secondary/35 p-4 border border-border/70">
                    <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">
                        Matched Attendant Assigned with Verified Digital Dossier
                      </h4>
                      <p className="text-xs text-readable-muted mt-1 leading-relaxed">
                        You receive a pre-screened caregiver profile with government photo ID authentication and police verification records before they step into your home.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3.5 rounded-2xl bg-secondary/35 p-4 border border-border/70">
                    <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">
                        Daily WhatsApp Care Logs & 90-Minute Cluster Backup
                      </h4>
                      <p className="text-xs text-readable-muted mt-1 leading-relaxed">
                        Receive objective daily logs on meals, mobility, and comfort. If a caregiver takes leave, our regional cluster backup protocol ensures continuous care.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Scope & Safety Boundary Notice */}
                <div className="mt-6 rounded-xl bg-amber-500/10 border border-amber-600/20 p-3.5 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2">
                  <Info className="size-4 shrink-0 text-amber-700 dark:text-amber-400 mt-0.5" />
                  <p className="leading-snug">
                    <strong>Medical Boundary:</strong> Attendants provide non-clinical support (bathing, repositioning, meal accompaniment). Licensed medical procedures (injections, catheter, sterile wound dressings) are performed strictly by registered nurses under doctor prescription.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  to="/services/hospital-attendants"
                  onClick={() => {
                    track("recovery_story_cta_click", {
                      action: "view_service",
                      source: sourceContext,
                    });
                  }}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs sm:text-sm font-semibold text-primary-foreground shadow-soft hover:bg-primary/90 transition-all min-h-[44px]"
                >
                  <CalendarCheck className="size-4" />
                  <span>Book Recovery Attendant</span>
                  <ArrowRight className="size-4 ml-1" />
                </Link>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    track("recovery_story_whatsapp_click", {
                      source: sourceContext,
                    });
                  }}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/15 px-5 py-3 text-xs sm:text-sm font-semibold text-[#128C7E] hover:bg-[#25D366]/25 transition-colors min-h-[44px]"
                >
                  <MessageCircle className="size-4 text-[#25D366]" />
                  <span>Discuss Recovery Plan on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
