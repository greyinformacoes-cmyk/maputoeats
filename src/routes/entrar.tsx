import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar — Comida Saudável MZ" },
      { name: "description", content: "Aceda ao painel do seu restaurante na Comida Saudável MZ." },
    ],
  }),
  component: EntrarPage,
});

function EntrarPage() {
  return (
    <SiteShell>
      <section className="container-page flex min-h-[70vh] items-center justify-center py-16">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
          <div className="mb-6 flex justify-center">
            <Logo variant="light" />
          </div>
          <h1 className="text-center font-display text-2xl font-bold text-foreground">
            Entrar na plataforma
          </h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            Aceda ao painel do seu restaurante.
          </p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <Label>E-mail</Label>
              <Input type="email" placeholder="email@exemplo.com" />
            </div>
            <div className="space-y-1.5">
              <Label>Palavra-passe</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full">
              Entrar
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Ainda não tem conta?{" "}
            <Link to="/cadastrar-restaurante" className="font-semibold text-primary hover:underline">
              Cadastrar Restaurante
            </Link>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
