import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { AuthSessionUser, Role } from "@/server/auth/types";

interface AuthContextType {
  user: AuthSessionUser | null;
  role: Role | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string; role?: Role }) => Promise<{ success: boolean; error?: string; redirectUrl?: string }>;
  loginAsDemo: (role?: Role) => { success: boolean; redirectUrl: string };
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthSessionUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    // 1. Check client-side demo session persistence first
    try {
      const demoRaw = typeof window !== "undefined" ? sessionStorage.getItem("apnacare_demo_session") : null;
      if (demoRaw) {
        const demoUser = JSON.parse(demoRaw);
        if (demoUser && demoUser.id && demoUser.role) {
          setUser(demoUser);
          setIsLoading(false);
          return;
        }
      }
    } catch {}

    // 2. Fetch server-side cookie session
    try {
      const res = await fetch("/api/auth/session", {
        headers: { "Accept": "application/json" },
      });
      if (res.ok) {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          if (data?.authenticated && data?.user) {
            setUser(data.user);
          } else {
            setUser(null);
          }
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = async (credentials: { email: string; password: string; role?: Role }) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const text = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch {
        // If server returned non-JSON error (e.g. 500 HTML or gateway timeout), allow smooth demo fallback
        return {
          success: false,
          error: "The server encountered a temporary connection issue. You can tap 'View Demo Dashboard' below to preview the portal immediately.",
        };
      }

      if (!res.ok || !data.success) {
        return { success: false, error: data.error || "Login failed. Please check your credentials." };
      }

      if (data.user) {
        setUser(data.user);
      } else {
        await refreshSession();
      }

      return {
        success: true,
        redirectUrl: data.redirectUrl || (data.role === "admin" ? "/dashboard/admin" : data.role === "attendant" ? "/dashboard/attendant" : "/dashboard/user"),
      };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error. Please try again." };
    }
  };

  /**
   * Instant interactive Demo Login for visitors & reviewers to test any role
   */
  const loginAsDemo = (demoRole: Role = "user"): { success: boolean; redirectUrl: string } => {
    let demoUser: AuthSessionUser;
    let redirectUrl = "/dashboard/user";

    if (demoRole === "admin" || demoRole === "super_admin") {
      demoUser = {
        id: "ADM-DEMO-001",
        name: "ApnaCare Super Admin (Demo)",
        email: "admin@apnacare.in",
        role: "admin",
        city: "Central Command",
        status: "active",
      };
      redirectUrl = "/dashboard/admin";
    } else if (demoRole === "attendant" || demoRole === "saha") {
      demoUser = {
        id: "ATT-BLR-001",
        name: "Lakshmi Priya (Demo Saha)",
        email: "lakshmi.saha@apnacare.in",
        phone: "+91 98450 12345",
        role: "attendant",
        city: "Bengaluru",
        status: "active",
        verificationStatus: "verified",
      };
      redirectUrl = "/dashboard/attendant";
    } else {
      demoUser = {
        id: "USR-DEMO-001",
        name: "Priya Sharma (Demo User)",
        email: "user.test@apnacare.in",
        phone: "+91 98765 43210",
        role: "user",
        city: "Bengaluru",
        status: "active",
      };
      redirectUrl = "/dashboard/user";
    }

    try {
      sessionStorage.setItem("apnacare_demo_session", JSON.stringify(demoUser));
    } catch {}

    setUser(demoUser);
    return { success: true, redirectUrl };
  };

  const logout = async () => {
    try {
      sessionStorage.removeItem("apnacare_demo_session");
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore network failure on logout
    } finally {
      setUser(null);
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginAsDemo,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
