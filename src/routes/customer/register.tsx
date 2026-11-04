import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Lock, Mail, Phone, MapPin, AlertCircle, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/customer/register")({
  head: () =>
    seo("Create Family Account — ApnaCare", "Create an account to book and manage personalized care services.", {
      noindex: true,
    }),
  component: CustomerRegisterPage,
});

const CITIES = [
  "Bengaluru",
  "Chennai",
  "Hyderabad",
  "Coimbatore",
  "Mysore",
  "Kochi",
  "Madurai",
  "Trichy",
  "Visakhapatnam",
  "Other",
];

function CustomerRegisterPage() {
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "Bengaluru",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.agreeTerms) {
      setError("Please agree to the Terms of Service & Privacy Policy.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await registerAuth({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        password: formData.password,
        role: "CUSTOMER",
      });

      if (res.success) {
        navigate({ to: "/customer/dashboard" });
      } else {
        setError(res.error || (res.details ? res.details.join(", ") : "Registration failed."));
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/30 to-background">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            to="/customer/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>

        <div className="bg-card border border-border rounded-3xl p-8 shadow-soft">
          <div className="text-center mb-6">
            <div className="size-12 rounded-2xl bg-[#2D5016]/10 text-[#2D5016] mx-auto flex items-center justify-center mb-3">
              <Heart className="size-6" />
            </div>
            <h1 className="font-serif text-2xl font-semibold text-foreground">Create Family Account</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Join ApnaCare to personalize and manage compassionate care
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-2.5">
              <AlertCircle className="size-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <Label htmlFor="fullName" className="text-xs font-medium">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                required
                placeholder="e.g. Ramesh Kumar"
                value={formData.fullName}
                onChange={handleChange}
                className="rounded-xl mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-xs font-medium">Email Address</Label>
              <div className="relative mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="ramesh@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-xl pl-9"
                />
                <Mail className="size-4 text-muted-foreground absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="phone" className="text-xs font-medium">Mobile Number</Label>
                <div className="relative mt-1">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="rounded-xl pl-8"
                  />
                  <Phone className="size-3.5 text-muted-foreground absolute left-2.5 top-3 pointer-events-none" />
                </div>
              </div>

              <div>
                <Label htmlFor="city" className="text-xs font-medium">Primary City</Label>
                <div className="relative mt-1">
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full h-10 rounded-xl border border-input bg-background px-3 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="password" className="text-xs font-medium">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Min 6 chars"
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded-xl mt-1"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-xs font-medium">Confirm</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Confirm"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="rounded-xl mt-1"
                />
              </div>
            </div>

            <div className="pt-2 flex items-start gap-2">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-0.5 rounded border-border text-[#2D5016] focus:ring-[#2D5016]"
              />
              <Label htmlFor="agreeTerms" className="text-[11px] text-muted-foreground leading-tight cursor-pointer">
                I agree to the ApnaCare{" "}
                <Link to="/terms" className="text-[#2D5016] underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-[#2D5016] underline">
                  Privacy Policy
                </Link>
                .
              </Label>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#2D5016] hover:bg-[#233f11] text-white rounded-xl py-5 font-semibold shadow-soft mt-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Complete Registration</span>
              )}
            </Button>
          </form>

          <div className="mt-5 pt-4 border-t border-border/60 text-center">
            <p className="text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link to="/customer/login" className="font-semibold text-[#2D5016] hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

