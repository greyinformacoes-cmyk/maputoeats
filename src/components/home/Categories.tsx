import { Link } from "@tanstack/react-router";
import { categories } from "@/lib/site-data";
import { SectionHeading } from "./SectionHeading";

export function Categories() {
  return (
    <section className="container-page py-12">
      <SectionHeading title="Categorias Populares" to="/categorias" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map(({ name, icon: Icon }) => (
          <Link
            key={name}
            to="/categorias"
            className="group flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-4 text-center shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-elegant)]"
          >
            <span className="grid size-12 place-items-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="size-6" strokeWidth={1.8} />
            </span>
            <span className="text-xs font-semibold leading-tight text-foreground">{name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
