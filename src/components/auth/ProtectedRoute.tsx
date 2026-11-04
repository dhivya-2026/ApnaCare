import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: "CUSTOMER" | "SAHA" | "SUPER_ADMIN";
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, role, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        if (requiredRole === "CUSTOMER") window.location.href = "/customer/login";
        else if (requiredRole === "SAHA") window.location.href = "/saha/login";
        else if (requiredRole === "SUPER_ADMIN") window.location.href = "/admin/login";
        else window.location.href = "/login";
        return;
      }

      // Check role mismatch
      if (requiredRole === "CUSTOMER" && role !== "CUSTOMER") {
        if (role === "SAHA" || role === "attendant") window.location.href = "/saha/dashboard";
        else if (role === "SUPER_ADMIN" || role === "admin") window.location.href = "/admin/dashboard";
      } else if (requiredRole === "SAHA" && role !== "SAHA" && role !== "attendant") {
        if (role === "CUSTOMER") window.location.href = "/customer/dashboard";
        else if (role === "SUPER_ADMIN" || role === "admin") window.location.href = "/admin/dashboard";
      } else if (requiredRole === "SUPER_ADMIN" && role !== "SUPER_ADMIN" && role !== "admin") {
        if (role === "CUSTOMER") window.location.href = "/customer/dashboard";
        else if (role === "SAHA" || role === "attendant") window.location.href = "/saha/dashboard";
        else window.location.href = "/admin/login";
      }
    }
  }, [isLoading, user, role, requiredRole]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-6">
        <Loader2 className="h-10 w-10 animate-spin text-[#2D5016]" />
        <p className="mt-4 text-sm font-medium text-[#2D5016]">Verifying secure session...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}

