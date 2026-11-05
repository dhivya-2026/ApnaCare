import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/server/auth/types";
import { Link, useNavigate } from "@tanstack/react-router";
import { ShieldAlert, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
  fallbackUrl?: string;
}

export function ProtectedRoute({
  children,
  allowedRoles,
  fallbackUrl = "/login",
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: fallbackUrl as any });
    }
  }, [isLoading, isAuthenticated, navigate, fallbackUrl]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="size-8 text-primary animate-spin" />
        <p className="mt-4 text-sm font-medium text-muted-foreground">Verifying secure session...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="container-page py-16 text-center max-w-md mx-auto space-y-4">
        <div className="size-12 rounded-full bg-destructive/10 text-destructive grid place-items-center mx-auto">
          <ShieldAlert className="size-6" />
        </div>
        <h2 className="text-xl font-display font-semibold text-foreground">Sign In Required</h2>
        <p className="text-xs text-muted-foreground">Please sign in to access this portal.</p>
        <Button asChild variant="warm" className="w-full">
          <Link to="/login">Go to Login Portal</Link>
        </Button>
      </div>
    );
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="container-page py-16 text-center max-w-md mx-auto space-y-4">
        <div className="size-12 rounded-full bg-amber-500/10 text-amber-600 grid place-items-center mx-auto">
          <ShieldAlert className="size-6" />
        </div>
        <h2 className="text-xl font-display font-semibold text-foreground">Access Restricted</h2>
        <p className="text-xs text-muted-foreground">
          Your account ({user.role}) does not have permission to view this section.
        </p>
        <Button asChild variant="outline" className="w-full">
          <Link to="/login">Switch Account</Link>
        </Button>
      </div>
    );
  }

  return <>{children}</>;
}
