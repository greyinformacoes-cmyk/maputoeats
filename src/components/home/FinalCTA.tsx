import { Link } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="container-page py-14">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-10 text-ink-foreground shadow-[var(--shadow-elegant)] md:px-12 md:py-12">
        <div className="absolute -right-16 -top-16 size-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="flex items-start gap-5">
            <span className="hidden size-14 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary sm:grid">
              <Store className="size-7" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-bold text-ink-foreground sm:text-3xl">
                Tem um Restaurante?
              </h2>
              <p className="mt-2 max-w-md text-sm text-ink-foreground/75">
                Junte-se à maior plataforma de descoberta de restaurantes de Maputo.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl" className="rounded-full">
              <Link to="/cadastrar-restaurante">Cadastrar Restaurante Agora</Link>
            </Button>
            <span className="text-sm font-medium text-ink-foreground/70">
              Apenas <span className="font-bold text-primary">3.000 MZN</span> por mês
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
