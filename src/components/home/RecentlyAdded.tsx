import { Store } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { recent } from "@/lib/site-data";
import { SectionHeading } from "./SectionHeading";
import { Button } from "@/components/ui/button";

export function RecentlyAdded() {
  return (
    <section className="container-page py-12">
      <SectionHeading title="Restaurantes Recentemente Adicionados" to="/restaurantes" />
      {recent.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 py-16 text-center">
          <Store className="mb-4 size-10 text-muted-foreground" />
          <h3 className="font-display text-lg font-semibold text-foreground">Ainda não há restaurantes recentes</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Seja o primeiro a cadastrar o seu restaurante na plataforma.
          </p>
          <Button asChild variant="hero" className="mt-5">
            <Link to="/cadastrar-restaurante">Cadastrar Restaurante</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {recent.map((r) => (
            <article
              key={r.id}
              className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]"
            >
              <img
                src={r.image}
                alt={r.name}
                width={800}
                height={600}
                loading="lazy"
                className="h-28 w-full object-cover"
              />
              <div className="flex flex-1 flex-col gap-1 p-3">
                <h3 className="text-sm font-bold leading-tight text-foreground">{r.name}</h3>
                <p className="text-xs text-primary">{r.category}</p>
                <p className="text-xs text-muted-foreground">{r.district}</p>
                <Button asChild variant="outline" size="sm" className="mt-2 w-full">
                  <Link to="/restaurantes/$id" params={{ id: r.id }}>
                    Ver Perfil
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
