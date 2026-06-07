import { createFileRoute } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { featured, recent } from "@/lib/site-data";
import { SiteShell } from "@/components/site/SiteShell";
import { RestaurantCard } from "@/components/site/RestaurantCard";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/restaurantes/")({
  head: () => ({
    meta: [
      { title: "Restaurantes em Maputo — Comida Saudável MZ" },
      {
        name: "description",
        content: "Explore todos os restaurantes de Maputo na Comida Saudável MZ. Fotos, especialidades, horários e localização.",
      },
      { property: "og:title", content: "Restaurantes em Maputo — Comida Saudável MZ" },
      { property: "og:description", content: "Explore todos os restaurantes de Maputo." },
    ],
  }),
  component: RestaurantesPage,
});

function RestaurantesPage() {
  return (
    <SiteShell>
      <section className="bg-ink py-14 text-ink-foreground">
        <div className="container-page">
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
            Restaurantes em <span className="text-primary">Maputo</span>
          </h1>
          <p className="mt-3 max-w-xl text-ink-foreground/80">
            Descubra os melhores restaurantes da cidade. Veja fotos, especialidades e horários.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <h2 className="mb-6 font-display text-2xl font-bold text-foreground">Em Destaque</h2>
        {featured.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 py-16 text-center">
            <Store className="mb-4 size-10 text-muted-foreground" />
            <h3 className="font-display text-lg font-semibold text-foreground">Ainda não há restaurantes em destaque</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Seja o primeiro a cadastrar o seu restaurante na plataforma.
            </p>
            <Button asChild variant="hero" className="mt-5">
              <Link to="/cadastrar-restaurante">Cadastrar Restaurante</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((r) => (
              <RestaurantCard key={r.id} r={r} />
            ))}
          </div>
        )}

        <h2 className="mb-6 mt-14 font-display text-2xl font-bold text-foreground">
          Recentemente Adicionados
        </h2>
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
                <img src={r.image} alt={r.name} width={800} height={600} loading="lazy" className="h-28 w-full object-cover" />
                <div className="flex flex-1 flex-col gap-1 p-3">
                  <h3 className="text-sm font-bold leading-tight text-foreground">{r.name}</h3>
                  <p className="text-xs text-primary">{r.category}</p>
                  <p className="text-xs text-muted-foreground">{r.district}</p>
                  <Button asChild variant="outline" size="sm" className="mt-2 w-full">
                    <Link to="/restaurantes/$id" params={{ id: r.id }}>Ver Perfil</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
