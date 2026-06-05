import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { Star, MapPin, Clock, MessageCircle, ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { featured, recent, news } from "@/lib/site-data";

function findRestaurant(id: string) {
  const f = featured.find((r) => r.id === id);
  if (f) return { ...f };
  const r = recent.find((x) => x.id === id);
  if (r)
    return {
      id: r.id,
      name: r.name,
      image: r.image,
      tags: r.category,
      location: `${r.district}, Maputo`,
      hours: "Aberto até 22:00",
      rating: 4.5,
    };
  return null;
}

export const Route = createFileRoute("/restaurantes/$id")({
  head: ({ params }) => {
    const r = findRestaurant(params.id);
    const title = r ? `${r.name} — Comida Saudável MZ` : "Restaurante — Comida Saudável MZ";
    return {
      meta: [
        { title },
        { name: "description", content: r ? `${r.name} em ${r.location}. ${r.tags}.` : "Perfil de restaurante." },
        { property: "og:title", content: title },
        { property: "og:image", content: r?.image ?? "" },
      ],
    };
  },
  component: RestaurantDetail,
  notFoundComponent: () => (
    <SiteShell>
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-2xl font-bold">Restaurante não encontrado</h1>
        <Button asChild variant="hero" className="mt-6">
          <Link to="/restaurantes">Ver restaurantes</Link>
        </Button>
      </div>
    </SiteShell>
  ),
  errorComponent: () => {
    const router = useRouter();
    return (
      <SiteShell>
        <div className="container-page py-24 text-center">
          <h1 className="font-display text-2xl font-bold">Algo correu mal</h1>
          <Button variant="hero" className="mt-6" onClick={() => router.invalidate()}>
            Tentar novamente
          </Button>
        </div>
      </SiteShell>
    );
  },
});

function RestaurantDetail() {
  const { id } = Route.useParams();
  const r = findRestaurant(id);

  if (!r) {
    return (
      <SiteShell>
        <div className="container-page py-24 text-center">
          <h1 className="font-display text-2xl font-bold">Restaurante não encontrado</h1>
          <Button asChild variant="hero" className="mt-6">
            <Link to="/restaurantes">Ver restaurantes</Link>
          </Button>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <section className="relative isolate">
        <img src={r.image} alt={r.name} width={1600} height={600} className="h-72 w-full object-cover sm:h-96" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
        <div className="container-page absolute inset-x-0 bottom-0">
          <div className="pb-8 text-ink-foreground">
            <Link to="/restaurantes" className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-foreground/80 hover:text-primary">
              <ArrowLeft className="size-4" /> Voltar
            </Link>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{r.name}</h1>
                <p className="mt-1 text-sm font-medium text-primary">{r.tags}</p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1.5 text-sm font-bold text-foreground">
                <Star className="size-4 fill-warning text-warning" /> {r.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-8 py-12 lg:grid-cols-[1.4fr_0.6fr]">
        <div>
          <h2 className="mb-4 font-display text-xl font-bold text-foreground">Galeria</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {news.map((n, i) => (
              <img
                key={i}
                src={n.image}
                alt={`${r.name} - ${n.badge}`}
                width={800}
                height={600}
                loading="lazy"
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <h3 className="font-display text-lg font-bold text-foreground">Informações</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5"><MapPin className="size-4 text-primary" /> {r.location}</li>
              <li className="flex items-center gap-2.5"><Clock className="size-4 text-primary" /> {r.hours}</li>
            </ul>
            <Button asChild variant="hero" size="lg" className="mt-5 w-full">
              <a href="https://wa.me/258841234567" target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" /> Contactar pelo WhatsApp
              </a>
            </Button>
          </div>
        </aside>
      </section>
    </SiteShell>
  );
}
