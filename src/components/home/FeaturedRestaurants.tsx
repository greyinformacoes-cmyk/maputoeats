import { Store } from "lucide-react";
import { featured } from "@/lib/site-data";
import { SectionHeading } from "./SectionHeading";
import { RestaurantCard } from "@/components/site/RestaurantCard";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export function FeaturedRestaurants() {
  return (
    <section className="container-page py-12">
      <SectionHeading title="Restaurantes em Destaque" to="/restaurantes" />
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
    </section>
  );
}
