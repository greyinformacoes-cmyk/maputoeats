import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, LogIn } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navItems = [
  { label: "Início", to: "/" },
  { label: "Restaurantes", to: "/restaurantes" },
  { label: "Categorias", to: "/categorias" },
  { label: "Sobre Nós", to: "/sobre" },
  { label: "Contacto", to: "/contacto" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/80">
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Logo variant="dark" />

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3.5 py-2 text-sm font-medium text-ink-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Button asChild variant="outlineLight" size="sm" className="hidden sm:inline-flex">
            <Link to="/entrar">Entrar</Link>
          </Button>
          <Button asChild variant="hero" size="sm" className="hidden sm:inline-flex">
            <Link to="/cadastrar-restaurante">Cadastrar Restaurante</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outlineLight" size="icon" className="lg:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-ink text-ink-foreground border-white/10">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="mt-2 mb-6">
                <Logo variant="dark" />
              </div>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-base font-medium text-ink-foreground/85 transition-colors hover:bg-white/5 hover:text-primary"
                    activeProps={{ className: "text-primary bg-white/5" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild variant="outlineLight" onClick={() => setOpen(false)}>
                  <Link to="/entrar">
                    <LogIn className="size-4" /> Entrar
                  </Link>
                </Button>
                <Button asChild variant="hero" onClick={() => setOpen(false)}>
                  <Link to="/cadastrar-restaurante">Cadastrar Restaurante</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
