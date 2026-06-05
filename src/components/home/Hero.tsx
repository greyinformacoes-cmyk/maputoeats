import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-maputo.jpg";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroImg}
        alt="Vista da orla de Maputo ao entardecer com restaurantes"
        width={1600}
        height={900}
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[var(--gradient-hero)]" />

      <div className="container-page flex min-h-[540px] flex-col justify-center py-20 md:min-h-[600px]">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-extrabold leading-[1.08] text-ink-foreground sm:text-5xl md:text-6xl">
            Encontre os Melhores Restaurantes de <span className="text-primary">Maputo</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-ink-foreground/85 sm:text-lg">
            Descubra restaurantes, especialidades, horários de funcionamento e faça pedidos
            diretamente através da plataforma.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-8 flex w-full max-w-xl flex-col gap-3 rounded-2xl bg-background/95 p-2 shadow-[var(--shadow-elegant)] backdrop-blur sm:flex-row sm:items-center sm:rounded-full"
          >
            <div className="flex flex-1 items-center gap-3 px-4">
              <Search className="size-5 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="Procurar restaurante, prato ou especialidade"
                aria-label="Procurar restaurante, prato ou especialidade"
                className="h-11 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <Button type="submit" variant="hero" size="lg" className="rounded-full">
              Buscar
            </Button>
          </form>

          <div className="mt-6">
            <Button asChild variant="hero" size="xl" className="rounded-full">
              <Link to="/restaurantes">Explorar Restaurantes</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
