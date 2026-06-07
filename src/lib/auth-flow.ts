import { supabase } from "@/integrations/supabase/client";

export type LoginResult =
  | { ok: true; created: boolean }
  | { ok: false; reason: "wrong_password" | "error"; message: string };

/**
 * Single-button flow:
 * - Try to sign in with email + password.
 * - If that fails, try to create a new client account and sign in.
 * - If the account already exists but the password is wrong, report it.
 */
export async function loginOrRegister(
  email: string,
  password: string,
): Promise<LoginResult> {
  const cleanEmail = email.trim().toLowerCase();

  const signIn = await supabase.auth.signInWithPassword({
    email: cleanEmail,
    password,
  });

  if (!signIn.error && signIn.data.session) {
    return { ok: true, created: false };
  }

  // Sign in failed — attempt to register a new client account.
  const signUp = await supabase.auth.signUp({
    email: cleanEmail,
    password,
    options: {
      emailRedirectTo:
        typeof window !== "undefined" ? window.location.origin : undefined,
      data: { full_name: cleanEmail.split("@")[0] },
    },
  });

  if (signUp.error) {
    const msg = signUp.error.message.toLowerCase();
    if (
      msg.includes("already registered") ||
      msg.includes("already been registered") ||
      msg.includes("user already exists")
    ) {
      return {
        ok: false,
        reason: "wrong_password",
        message: "Palavra-passe incorreta para esta conta.",
      };
    }
    return { ok: false, reason: "error", message: signUp.error.message };
  }

  if (signUp.data.session) {
    return { ok: true, created: true };
  }

  // No session returned — try to sign in once more.
  const retry = await supabase.auth.signInWithPassword({
    email: cleanEmail,
    password,
  });
  if (!retry.error && retry.data.session) {
    return { ok: true, created: true };
  }

  return {
    ok: false,
    reason: "error",
    message: retry.error?.message ?? "Não foi possível iniciar sessão.",
  };
}

export async function getCurrentRole(): Promise<"admin" | "client"> {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return "client";
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);
  if (data?.some((r) => r.role === "admin")) return "admin";
  return "client";
}
