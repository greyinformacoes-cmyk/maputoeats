import { featured } from "@/lib/site-data";
import { SectionHeading } from "./SectionHeading";
import { RestaurantCard } from "@/components/site/RestaurantCard";

export function FeaturedRestaurants() {
  return (
    <section className="container-page py-12">
      <SectionHeading title="Restaurantes em Destaque" to="/restaurantes" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((r) => (
          <RestaurantCard key={r.id} r={r} />
        ))}
      </div>
    </section>
  );
}
