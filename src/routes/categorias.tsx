import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/lib/site-data";
import { SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/categorias")({
  head: () => ({
    meta: [
      { title: "Categorias — Comida Saudável MZ" },
      { name: "description", content: "Navegue pelos restaurantes de Maputo por categoria: churrasco, mariscos, comida moçambicana, pizza e mais." },
      { property: "og:title", content: "Categorias — Comida Saudável MZ" },
      { property: "og:description", content: "Restaurantes de Maputo por categoria." },
    ],
  }),
  component: CategoriasPage,
});

function CategoriasPage() {
  return (
    <SiteShell>
      <section className="bg-ink py-14 text-ink-foreground">
        <div className="container-page">
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
            Categorias <span className="text-primary">Populares</span>
          </h1>
          <p className="mt-3 max-w-xl text-ink-foreground/80">
            Encontre o tipo de comida que procura entre os restaurantes de Maputo.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map(({ name, icon: Icon }) => (
            <Link
              key={name}
              to="/restaurantes"
              className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-elegant)]"
            >
              <span className="grid size-16 place-items-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-8" strokeWidth={1.6} />
              </span>
              <span className="font-semibold text-foreground">{name}</span>
            </Link>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
