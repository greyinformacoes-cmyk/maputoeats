import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "admin" | "client";

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  role: AppRole | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshRole: () => Promise<AppRole | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchRole(userId: string): Promise<AppRole | null> {
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);
  if (!data || data.length === 0) return "client";
  if (data.some((r) => r.role === "admin")) return "admin";
  return "client";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        if (!active) return;
        setSession(newSession);
        setUser(newSession?.user ?? null);
        if (newSession?.user) {
          // defer to avoid deadlocks inside the auth callback
          setTimeout(() => {
            fetchRole(newSession.user.id).then((r) => {
              if (active) setRole(r);
            });
          }, 0);
        } else {
          setRole(null);
        }
      },
    );

    supabase.auth.getSession().then(({ data: { session: existing } }) => {
      if (!active) return;
      setSession(existing);
      setUser(existing?.user ?? null);
      if (existing?.user) {
        fetchRole(existing.user.id).then((r) => {
          if (active) {
            setRole(r);
            setLoading(false);
          }
        });
      } else {
        setLoading(false);
      }
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setRole(null);
  }

  async function refreshRole() {
    if (!user) return null;
    const r = await fetchRole(user.id);
    setRole(r);
    return r;
  }

  return (
    <AuthContext.Provider
      value={{ session, user, role, loading, signOut, refreshRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
