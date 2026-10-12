import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  CheckCircle2,
  Clock,
  FileText,
  Lock,
  LogOut,
  MapPin,
  Phone,
  Radio,
  ShieldCheck,
  Sparkles,
  UserCheck,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE, ATTENDANTS } from "@/data/site";
import { PageHero } from "@/components/site/Cards";
import { SOSDemoButton } from "@/components/site/SOS";
import { seo } from "@/lib/seo";
import { sendToGoogleSheet } from "@/lib/analytics";

export const Route = createFileRoute("/attendant-login")({
  head: () =>
    seo(
      "Attendant Portal — ApnaCare Caregiver Hub",
      "Official portal for verified ApnaCare women attendants. Shift check-in, real-time assignment telemetry, and 24/7 command center escalation.",
      { noindex: true }
    ),
  component: AttendantPortal,
});

function AttendantPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobile, setMobile] = useState("98401 23456");
  const [password, setPassword] = useState("••••••••");
  const [checkedIn, setCheckedIn] = useState(false);
  const [vitalSaved, setVitalSaved] = useState(false);

  // Mock attendant profile for Sunitha Krishnan
  const attendant = ATTENDANTS[0] || {
    name: "Sunitha Krishnan",
    role: "Senior Elderly Care Specialist",
    city: "Chennai",
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    sendToGoogleSheet({
      form_name: "Attendant Portal",
      action_type: "Attendant Login",
      attendant_id: "ATT-SK-01",
      attendant_name: attendant.name,
      mobile: mobile,
      role: attendant.role,
      city: attendant.city,
      shift_status: "Logged In",
      notes: "Attendant portal authentication session",
    }).catch(() => {});
  };

  return (
    <>
      <PageHero
        eyebrow="Caregiver Operations"
        title="ApnaCare Attendant & Specialist Portal"
        sub="Authorized workspace for registered women attendants to manage shift check-ins, record daily vitals, view safety guidelines, and connect with the 24/7 Command Center."
      />

      <section className="container-page py-12 md:py-16">
        {!isLoggedIn ? (
          <div className="mx-auto max-w-md card-soft p-8 md:p-10 shadow-soft">
            <div className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
              <ShieldCheck className="size-6" />
            </div>
            <h1 className="mt-4 text-2xl font-semibold">Attendant Sign In</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your registered attendant credentials or use the instant preview.
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <Label htmlFor="id">Registered Mobile Number</Label>
                <Input
                  id="id"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="mt-1.5 h-12 rounded-xl"
                  placeholder="e.g. 98401 23456"
                />
              </div>
              <div>
                <Label htmlFor="pw">Passcode / PIN</Label>
                <Input
                  id="pw"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 h-12 rounded-xl"
                  placeholder="Enter 4-digit PIN"
                />
              </div>

              <Button type="submit" className="w-full h-12 text-base font-medium mt-2">
                Sign In to Attendant Dashboard
              </Button>
            </form>

            <div className="mt-6 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => setIsLoggedIn(true)}
                className="w-full rounded-xl bg-secondary py-3 text-xs font-semibold text-primary transition-colors hover:bg-secondary/80 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="size-3.5" /> Instant Demo Sign-in (Sunitha Krishnan)
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              New attendant or credential renewal? Contact your city supervisor at{" "}
              <a href={`tel:${SITE.SUPPORT_PHONE_TEL}`} className="font-semibold text-primary hover:underline">{SITE.SUPPORT_PHONE}</a>.
            </p>
          </div>
        ) : (
          <div className="space-y-8 animate-fade-in">
            {/* Header info bar */}
            <div className="card-soft p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="grid size-16 place-items-center rounded-2xl bg-primary text-primary-foreground font-display text-2xl font-bold">
                  SK
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-foreground">{attendant.name}</h2>
                    <span className="rounded-full bg-primary-soft px-3 py-0.5 text-xs font-semibold text-primary">
                      Verified Active
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {attendant.role} · {attendant.city} Metro Cluster
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => setIsLoggedIn(false)}
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-muted-foreground"
                >
                  <LogOut className="size-4" /> Sign Out
                </Button>
              </div>
            </div>

            {/* Dashboard grid */}
            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
              <div className="space-y-8">
                {/* Active Assignment Card */}
                <div className="card-soft p-6 md:p-8 border-primary/40 shadow-soft">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                      Today's Scheduled Shift
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      <Clock className="size-3.5 text-primary" /> Shift: 08:00 AM – 08:00 PM (12 hrs)
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold">Elder Care & Daily Living Support</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Client: <strong>Smt. Rajeshwari K. (Age 81)</strong>
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2 rounded-2xl bg-secondary/50 p-4 text-xs">
                    <div>
                      <p className="text-muted-foreground">Residence Address</p>
                      <p className="mt-0.5 font-semibold text-foreground flex items-center gap-1">
                        <MapPin className="size-3.5 text-primary" /> 42, 4th Main, T. Nagar, Chennai
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Family Kin Contact</p>
                      <p className="mt-0.5 font-semibold text-foreground flex items-center gap-1">
                        <Phone className="size-3.5 text-primary" /> Son: +91 98840 XXXXX
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-4">
                    <Button
                      onClick={() => {
                        const nextState = !checkedIn;
                        setCheckedIn(nextState);
                        sendToGoogleSheet({
                          form_name: "Attendant Portal",
                          action_type: nextState ? "GPS Shift Check-In" : "GPS Shift Check-Out",
                          attendant_id: "ATT-SK-01",
                          attendant_name: attendant.name,
                          mobile: mobile,
                          role: attendant.role,
                          city: attendant.city,
                          shift_status: nextState ? "Active - GPS Linked" : "Completed",
                          patient_name: "Smt. Rajeshwari K. (Age 81)",
                          notes: nextState ? "Attendant on site at 42, 4th Main, T. Nagar, Chennai" : "Shift completed",
                        }).catch(() => {});
                      }}
                      variant={checkedIn ? "warm" : "default"}
                      className="gap-2"
                    >
                      <Radio className={`size-4 ${checkedIn ? "animate-pulse" : ""}`} />
                      {checkedIn ? "Checked In (Shift Active — GPS Linked)" : "GPS Shift Check-In"}
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      {checkedIn
                        ? "Command center telemetry active since 08:02 AM."
                        : "Tap upon arrival at client premises."}
                    </span>
                  </div>
                </div>

                {/* Patient Vitals & Care Log */}
                <div className="card-soft p-6 md:p-8">
                  <span className="eyebrow">Medical Logging</span>
                  <h3 className="mt-1 text-xl font-semibold">Daily Wellness Log</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Record patient vitals twice daily. Logs are shared directly with the family and supervising nurse.
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div>
                      <Label htmlFor="bp" className="text-xs">Blood Pressure (mmHg)</Label>
                      <Input id="bp" defaultValue="124/82" className="mt-1 h-10 rounded-xl" />
                    </div>
                    <div>
                      <Label htmlFor="spo2" className="text-xs">Pulse & SpO2 (%)</Label>
                      <Input id="spo2" defaultValue="98% / 72 bpm" className="mt-1 h-10 rounded-xl" />
                    </div>
                    <div>
                      <Label htmlFor="sugar" className="text-xs">Blood Glucose (mg/dL)</Label>
                      <Input id="sugar" defaultValue="114 (Fasting)" className="mt-1 h-10 rounded-xl" />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <Button
                      onClick={() => {
                        setVitalSaved(true);
                        sendToGoogleSheet({
                          form_name: "Attendant Portal",
                          action_type: "Daily Wellness Log",
                          attendant_id: "ATT-SK-01",
                          attendant_name: attendant.name,
                          mobile: mobile,
                          role: attendant.role,
                          city: attendant.city,
                          patient_name: "Smt. Rajeshwari K.",
                          vitals_summary: "BP: 124/82 mmHg | SpO2: 98% / 72 bpm | Glucose: 114 mg/dL",
                          notes: "Daily wellness log submitted by attendant",
                        }).catch(() => {});
                      }}
                      size="sm"
                      variant="outline"
                      className="gap-1.5"
                    >
                      <CheckCircle2 className="size-4 text-primary" /> {vitalSaved ? "Vitals Synced to Cloud" : "Submit Vitals Log"}
                    </Button>
                    {vitalSaved && <span className="text-xs text-primary font-medium">Recorded at 09:15 AM</span>}
                  </div>
                </div>
              </div>

              {/* Sidebar: Digital Badge & Safety */}
              <div className="space-y-6">
                <div className="card-soft p-6 border-primary/20 bg-primary-soft/30">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="size-5 text-primary" />
                    <h3 className="text-base font-semibold">Verified Credential Card</h3>
                  </div>

                  <dl className="mt-4 space-y-3 text-xs">
                    <div>
                      <dt className="text-muted-foreground">Aadhaar Biometric Status</dt>
                      <dd className="font-semibold text-primary">Authenticated (UIDAI)</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Police Clearance Certificate</dt>
                      <dd className="font-semibold text-primary">Cleared (Chennai City Police)</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">BLS & First Aid Certification</dt>
                      <dd className="font-semibold text-foreground">Valid through December 2027</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Group Insurance Policy</dt>
                      <dd className="font-semibold text-foreground">Active Policy #APC-88219</dd>
                    </div>
                  </dl>
                </div>

                <div className="card-soft p-6">
                  <h3 className="text-base font-semibold text-sos flex items-center gap-2">
                    <AlertTriangle className="size-4 text-sos" /> Command Center Escalation
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    If you experience any personal safety concern, medical crisis, or host dispute, activate the emergency protocol or call your supervisor directly.
                  </p>
                  <div className="mt-4 space-y-2">
                    <SOSDemoButton />
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link to="/safety-guidelines">Review Attendant Code of Conduct</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
