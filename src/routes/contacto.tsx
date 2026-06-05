import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Comida Saudável MZ" },
      { name: "description", content: "Entre em contacto com a equipa da Comida Saudável MZ em Maputo, Moçambique." },
      { property: "og:title", content: "Contacto — Comida Saudável MZ" },
      { property: "og:description", content: "Fale com a nossa equipa." },
    ],
  }),
  component: ContactoPage,
});

function ContactoPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteShell>
      <section className="bg-ink py-14 text-ink-foreground">
        <div className="container-page">
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">
            Fale <span className="text-primary">Connosco</span>
          </h1>
          <p className="mt-3 max-w-xl text-ink-foreground/80">
            Tem dúvidas? A nossa equipa está disponível para ajudar.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-8 py-12 lg:grid-cols-2">
        <div className="space-y-4">
          {[
            { icon: Phone, label: "Telefone", value: "+258 84 123 4567" },
            { icon: Mail, label: "E-mail", value: "info@comidasaudavelmz.co.mz" },
            { icon: MapPin, label: "Localização", value: "Maputo, Moçambique" },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <span className="grid size-11 place-items-center rounded-full bg-secondary text-primary">
                <c.icon className="size-5" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">{c.label}</p>
                <p className="font-semibold text-foreground">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
          {sent ? (
            <div className="py-10 text-center">
              <h2 className="font-display text-xl font-bold text-foreground">Mensagem enviada!</h2>
              <p className="mt-2 text-muted-foreground">Obrigado pelo seu contacto. Responderemos em breve.</p>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="space-y-1.5">
                <Label>Nome</Label>
                <Input required maxLength={120} placeholder="O seu nome" />
              </div>
              <div className="space-y-1.5">
                <Label>E-mail</Label>
                <Input type="email" required maxLength={255} placeholder="email@exemplo.com" />
              </div>
              <div className="space-y-1.5">
                <Label>Mensagem</Label>
                <Textarea required maxLength={1000} rows={5} placeholder="Como podemos ajudar?" />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">
                <Send className="size-4" /> Enviar Mensagem
              </Button>
            </form>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
