/**
 * ApnaCare Authentication React Hook
 *
 * Provides session state, login, logout, and role-based guards
 * for all three portals (Customer, Saha, Admin).
 *
 * Usage:
 *   const { user, role, isLoading, login, logout, register } = useAuth();
 */

import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from "react";

export type UserRole = "CUSTOMER" | "SAHA" | "SUPER_ADMIN";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  city: string;
  account_status: string;
  email_verified: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  profile: Record<string, any> | null;
  role: UserRole | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (credentials: { email?: string; phone?: string; password: string; role?: string }) => Promise<{ success: boolean; redirect?: string; error?: string }>;
  register: (data: {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    role: "CUSTOMER" | "SAHA";
    city?: string;
    preferred_language?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

type AuthContextValue = AuthState & AuthActions;

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    role: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        if (data.authenticated && data.user) {
          setState({
            user: data.user,
            profile: data.profile,
            role: data.user.role as UserRole,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
          return;
        }
      }
      setState((prev) => ({ ...prev, user: null, profile: null, role: null, isLoading: false, isAuthenticated: false }));
    } catch {
      setState((prev) => ({ ...prev, user: null, profile: null, role: null, isLoading: false, isAuthenticated: false }));
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = useCallback(async (credentials: { email?: string; phone?: string; password: string }): Promise<{ success: boolean; redirect?: string; error?: string }> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch("/api/auth/login-v2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });
      const data = await res.json();

      if (res.ok && data.authenticated) {
        setState({
          user: data.user,
          profile: null,
          role: data.user.role as UserRole,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });
        return { success: true, redirect: data.redirect };
      }

      setState((prev) => ({ ...prev, isLoading: false, error: data.error || "Login failed" }));
      return { success: false, error: data.error || "Login failed" };
    } catch {
      const error = "Network error. Please try again.";
      setState((prev) => ({ ...prev, isLoading: false, error }));
      return { success: false, error };
    }
  }, []);

  const register = useCallback(async (data: {
    full_name: string;
    email: string;
    phone: string;
    password: string;
    role: "CUSTOMER" | "SAHA";
    city?: string;
    preferred_language?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok && result.authenticated) {
        setState({
          user: result.user,
          profile: null,
          role: result.role as UserRole,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });
        return { success: true };
      }

      setState((prev) => ({ ...prev, isLoading: false, error: result.error || "Registration failed" }));
      return { success: false, error: result.error };
    } catch {
      const error = "Network error. Please try again.";
      setState((prev) => ({ ...prev, isLoading: false, error }));
      return { success: false, error };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } catch { /* ignore */ }
    setState({
      user: null,
      profile: null,
      role: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}

/** Guard: only CUSTOMER */
export function useRequireCustomer() {
  const { user, role, isLoading } = useAuth();
  return { user, isCustomer: role === "CUSTOMER", isLoading };
}

/** Guard: only SAHA */
export function useRequireSaha() {
  const { user, role, isLoading } = useAuth();
  return { user, isSaha: role === "SAHA", isLoading };
}

/** Guard: only SUPER_ADMIN */
export function useRequireAdmin() {
  const { user, role, isLoading } = useAuth();
  return { user, isAdmin: role === "SUPER_ADMIN", isLoading };
}

