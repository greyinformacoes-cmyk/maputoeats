import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";

const cols = [
  {
    title: "Navegação",
    links: [
      { label: "Início", to: "/" },
      { label: "Restaurantes", to: "/restaurantes" },
      { label: "Categorias", to: "/categorias" },
      { label: "Sobre Nós", to: "/sobre" },
      { label: "Contacto", to: "/contacto" },
    ],
  },
  {
    title: "Para Restaurantes",
    links: [
      { label: "Cadastrar Restaurante", to: "/cadastrar-restaurante" },
      { label: "Como Funciona", to: "/sobre" },
      { label: "Entrar", to: "/entrar" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo variant="dark" />
          <p className="max-w-xs text-sm text-ink-foreground/70">
            A plataforma que conecta você aos melhores restaurantes de Maputo.
          </p>
          <div className="flex gap-3">
            {[Facebook, Instagram, Phone].map((Icon, i) => (
              <span
                key={i}
                className="grid size-9 place-items-center rounded-full bg-white/8 text-ink-foreground/80 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Icon className="size-4" />
              </span>
            ))}
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-sm font-semibold text-primary">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-ink-foreground/70 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 text-sm font-semibold text-primary">Contacto</h4>
          <ul className="space-y-3 text-sm text-ink-foreground/70">
            <li className="flex items-center gap-2.5">
              <Phone className="size-4 text-primary" /> +258 84 123 4567
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="size-4 text-primary" /> info@comidasaudavelmz.co.mz
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 text-primary" /> Maputo, Moçambique
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="container-page text-center text-xs text-ink-foreground/55">
          © {new Date().getFullYear()} Comida Saudável MZ — Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
