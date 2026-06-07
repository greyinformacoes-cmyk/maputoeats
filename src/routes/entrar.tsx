import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/site/Logo";
import { loginOrRegister, getCurrentRole } from "@/lib/auth-flow";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar — Comida Saudável MZ" },
      { name: "description", content: "Aceda à plataforma Comida Saudável MZ." },
    ],
  }),
  component: EntrarPage,
});

const schema = z.object({
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(6, "A palavra-passe deve ter pelo menos 6 caracteres").max(72),
});

function EntrarPage() {
  const navigate = useNavigate();
  const { user, role, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Already signed in → send to the right place.
  useEffect(() => {
    if (!loading && user) {
      navigate({ to: role === "admin" ? "/admin" : "/", replace: true });
    }
  }, [loading, user, role, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setSubmitting(true);
    const result = await loginOrRegister(parsed.data.email, parsed.data.password);

    if (!result.ok) {
      setError(result.message);
      setSubmitting(false);
      return;
    }

    const userRole = await getCurrentRole();
    navigate({ to: userRole === "admin" ? "/admin" : "/", replace: true });
  }

  return (
    <SiteShell>
      <section className="container-page flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
          <div className="mb-6 flex justify-center">
            <Logo variant="light" />
          </div>
          <h1 className="text-center font-display text-2xl font-bold text-foreground">
            Entrar
          </h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            Use o seu e-mail e palavra-passe. Se ainda não tiver conta, criamos uma automaticamente.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="space-y-1.5">
              <Label>E-mail</Label>
              <Input
                type="email"
                placeholder="email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Palavra-passe</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> A entrar...
                </>
              ) : (
                "Seguir"
              )}
            </Button>
          </form>
        </div>
      </section>
    </SiteShell>
  );
}
