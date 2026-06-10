import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  LayoutDashboard,
  Store,
  ShoppingBag,
  CreditCard,
  Tag,
  Megaphone,
  Star,
  BarChart2,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  CheckCircle2,
  Clock,
  Ban,
  Trash2,
  Loader2,
  ArrowRight,
  Construction,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Painel de Administrador — Comida Saudável MZ" }],
  }),
  component: AdminPage,
});

/* ------------------------------------------------------------------ */
/* Nav items                                                            */
/* ------------------------------------------------------------------ */
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "restaurants", label: "Restaurantes", icon: Store },
  { id: "orders", label: "Pedidos", icon: ShoppingBag },
  { id: "payments", label: "Pagamentos", icon: CreditCard },
  { id: "categories", label: "Categorias", icon: Tag },
  { id: "promotions", label: "Promoções", icon: Megaphone },
  { id: "reviews", label: "Avaliações", icon: Star },
  { id: "reports", label: "Relatórios", icon: BarChart2 },
  { id: "settings", label: "Definições", icon: Settings },
];

/* ------------------------------------------------------------------ */
/* Main page                                                            */
/* ------------------------------------------------------------------ */
function AdminPage() {
  const { user, role, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    if (loading) return;
    if (!user) navigate({ to: "/entrar", replace: true });
    else if (role && role !== "admin") navigate({ to: "/", replace: true });
  }, [loading, user, role, navigate]);

  if (loading || !user || role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  const activeLabel =
    navItems.find((n) => n.id === activeSection)?.label ?? "Dashboard";

  return (
    <div className="flex min-h-screen bg-secondary/30">
      {/* ── Sidebar ── */}
      <aside className="hidden w-60 flex-col bg-ink text-ink-foreground md:flex">
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Store className="size-5" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-base font-bold lowercase text-ink-foreground">
              maputo
            </p>
            <p className="-mt-1 text-sm font-semibold lowercase text-primary">
              eats
            </p>
          </div>
        </div>

        {/* Admin profile */}
        <div className="mx-3 mb-2 flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3">
          <span className="grid size-9 place-items-center rounded-full bg-primary font-semibold text-primary-foreground">
            A
          </span>
          <div className="leading-tight">
            <p className="text-sm font-medium text-ink-foreground">Administrador</p>
            <p className="text-xs text-ink-foreground/60">Administrador</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={
                  "mb-0.5 flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-all " +
                  (active
                    ? "bg-primary font-semibold text-primary-foreground"
                    : "text-ink-foreground/70 hover:bg-white/10")
                }
              >
                <Icon className="size-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={async () => {
            await signOut();
            navigate({ to: "/entrar", replace: true });
          }}
          className="mx-3 mb-5 flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-ink-foreground/70 transition-all hover:bg-white/10"
        >
          <LogOut className="size-4" />
          Sair
        </button>
      </aside>

      {/* ── Main content ── */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-5">
          <h1 className="font-display text-lg font-bold text-foreground">
            {activeLabel}
          </h1>
          <div className="flex items-center gap-4">
            <button className="relative grid size-9 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-secondary/70">
              <Bell className="size-4" />
              <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                3
              </span>
            </button>
            <div className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-full bg-primary font-semibold text-primary-foreground">
                A
              </span>
              <span className="hidden text-sm font-medium text-foreground sm:inline">
                Administrador
              </span>
              <ChevronDown className="size-4 text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5">
          {activeSection === "dashboard" && (
            <DashboardView setSection={setActiveSection} />
          )}
          {activeSection === "restaurants" && <RestaurantsView />}
          {activeSection === "orders" && <OrdersView />}
          {!["dashboard", "restaurants", "orders"].includes(activeSection) && (
            <ComingSoon section={activeLabel} />
          )}
        </main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard View                                                        */
/* ------------------------------------------------------------------ */
function DashboardView({ setSection }: { setSection: (s: string) => void }) {
  const restaurants = useQuery({
    queryKey: ["admin", "restaurants"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const orders = useQuery({
    queryKey: ["admin", "orders", "full"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, restaurants(name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const totalRestaurants = restaurants.data?.length ?? 0;
  const activeRestaurants =
    restaurants.data?.filter((r) => r.status === "ativo").length ?? 0;
  const pendingRestaurants =
    restaurants.data?.filter((r) => r.status === "pendente").length ?? 0;
  const suspendedRestaurants =
    restaurants.data?.filter((r) => r.status === "suspenso").length ?? 0;
  const totalOrders = orders.data?.length ?? 0;
  const revenue =
    orders.data?.reduce((sum, o) => sum + Number(o.total ?? 0), 0) ?? 0;

  const statCards = [
    { label: "Total de Restaurantes", value: totalRestaurants, icon: Store, target: "restaurants" },
    { label: "Restaurantes Ativos", value: activeRestaurants, icon: CheckCircle2, target: "restaurants" },
    { label: "Restaurantes Pendentes", value: pendingRestaurants, icon: Clock, target: "restaurants" },
    { label: "Restaurantes Suspensos", value: suspendedRestaurants, icon: Ban, target: "restaurants" },
    { label: "Pedidos Realizados", value: totalOrders.toLocaleString("pt-MZ"), icon: ShoppingBag, target: "orders" },
    { label: "Receita Total", value: `${revenue.toLocaleString("pt-MZ")} MZN`, icon: CreditCard, target: "orders" },
  ];

  const chartData = [
    { day: "01 Mai", pedidos: 400 },
    { day: "05 Mai", pedidos: 600 },
    { day: "10 Mai", pedidos: 800 },
    { day: "15 Mai", pedidos: 700 },
    { day: "20 Mai", pedidos: 1200 },
    { day: "25 Mai", pedidos: 1400 },
    { day: "30 Mai", pedidos: 1500 },
  ];

  const recentRestaurants = restaurants.data?.slice(0, 5) ?? [];
  const recentOrders = orders.data?.slice(0, 6) ?? [];

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
            >
              <span className="grid size-10 place-items-center rounded-full bg-secondary text-primary">
                <Icon className="size-5" />
              </span>
              <p className="mt-4 font-display text-3xl font-bold text-foreground">
                {card.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
              <button
                onClick={() => setSection(card.target)}
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Ver todos <ArrowRight className="size-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Middle row: recent restaurants + recent orders */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Restaurantes Recentes */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-foreground">
              Restaurantes Recentes
            </h2>
            <button
              onClick={() => setSection("restaurants")}
              className="text-xs font-medium text-primary hover:underline"
            >
              Ver todos
            </button>
          </div>
          {restaurants.isLoading ? (
            <InlineLoading />
          ) : recentRestaurants.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Nenhum restaurante encontrado.
            </p>
          ) : (
            <ul className="space-y-3">
              {recentRestaurants.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary font-semibold text-primary">
                      {r.name?.charAt(0)?.toUpperCase() ?? "R"}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {r.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {r.address || "Maputo"}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    {restStatusBadge(r.status)}
                    <span className="text-xs text-muted-foreground">
                      {r.created_at
                        ? new Date(r.created_at).toLocaleDateString("pt-MZ")
                        : "—"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pedidos Recentes */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-foreground">
              Pedidos Recentes
            </h2>
            <button
              onClick={() => setSection("orders")}
              className="text-xs font-medium text-primary hover:underline"
            >
              Ver todos
            </button>
          </div>
          {orders.isLoading ? (
            <InlineLoading />
          ) : recentOrders.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              Nenhum pedido encontrado.
            </p>
          ) : (
            <ul className="space-y-3">
              {recentOrders.map((o) => (
                <li
                  key={o.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    #{String(o.id).slice(0, 4).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-medium text-foreground">
                    {(o.restaurants as { name?: string } | null)?.name ??
                      o.customer_name ??
                      "—"}
                  </span>
                  {orderStatusBadgeSmall(o.status)}
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {o.created_at
                      ? new Date(o.created_at).toLocaleTimeString("pt-MZ", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Stats chart */}
      <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-foreground">
            Estatísticas Gerais
          </h2>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
            Este Mês
          </span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="pedidosFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Area type="monotone" dataKey="pedidos" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#pedidosFill)" />
              <Line type="monotone" dataKey="pedidos" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom summary stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Visualizações", value: "12,450", change: "+18.5%" },
            { label: "Cliques WhatsApp", value: "3,245", change: "+25.1%" },
            { label: "Novos Cadastros", value: "28", change: "+12.3%" },
            { label: "Pedidos", value: totalOrders.toLocaleString("pt-MZ"), change: "+15.7%" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-secondary/40 p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-display text-xl font-bold text-foreground">{s.value}</p>
              <p className="mt-0.5 text-xs font-medium text-primary">↗ {s.change}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Restaurants View                                                      */
/* ------------------------------------------------------------------ */
function RestaurantsView() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "restaurants"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("restaurants").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "restaurants"] }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("restaurants").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "restaurants"] }),
  });

  if (isLoading) return <TableLoading />;
  if (!data || data.length === 0)
    return <EmptyState text="Ainda não há restaurantes cadastrados." />;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead>Contacto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium text-foreground">
                {r.name}
                <div className="text-xs text-muted-foreground">{r.address}</div>
              </TableCell>
              <TableCell>{r.owner_name || "—"}</TableCell>
              <TableCell className="text-sm">{r.whatsapp || r.owner_phone || "—"}</TableCell>
              <TableCell>{restStatusBadge(r.status)}</TableCell>
              <TableCell>
                <div className="flex flex-wrap justify-end gap-1.5">
                  <Button size="sm" variant="outline" onClick={() => updateStatus.mutate({ id: r.id, status: "ativo" })}>
                    <CheckCircle2 className="size-3.5" /> Ativar
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => updateStatus.mutate({ id: r.id, status: "suspenso" })}>
                    <Ban className="size-3.5" /> Suspender
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive hover:text-destructive"
                    onClick={() => remove.mutate(r.id)}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Orders View                                                           */
/* ------------------------------------------------------------------ */
function OrdersView() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "orders", "full"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, restaurants(name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "orders", "full"] }),
  });

  const statuses = useMemo(
    () => ["novo", "em_preparo", "pronto", "entregue", "cancelado"],
    [],
  );

  if (isLoading) return <TableLoading />;
  if (!data || data.length === 0)
    return <EmptyState text="Ainda não há pedidos realizados." />;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
            <TableHead>Restaurante</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Alterar estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((o) => (
            <TableRow key={o.id}>
              <TableCell className="font-medium text-foreground">
                {o.customer_name || "—"}
                <div className="text-xs text-muted-foreground">{o.customer_phone}</div>
              </TableCell>
              <TableCell>
                {(o.restaurants as { name?: string } | null)?.name ?? "—"}
              </TableCell>
              <TableCell>{Number(o.total).toLocaleString("pt-MZ")} MZN</TableCell>
              <TableCell>{orderStatusBadgeSmall(o.status)}</TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <select
                    className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                    value={o.status}
                    onChange={(e) => updateStatus.mutate({ id: o.id, status: e.target.value })}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Coming soon placeholder                                              */
/* ------------------------------------------------------------------ */
function ComingSoon({ section }: { section: string }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
      <Construction className="size-10 text-muted-foreground" />
      <p className="mt-4 font-display text-lg font-bold text-foreground">{section}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Esta secção está em desenvolvimento.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Helpers                                                               */
/* ------------------------------------------------------------------ */
function restStatusBadge(status: string) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
  if (status === "ativo")
    return <span className={base + " bg-primary/15 text-primary"}>Ativo</span>;
  if (status === "suspenso")
    return <span className={base + " bg-destructive/15 text-destructive"}>Suspenso</span>;
  return <span className={base + " bg-secondary text-muted-foreground"}>Pendente</span>;
}

function orderStatusBadgeSmall(status: string) {
  const map: Record<string, { cls: string; label: string }> = {
    novo: { cls: "bg-blue-100 text-blue-700", label: "Novo" },
    em_preparo: { cls: "bg-amber-100 text-amber-700", label: "Em Preparo" },
    pronto: { cls: "bg-green-100 text-green-700", label: "Pronto" },
    entregue: { cls: "bg-emerald-100 text-emerald-700", label: "Entregue" },
    cancelado: { cls: "bg-red-100 text-red-700", label: "Cancelado" },
  };
  const cfg = map[status] ?? { cls: "bg-secondary text-muted-foreground", label: status };
  return (
    <span className={"inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold " + cfg.cls}>
      {cfg.label}
    </span>
  );
}

function InlineLoading() {
  return (
    <div className="flex items-center justify-center py-10">
      <Loader2 className="size-5 animate-spin text-primary" />
    </div>
  );
}

function TableLoading() {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-border bg-card py-16">
      <Loader2 className="size-5 animate-spin text-primary" />
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card py-16 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}
