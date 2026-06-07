import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Info, Send, ShieldCheck, TrendingUp, Headphones, Loader2 } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/cadastrar-restaurante")({
  head: () => ({
    meta: [
      { title: "Cadastrar Restaurante — Comida Saudável MZ" },
      {
        name: "description",
        content:
          "Cadastre o seu restaurante na maior plataforma de descoberta gastronómica de Maputo. Apenas 3.000 MZN por mês.",
      },
      { property: "og:title", content: "Cadastrar Restaurante — Comida Saudável MZ" },
      {
        property: "og:description",
        content: "Junte-se à maior plataforma de restaurantes de Maputo.",
      },
    ],
  }),
  component: CadastrarPage,
});

const schema = z.object({
  nome: z.string().trim().min(2, "Indique o nome do restaurante").max(120),
  endereco: z.string().trim().min(5, "Indique o endereço").max(200),
  horario: z.string().trim().min(3, "Indique o horário de funcionamento").max(120),
  whatsapp: z.string().trim().min(7, "Indique o WhatsApp do restaurante").max(30),
  responsavel: z.string().trim().min(2, "Indique o nome do responsável").max(120),
  telefone: z.string().trim().min(7, "Indique o número de telefone").max(30),
  email: z.union([z.string().trim().email("E-mail inválido").max(255), z.literal("")]),
});

type FormValues = z.infer<typeof schema>;
type FormErrors = Partial<Record<keyof FormValues, string>>;

const benefits = [
  { icon: ShieldCheck, title: "Mais visibilidade", text: "O seu restaurante em destaque para milhares de clientes." },
  { icon: TrendingUp, title: "Mais pedidos", text: "Receba pedidos diretamente através da plataforma." },
  { icon: Headphones, title: "Suporte dedicado", text: "A nossa equipa entra em contacto para finalizar tudo." },
];

const empty: FormValues = {
  nome: "", endereco: "", horario: "", whatsapp: "", responsavel: "", telefone: "", email: "",
};

function CadastrarPage() {
  const [values, setValues] = useState<FormValues>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormValues>(key: K, v: string) {
    setValues((s) => ({ ...s, [key]: v }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof FormValues;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <SiteShell>
      <section className="container-page grid gap-10 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:py-16">
        {/* Left intro */}
        <div className="lg:pr-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Cadastro de Restaurante
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
            Junte-se à maior plataforma de restaurantes de Maputo
          </h1>
          <p className="mt-4 text-muted-foreground">
            Preencha o formulário ao lado para cadastrar o seu restaurante.
          </p>

          <ul className="mt-8 space-y-5">
            {benefits.map((b) => (
              <li key={b.title} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                  <b.icon className="size-5" />
                </span>
                <div>
                  <p className="font-semibold text-foreground">{b.title}</p>
                  <p className="text-sm text-muted-foreground">{b.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-primary/20 bg-secondary/50 p-5">
            <p className="text-sm text-foreground">
              Mensalidade única para todos os restaurantes:
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-primary">3.000 MZN / mês</p>
          </div>
        </div>

        {/* Right form / success */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <span className="grid size-16 place-items-center rounded-full bg-secondary text-primary">
                <CheckCircle2 className="size-9" />
              </span>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Pedido enviado com sucesso!
              </h2>
              <p className="max-w-md text-muted-foreground">
                Recebemos o seu pedido. O estado é <strong>Pendente</strong>. A nossa equipa entrará
                em contacto para validar as informações e concluir o processo de adesão.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setValues(empty);
                  setSubmitted(false);
                }}
              >
                Enviar outro pedido
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-7">
              <div>
                <h2 className="font-display text-xl font-bold text-foreground">
                  Informações do Restaurante
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Nome do Restaurante" required error={errors.nome}>
                    <Input
                      placeholder="Ex: Restaurante Sabor da Terra"
                      value={values.nome}
                      onChange={(e) => update("nome", e.target.value)}
                    />
                  </Field>
                  <Field label="Endereço" required error={errors.endereco}>
                    <Input
                      placeholder="Ex: Av. Julius Nyerere, nº 123, Maputo"
                      value={values.endereco}
                      onChange={(e) => update("endereco", e.target.value)}
                    />
                  </Field>
                  <Field label="Horário de Funcionamento" required error={errors.horario}>
                    <Input
                      placeholder="Ex: Segunda a Domingo: 09:00 - 22:00"
                      value={values.horario}
                      onChange={(e) => update("horario", e.target.value)}
                    />
                  </Field>
                  <Field label="WhatsApp do Restaurante" required error={errors.whatsapp}>
                    <Input
                      placeholder="Ex: +258 84 123 4567"
                      value={values.whatsapp}
                      onChange={(e) => update("whatsapp", e.target.value)}
                    />
                  </Field>
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-foreground">Responsável</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Field label="Nome Completo" required error={errors.responsavel}>
                    <Input
                      placeholder="Ex: João da Silva"
                      value={values.responsavel}
                      onChange={(e) => update("responsavel", e.target.value)}
                    />
                  </Field>
                  <Field label="Número de Telefone" required error={errors.telefone}>
                    <Input
                      placeholder="Ex: +258 84 123 4567"
                      value={values.telefone}
                      onChange={(e) => update("telefone", e.target.value)}
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="E-mail (Opcional)" error={errors.email}>
                      <Input
                        type="email"
                        placeholder="Ex: email@exemplo.com"
                        value={values.email}
                        onChange={(e) => update("email", e.target.value)}
                      />
                    </Field>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-secondary/50 p-4">
                <Info className="mt-0.5 size-5 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Após o envio do formulário, a nossa equipa entrará em contacto para validar as
                  informações e concluir o processo de adesão.
                </p>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                <Send className="size-4" /> Enviar Pedido
              </Button>
            </form>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
