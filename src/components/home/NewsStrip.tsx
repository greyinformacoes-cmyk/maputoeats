import { news } from "@/lib/site-data";
import { SectionHeading } from "./SectionHeading";

export function NewsStrip() {
  return (
    <section className="container-page py-12">
      <SectionHeading title="Novidades dos Restaurantes" to="/restaurantes" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {news.map((item, i) => (
          <div
            key={i}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
          >
            <img
              src={item.image}
              alt={item.badge}
              width={800}
              height={600}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
              {item.badge}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
