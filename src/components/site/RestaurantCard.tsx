import { Link } from "@tanstack/react-router";
import { Star, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Restaurant } from "@/lib/site-data";

export function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
      <div className="relative">
        <img
          src={r.image}
          alt={r.name}
          width={800}
          height={600}
          loading="lazy"
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-xs font-bold text-foreground shadow-sm">
          <Star className="size-3.5 fill-warning text-warning" />
          {r.rating.toFixed(1)}
        </div>
        <span className="absolute -bottom-6 left-4 grid size-12 place-items-center rounded-full border-4 border-card bg-gradient-to-br from-primary to-primary-glow text-sm font-extrabold text-primary-foreground shadow-md">
          {r.name.slice(0, 1)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 pt-8">
        <h3 className="font-display text-lg font-bold leading-tight text-foreground">{r.name}</h3>
        <p className="text-xs font-medium text-primary">{r.tags}</p>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5" /> {r.location}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" /> {r.hours}
        </p>
        <Button asChild variant="hero" size="sm" className="mt-3 w-full">
          <Link to="/restaurantes/$id" params={{ id: r.id }}>
            Ver Restaurante
          </Link>
        </Button>
      </div>
    </article>
  );
}
