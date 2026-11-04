import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Phone,
  UserCheck,
  Plus,
  LogOut,
  ShieldCheck,
  Loader2,
  FileText,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/customer/dashboard")({
  head: () =>
    seo("Customer Care Dashboard — ApnaCare", "Manage your family care bookings, assigned Sahas, and care plans.", {
      noindex: true,
    }),
  component: () => (
    <ProtectedRoute requiredRole="CUSTOMER">
      <CustomerDashboard />
    </ProtectedRoute>
  ),
});

interface Booking {
  bookingId: string;
  serviceType: string;
  recipientName: string;
  city: string;
  shift: string;
  startDate: string;
  endDate?: string;
  status: string;
  assignedSahaId?: string;
  estimatedCost?: number;
  notes?: string;
}

function CustomerDashboard() {
  const { user, customer, logout } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"bookings" | "profile">("bookings");

  // Profile edit state
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    city: user?.city || "",
    emergencyContact: customer?.emergencyContact || "",
    languagePreference: customer?.languagePreference || "English",
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/customers/bookings", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setBookings(data.bookings || []);
        }
      } catch (err) {
        console.error("Failed to load customer bookings:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBookings();
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setProfileMessage(null);

    try {
      const res = await fetch("/api/customers/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profileData),
      });

      if (res.ok) {
        setProfileMessage("Profile updated successfully.");
      } else {
        setProfileMessage("Failed to update profile.");
      }
    } catch {
      setProfileMessage("Error updating profile.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "CONFIRMED":
      case "SAHA_ASSIGNED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "IN_PROGRESS":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "COMPLETED":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "CANCELLED":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  return (
    <div className="min-h-screen bg-secondary/15 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header Card */}
        <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-[#2D5016]/10 text-[#2D5016] flex items-center justify-center shrink-0">
              <Heart className="size-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-foreground">
                  Welcome, {user?.fullName || "Family Member"}
                </h1>
                <span className="text-xs bg-[#2D5016]/10 text-[#2D5016] px-2.5 py-0.5 rounded-full font-semibold">
                  Customer
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" /> {user?.city || "South India"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="size-3.5" /> {user?.phone || "No phone linked"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button asChild className="bg-[#2D5016] hover:bg-[#233f11] text-white rounded-xl shadow-soft flex-1 md:flex-initial">
              <Link to="/booking">
                <Plus className="size-4 mr-1.5" />
                <span>Book Care</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={logout}
              className="rounded-xl border-border text-muted-foreground hover:text-foreground"
            >
              <LogOut className="size-4 mr-1.5" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 border-b border-border pb-3">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === "bookings"
                ? "bg-[#2D5016] text-white shadow-soft"
                : "text-muted-foreground hover:bg-card"
            }`}
          >
            My Care Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === "profile"
                ? "bg-[#2D5016] text-white shadow-soft"
                : "text-muted-foreground hover:bg-card"
            }`}
          >
            Profile & Family Preferences
          </button>
        </div>

        {/* Tab 1: Bookings */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            {isLoading ? (
              <div className="bg-card border border-border rounded-3xl p-12 text-center">
                <Loader2 className="size-8 animate-spin text-[#2D5016] mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Loading your care bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="bg-card border border-dashed border-border rounded-3xl p-12 text-center max-w-xl mx-auto">
                <div className="size-14 rounded-2xl bg-[#2D5016]/10 text-[#2D5016] mx-auto flex items-center justify-center mb-4">
                  <Calendar className="size-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">No bookings found yet</h3>
                <p className="text-xs text-muted-foreground mt-1 mb-6">
                  Ready to book compassionate elder care, post-natal care, or hospital assistance? Customize a plan tailored to your loved ones.
                </p>
                <Button asChild className="bg-[#2D5016] hover:bg-[#233f11] text-white rounded-xl">
                  <Link to="/booking">
                    <Plus className="size-4 mr-1.5" />
                    <span>Create Your First Booking</span>
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((b) => (
                  <div
                    key={b.bookingId}
                    className="bg-card border border-border rounded-3xl p-6 shadow-soft hover:shadow-lift transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[11px] font-mono text-muted-foreground">
                          #{b.bookingId}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                            b.status
                          )}`}
                        >
                          {b.status.replace(/_/g, " ")}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {b.serviceType}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-4">
                        For: <strong className="text-foreground">{b.recipientName}</strong>
                      </p>

                      <div className="space-y-2 text-xs text-muted-foreground bg-secondary/30 p-3 rounded-2xl">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="size-3.5 text-[#2D5016]" /> Start Date:
                          </span>
                          <span className="font-medium text-foreground">{b.startDate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Clock className="size-3.5 text-[#2D5016]" /> Shift:
                          </span>
                          <span className="font-medium text-foreground">{b.shift}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-[#2D5016]" /> City:
                          </span>
                          <span className="font-medium text-foreground">{b.city}</span>
                        </div>
                      </div>

                      {b.assignedSahaId && (
                        <div className="mt-4 p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-3">
                          <div className="size-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                            <UserCheck className="size-4" />
                          </div>
                          <div>
                            <div className="text-[10px] uppercase font-bold text-emerald-800">Assigned Saha</div>
                            <div className="text-xs font-semibold text-foreground">Verified Care Companion</div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">24/7 Desk Support</span>
                      <a href="tel:+918825493949" className="font-semibold text-[#2D5016] hover:underline flex items-center gap-1">
                        <Phone className="size-3" /> Call Help Desk
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Profile */}
        {activeTab === "profile" && (
          <div className="bg-card border border-border rounded-3xl p-8 shadow-soft max-w-2xl">
            <h2 className="text-xl font-semibold text-foreground mb-1">Customer Profile & Family Details</h2>
            <p className="text-xs text-muted-foreground mb-6">
              Keep your contact details up to date for emergency alerts and Saha assignment dispatch.
            </p>

            {profileMessage && (
              <div className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>{profileMessage}</span>
              </div>
            )}

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div>
                <Label htmlFor="prof-name" className="text-xs font-medium">Full Name</Label>
                <Input
                  id="prof-name"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                  className="rounded-xl mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prof-phone" className="text-xs font-medium">Mobile Number</Label>
                  <Input
                    id="prof-phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="rounded-xl mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="prof-city" className="text-xs font-medium">Home City</Label>
                  <Input
                    id="prof-city"
                    value={profileData.city}
                    onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                    className="rounded-xl mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="prof-emg" className="text-xs font-medium">Emergency Contact (Phone & Relation)</Label>
                <Input
                  id="prof-emg"
                  placeholder="e.g. Son: +91 98888 77777"
                  value={profileData.emergencyContact}
                  onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                  className="rounded-xl mt-1"
                />
              </div>

              <div>
                <Label htmlFor="prof-lang" className="text-xs font-medium">Preferred Language with Saha</Label>
                <Input
                  id="prof-lang"
                  placeholder="e.g. Kannada, Tamil, Telugu, Hindi, English"
                  value={profileData.languagePreference}
                  onChange={(e) => setProfileData({ ...profileData, languagePreference: e.target.value })}
                  className="rounded-xl mt-1"
                />
              </div>

              <Button
                type="submit"
                disabled={isSavingProfile}
                className="bg-[#2D5016] hover:bg-[#233f11] text-white rounded-xl shadow-soft mt-2"
              >
                {isSavingProfile ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-2" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Profile Updates</span>
                )}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

