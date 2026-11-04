import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface AuthUser {
  userId: string;
  fullName: string;
  email: string;
  phone?: string;
  role: string;
  city?: string;
  accountStatus?: string;
  customerId?: string;
  sahaId?: string;
  approvalStatus?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  customer: any | null;
  saha: any | null;
  role: string | null;
  isLoading: boolean;
  isCustomer: boolean;
  isSaha: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, role?: string) => Promise<{ success: boolean; error?: string; code?: string }>;
  register: (data: any) => Promise<{ success: boolean; error?: string; details?: string[] }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [customer, setCustomer] = useState<any | null>(null);
  const [saha, setSaha] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
          setCustomer(data.customer || null);
          setSaha(data.saha || null);
          return;
        }
      }
      setUser(null);
      setCustomer(null);
      setSaha(null);
    } catch (err) {
      console.warn("[useAuth] Failed to load session:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  const login = async (email: string, password: string, role?: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login-v2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          error: data.error || "Login failed",
          code: data.code,
        };
      }

      setUser(data.user);
      await fetchSession();
      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Network error" };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (formData: any) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          error: data.error || "Registration failed",
          details: data.details,
        };
      }

      setUser(data.user);
      await fetchSession();
      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Network error" };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.warn("[useAuth] Logout error:", err);
    } finally {
      setUser(null);
      setCustomer(null);
      setSaha(null);
      window.location.href = "/login";
    }
  };

  const role = user?.role || null;
  const isCustomer = role === "CUSTOMER";
  const isSaha = role === "SAHA" || role === "attendant";
  const isAdmin = role === "SUPER_ADMIN" || role === "admin" || role === "coordinator";

  return (
    <AuthContext.Provider
      value={{
        user,
        customer,
        saha,
        role,
        isLoading,
        isCustomer,
        isSaha,
        isAdmin,
        login,
        register,
        logout,
        refresh: fetchSession,
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

