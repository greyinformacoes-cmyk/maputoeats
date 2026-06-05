import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Target, Heart, Users } from "lucide-react";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre Nós — Comida Saudável MZ" },
      { name: "description", content: "Conheça a Comida Saudável MZ, a plataforma que conecta clientes aos melhores restaurantes de Maputo, Moçambique." },
      { property: "og:title", content: "Sobre Nós — Comida Saudável MZ" },
      { property: "og:description", content: "A plataforma gastronómica de Maputo." },
    ],
  }),
  component: SobrePage,
});

const valores = [
  { icon: Target, title: "A nossa missão", text: "Conectar clientes aos melhores restaurantes de Maputo de forma simples e confiável." },
  { icon: Heart, title: "Gastronomia local", text: "Valorizamos a comida moçambicana e os sabores únicos da nossa cidade." },
  { icon: Users, title: "Comunidade", text: "Ajudamos restaurantes a crescer e clientes a descobrir novas experiências." },
];

function SobrePage() {
  return (
    <SiteShell>
      <section className="bg-ink py-16 text-ink-foreground">
        <div className="container-page max-w-3xl">
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
            Sobre a <span className="text-primary">Comida Saudável MZ</span>
          </h1>
          <p className="mt-4 text-ink-foreground/80">
            Somos a maior plataforma de descoberta e divulgação de restaurantes de Maputo. O nosso
            objetivo é transmitir confiança e profissionalismo, ajudando restaurantes a aumentar a
            sua visibilidade e clientes a encontrarem as melhores experiências gastronómicas.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-6 py-14 md:grid-cols-3">
        {valores.map((v) => (
          <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
            <span className="grid size-12 place-items-center rounded-full bg-secondary text-primary">
              <v.icon className="size-6" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-foreground">{v.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
          </div>
        ))}
      </section>

      <section className="container-page pb-16">
        <div className="rounded-3xl bg-secondary/50 p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground">Tem um restaurante?</h2>
          <p className="mt-2 text-muted-foreground">Junte-se por apenas 3.000 MZN por mês.</p>
          <Button asChild variant="hero" size="lg" className="mt-5">
            <Link to="/cadastrar-restaurante">Cadastrar Restaurante</Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
