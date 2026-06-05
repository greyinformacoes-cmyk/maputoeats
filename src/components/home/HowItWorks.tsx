import { Search, ImageIcon, ShoppingBag, MessageCircle, ClipboardCheck, Clock, TrendingUp, Eye } from "lucide-react";
import howImg from "@/assets/howitworks.jpg";

const clientes = [
  { icon: Search, title: "Procure um restaurante", text: "Encontre o restaurante ideal para si." },
  { icon: ImageIcon, title: "Veja fotos e especialidades", text: "Explore o menu e as especialidades." },
  { icon: ShoppingBag, title: "Faça o seu pedido", text: "Entre em contacto facilmente." },
  { icon: MessageCircle, title: "Contacte pelo WhatsApp", text: "Fale diretamente com o restaurante." },
];

const restaurantes = [
  { icon: ClipboardCheck, title: "Cadastre o restaurante", text: "Preencha o formulário de adesão." },
  { icon: Clock, title: "Aguarde aprovação", text: "A nossa equipa irá avaliar o seu pedido." },
  { icon: ShoppingBag, title: "Receba pedidos", text: "Mais clientes a encontrar o seu restaurante." },
  { icon: TrendingUp, title: "Aumente a visibilidade", text: "Destaque-se e cresça o seu negócio." },
];

function Column({
  label,
  steps,
}: {
  label: string;
  steps: { icon: typeof Eye; title: string; text: string }[];
}) {
  return (
    <div className="space-y-5">
      <h3 className="font-display text-lg font-bold text-primary">{label}</h3>
      <ol className="space-y-5">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-4">
            <span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-secondary text-primary">
              <s.icon className="size-5" />
              <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {i + 1}
              </span>
            </span>
            <div>
              <p className="font-semibold text-foreground">{s.title}</p>
              <p className="text-sm text-muted-foreground">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="bg-secondary/40 py-16">
      <div className="container-page">
        <h2 className="mb-10 text-center font-display text-2xl font-bold text-foreground sm:text-3xl">
          Como Funciona
        </h2>
        <div className="grid items-center gap-10 lg:grid-cols-3">
          <Column label="Para Clientes" steps={clientes} />
          <div className="order-first overflow-hidden rounded-3xl shadow-[var(--shadow-elegant)] lg:order-none">
            <img
              src={howImg}
              alt="Clientes a desfrutar de uma refeição num restaurante"
              width={800}
              height={600}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
          <Column label="Para Restaurantes" steps={restaurantes} />
        </div>
      </div>
    </section>
  );
}
