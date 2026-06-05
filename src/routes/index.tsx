import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedRestaurants } from "@/components/home/FeaturedRestaurants";
import { NewsStrip } from "@/components/home/NewsStrip";
import { RecentlyAdded } from "@/components/home/RecentlyAdded";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FinalCTA } from "@/components/home/FinalCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Comida Saudável MZ — Os Melhores Restaurantes de Maputo" },
      {
        name: "description",
        content:
          "Descubra restaurantes, especialidades, horários de funcionamento e faça pedidos diretamente pela plataforma. A maior plataforma gastronómica de Maputo.",
      },
      { property: "og:title", content: "Comida Saudável MZ — Restaurantes de Maputo" },
      {
        property: "og:description",
        content: "Encontre os melhores restaurantes de Maputo, Moçambique.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <Hero />
      <Categories />
      <FeaturedRestaurants />
      <NewsStrip />
      <RecentlyAdded />
      <HowItWorks />
      <FinalCTA />
    </SiteShell>
  );
}
