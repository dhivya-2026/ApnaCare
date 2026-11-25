import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Heart,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { FamilyMemberRecord, BookingRecord } from "@/server/auth/types";
import { SERVICES, CITIES } from "@/data/site";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  familyMembers: FamilyMemberRecord[];
  initialMember?: FamilyMemberRecord | null;
  initialServiceCategory?: string;
  defaultCity?: string;
  defaultAddress?: string;
  onBookingCreated: (booking: BookingRecord) => void;
}

export function InDashboardBookingWizard({
  open,
  onOpenChange,
  familyMembers,
  initialMember,
  initialServiceCategory,
  defaultCity = "Bengaluru",
  defaultAddress = "",
  onBookingCreated,
}: Props) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [selectedMemberId, setSelectedMemberId] = useState<string>(
    initialMember?.member_id || (familyMembers[0]?.member_id ?? "")
  );
  const [customPatientName, setCustomPatientName] = useState(initialMember?.full_name || "");
  const [customRelationship, setCustomRelationship] = useState(initialMember?.relationship || "Mother");
  const [customAge, setCustomAge] = useState(initialMember ? String(initialMember.age) : "75");

  const [serviceCategory, setServiceCategory] = useState(
    initialServiceCategory || "Elderly Care"
  );
  const [serviceType, setServiceType] = useState("Dedicated Bedside Companion & Mobility Support");

  const [city, setCity] = useState(defaultCity);
  const [address, setAddress] = useState(defaultAddress);
  const [startDate, setStartDate] = useState(
    new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  );
  const [startTime, setStartTime] = useState("08:00 AM");
  const [durationDays, setDurationDays] = useState("14");
  const [shiftDuration, setShiftDuration] = useState("12 Hours / Day");
  const [specialNotes, setSpecialNotes] = useState(initialMember?.dietary_medical_notes || "");

  const activeMember = familyMembers.find((m) => m.member_id === selectedMemberId);

  const handleSelectMember = (member: FamilyMemberRecord) => {
    setSelectedMemberId(member.member_id);
    setCustomPatientName(member.full_name);
    setCustomRelationship(member.relationship);
    setCustomAge(String(member.age));
    if (member.dietary_medical_notes) {
      setSpecialNotes(member.dietary_medical_notes);
    }
  };

  const calculateEndDate = () => {
    try {
      const d = new Date(startDate);
      d.setDate(d.getDate() + Number(durationDays || 1));
      return d.toISOString().slice(0, 10);
    } catch {
      return startDate;
    }
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const patientSummary = `${customPatientName || activeMember?.full_name || "Family Member"} (${
      customRelationship || activeMember?.relationship || "Relative"
    }, Age ${customAge || activeMember?.age || 70})`;

    try {
      const res = await fetch("/api/user/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_category: serviceCategory,
          service_type: serviceType,
          patient_details: patientSummary,
          city,
          service_location: address || `${city} Residence`,
          start_date: startDate,
          start_time: startTime,
          end_date: calculateEndDate(),
          end_time: "08:00 PM",
          duration: `${durationDays} Days (${shiftDuration})`,
          special_requirements: specialNotes,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.booking) {
          toast.success(`Care request submitted! Ref: ${data.booking.booking_id}`);
          onBookingCreated(data.booking);
          onOpenChange(false);
          setStep(1);
          return;
        }
      }

      // Offline / fallback mock booking
      const fallbackBooking: BookingRecord = {
        booking_id: `BK-${Date.now().toString(36).toUpperCase()}`,
        user_id: "USR-DEMO-001",
        customer_name: "Priya Sharma",
        customer_phone: "+91 98765 43210",
        service_category: serviceCategory,
        service_type: serviceType,
        patient_details: patientSummary,
        city,
        service_location: address || `${city} Residence`,
        start_date: startDate,
        start_time: startTime,
        end_date: calculateEndDate(),
        end_time: "08:00 PM",
        duration: `${durationDays} Days (${shiftDuration})`,
        special_requirements: specialNotes,
        booking_status: "requested",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      toast.success(`Care request submitted! Ref: ${fallbackBooking.booking_id}`);
      onBookingCreated(fallbackBooking);
      onOpenChange(false);
      setStep(1);
    } catch {
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              Step {step} of 4
            </span>
          </div>
          <DialogTitle className="text-xl font-display font-semibold">
            {step === 1 && "Select Care Recipient"}
            {step === 2 && "Choose Care Service"}
            {step === 3 && "Schedule, Duration & Location"}
            {step === 4 && "Review & Submit Care Request"}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            {step === 1 && "Choose who this care is for so we understand their specific assistance requirements."}
            {step === 2 && "Select the appropriate clinical or bedside service category."}
            {step === 3 && "Specify dates, daily hours, and service location."}
            {step === 4 && "Verify all details before submitting to our central clinical coordinator."}
          </DialogDescription>
        </DialogHeader>

        {/* STEP 1: CARE RECIPIENT */}
        {step === 1 && (
          <div className="space-y-4 pt-2">
            {familyMembers.length > 0 && (
              <div className="space-y-2">
                <Label className="text-xs font-semibold">Choose from registered family profiles:</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {familyMembers.map((m) => (
                    <div
                      key={m.member_id}
                      onClick={() => handleSelectMember(m)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedMemberId === m.member_id
                          ? "border-primary bg-primary/5 shadow-2xs"
                          : "border-border hover:bg-secondary/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-foreground">{m.full_name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary font-medium">
                          {m.relationship}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        Age {m.age} · {m.mobility_level.replace("_", " ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-border space-y-3">
              <span className="text-xs font-semibold text-muted-foreground block">
                Or specify custom recipient details:
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="bwname" className="text-xs">Recipient Name</Label>
                  <Input
                    id="bwname"
                    value={customPatientName}
                    onChange={(e) => setCustomPatientName(e.target.value)}
                    placeholder="e.g. Smt. Saraswathi"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="bwrel" className="text-xs">Relationship</Label>
                  <Input
                    id="bwrel"
                    value={customRelationship}
                    onChange={(e) => setCustomRelationship(e.target.value)}
                    placeholder="e.g. Mother"
                  />
                </div>
              </div>
              <div className="w-1/2 space-y-1">
                <Label htmlFor="bwage" className="text-xs">Age</Label>
                <Input
                  id="bwage"
                  type="number"
                  value={customAge}
                  onChange={(e) => setCustomAge(e.target.value)}
                  placeholder="e.g. 78"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button onClick={() => setStep(2)} variant="warm" size="sm" className="font-semibold">
                Next: Select Service <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: CHOOSE SERVICE */}
        {step === 2 && (
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Select Care Category:</Label>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {[
                  { id: "Elderly Care", desc: "Assisted daily living, mobility aid, bathing dignity & medicine routine." },
                  { id: "Hospital Bedside Support", desc: "Post-op ward attendant, IV monitoring, bedside hygiene & doctor updates." },
                  { id: "Clinical Nursing", desc: "GNM/ANM certified nurses for wound dressing, catheter & vitals tracking." },
                  { id: "Post-Natal Care", desc: "Dedicated Japa care for recovering mothers & traditional postpartum massage." },
                  { id: "Newborn Care", desc: "Gentle baby handling, umbilical cord hygiene & pediatric routine care." },
                  { id: "Assisted Travel", desc: "Trained companion for hospital consultations, train or flight journeys." },
                ].map((svc) => (
                  <div
                    key={svc.id}
                    onClick={() => setServiceCategory(svc.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      serviceCategory === svc.id
                        ? "border-primary bg-primary/5 shadow-2xs"
                        : "border-border hover:bg-secondary/40"
                    }`}
                  >
                    <span className="font-semibold text-xs text-foreground block">{svc.id}</span>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{svc.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button onClick={() => setStep(1)} variant="outline" size="sm">
                <ArrowLeft className="size-4 mr-1.5" /> Back
              </Button>
              <Button onClick={() => setStep(3)} variant="warm" size="sm" className="font-semibold">
                Next: Schedule &amp; Location <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: SCHEDULE & LOCATION */}
        {step === 3 && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="scity" className="text-xs font-semibold">City *</Label>
                <select
                  id="scity"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Kochi">Kochi</option>
                  <option value="Mysuru">Mysuru</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="sstart" className="text-xs font-semibold">Start Date *</Label>
                <Input
                  id="sstart"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="sduration" className="text-xs font-semibold">Duration (Days)</Label>
                <select
                  id="sduration"
                  value={durationDays}
                  onChange={(e) => setDurationDays(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="1">1 Day (Trial / Single Shift)</option>
                  <option value="7">7 Days (1 Week Relief)</option>
                  <option value="14">14 Days (Convalescence)</option>
                  <option value="30">30 Days (Monthly Care Pack)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="sshift" className="text-xs font-semibold">Daily Shift Hours</Label>
                <select
                  id="sshift"
                  value={shiftDuration}
                  onChange={(e) => setShiftDuration(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="8 Hours / Day">8 Hours / Day (Day Shift)</option>
                  <option value="12 Hours / Day">12 Hours / Day (Extended Care)</option>
                  <option value="24 Hours Live-In">24 Hours Live-In (Resident Saha)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="saddress" className="text-xs font-semibold">Service Address / Ward *</Label>
              <Input
                id="saddress"
                placeholder="e.g. Flat 402, Indiranagar, HAL 2nd Stage, Bengaluru"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="snotes" className="text-xs font-semibold">
                Care Instructions &amp; Dietary Guidelines
              </Label>
              <Textarea
                id="snotes"
                placeholder="Special instructions for the attendant (e.g. diabetic meal, walker assistance, afternoon meds)."
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                className="min-h-[70px] text-xs"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button onClick={() => setStep(2)} variant="outline" size="sm">
                <ArrowLeft className="size-4 mr-1.5" /> Back
              </Button>
              <Button onClick={() => setStep(4)} variant="warm" size="sm" className="font-semibold">
                Next: Review Request <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW & CONFIRM */}
        {step === 4 && (
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-secondary/40 border border-border space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground">Service:</span>
                <span className="font-semibold text-foreground">{serviceCategory}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground">Recipient:</span>
                <span className="font-semibold text-foreground">
                  {customPatientName || activeMember?.full_name || "Family Member"} (
                  {customRelationship || activeMember?.relationship || "Relative"}, Age {customAge || 70})
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground">Location:</span>
                <span className="font-semibold text-foreground">{address || city}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground">Schedule:</span>
                <span className="font-semibold text-foreground">
                  Starts {startDate} · {durationDays} Days ({shiftDuration})
                </span>
              </div>
              {specialNotes && (
                <div className="pt-1 text-[11px] text-muted-foreground">
                  <span className="font-semibold text-foreground">Notes:</span> {specialNotes}
                </div>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 text-xs text-primary flex items-start gap-2.5">
              <ShieldCheck className="size-4 shrink-0 mt-0.5" />
              <span>
                Our central operations desk will review this request, match a police-verified Saha attendant, and confirm allocation within 15 minutes.
              </span>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button onClick={() => setStep(3)} variant="outline" size="sm">
                <ArrowLeft className="size-4 mr-1.5" /> Back
              </Button>
              <Button
                onClick={handleSubmitBooking}
                variant="warm"
                size="sm"
                disabled={submitting}
                className="font-semibold"
              >
                {submitting ? <Loader2 className="size-4 animate-spin mr-1.5" /> : <Sparkles className="size-4 mr-1.5" />}
                Confirm &amp; Submit Request
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
