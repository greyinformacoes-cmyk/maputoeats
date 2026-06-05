import { Link } from "@tanstack/react-router";
import { recent } from "@/lib/site-data";
import { SectionHeading } from "./SectionHeading";
import { Button } from "@/components/ui/button";

export function RecentlyAdded() {
  return (
    <section className="container-page py-12">
      <SectionHeading title="Restaurantes Recentemente Adicionados" to="/restaurantes" />
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
    </section>
  );
}
