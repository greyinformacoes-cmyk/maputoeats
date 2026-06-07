import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Store,
  Users,
  ShoppingBag,
  TrendingUp,
  Loader2,
  LogOut,
  CheckCircle2,
  Clock,
  Ban,
  Trash2,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/site/Logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Painel de Administrador — Comida Saudável MZ" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { user, role, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/entrar", replace: true });
    } else if (role && role !== "admin") {
      navigate({ to: "/", replace: true });
    }
  }, [loading, user, role, navigate]);

  if (loading || !user || role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b border-border bg-ink text-ink-foreground">
        <div className="container-page flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo variant="dark" />
            <span className="hidden text-sm font-medium text-ink-foreground/70 sm:inline">
              Painel de Administrador
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outlineLight" size="sm">
              <Link to="/">Ver site</Link>
            </Button>
            <Button
              variant="outlineLight"
              size="sm"
              onClick={async () => {
                await signOut();
                navigate({ to: "/entrar", replace: true });
              }}
            >
              <LogOut className="size-4" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container-page py-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Gestão de restaurantes, clientes, pedidos e estatísticas.
        </p>

        <Tabs defaultValue="stats" className="mt-6">
          <TabsList className="flex w-full flex-wrap justify-start gap-1">
            <TabsTrigger value="stats">
              <TrendingUp className="size-4" /> Estatísticas
            </TabsTrigger>
            <TabsTrigger value="restaurants">
              <Store className="size-4" /> Restaurantes
            </TabsTrigger>
            <TabsTrigger value="clients">
              <Users className="size-4" /> Clientes
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingBag className="size-4" /> Pedidos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="mt-6">
            <StatsTab />
          </TabsContent>
          <TabsContent value="restaurants" className="mt-6">
            <RestaurantsTab />
          </TabsContent>
          <TabsContent value="clients" className="mt-6">
            <ClientsTab />
          </TabsContent>
          <TabsContent value="orders" className="mt-6">
            <OrdersTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

/* ----------------------------- Statistics ----------------------------- */

function StatsTab() {
  const restaurants = useQuery({
    queryKey: ["admin", "restaurants"],
    queryFn: async () => {
      const { data, error } = await supabase.from("restaurants").select("*");
      if (error) throw error;
      return data;
    },
  });
  const clients = useQuery({
    queryKey: ["admin", "profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("id");
      if (error) throw error;
      return data;
    },
  });
  const orders = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("total,status");
      if (error) throw error;
      return data;
    },
  });

  const totalRestaurants = restaurants.data?.length ?? 0;
  const activeRestaurants =
    restaurants.data?.filter((r) => r.status === "ativo").length ?? 0;
  const pendingRestaurants =
    restaurants.data?.filter((r) => r.status === "pendente").length ?? 0;
  const totalClients = clients.data?.length ?? 0;
  const totalOrders = orders.data?.length ?? 0;
  const revenue =
    orders.data?.reduce((sum, o) => sum + Number(o.total ?? 0), 0) ?? 0;

  const cards = [
    { label: "Total de Restaurantes", value: totalRestaurants, icon: Store },
    { label: "Restaurantes Ativos", value: activeRestaurants, icon: CheckCircle2 },
    { label: "Restaurantes Pendentes", value: pendingRestaurants, icon: Clock },
    { label: "Total de Clientes", value: totalClients, icon: Users },
    { label: "Pedidos Realizados", value: totalOrders, icon: ShoppingBag },
    {
      label: "Receita (MZN)",
      value: revenue.toLocaleString("pt-MZ"),
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
        >
          <div className="flex items-center justify-between">
            <span className="grid size-10 place-items-center rounded-full bg-secondary text-primary">
              <c.icon className="size-5" />
            </span>
          </div>
          <p className="mt-4 font-display text-3xl font-bold text-foreground">
            {c.value}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{c.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------- Restaurants ----------------------------- */

function statusBadge(status: string) {
  if (status === "ativo")
    return <Badge className="bg-primary text-primary-foreground">Ativo</Badge>;
  if (status === "suspenso")
    return <Badge variant="destructive">Suspenso</Badge>;
  return <Badge variant="secondary">Pendente</Badge>;
}

function RestaurantsTab() {
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
      const { error } = await supabase
        .from("restaurants")
        .update({ status })
        .eq("id", id);
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
              <TableCell>{statusBadge(r.status)}</TableCell>
              <TableCell>
                <div className="flex flex-wrap justify-end gap-1.5">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus.mutate({ id: r.id, status: "ativo" })}
                  >
                    <CheckCircle2 className="size-3.5" /> Ativar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateStatus.mutate({ id: r.id, status: "suspenso" })}
                  >
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

/* ----------------------------- Clients ----------------------------- */

function ClientsTab() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <TableLoading />;
  if (!data || data.length === 0)
    return <EmptyState text="Ainda não há clientes registados." />;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Registo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium text-foreground">
                {p.full_name || "—"}
              </TableCell>
              <TableCell>{p.email || "—"}</TableCell>
              <TableCell>{p.phone || "—"}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {new Date(p.created_at).toLocaleDateString("pt-MZ")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/* ----------------------------- Orders ----------------------------- */

function orderStatusBadge(status: string) {
  const map: Record<string, { label: string; cls?: string; variant?: "secondary" | "destructive" }> = {
    novo: { label: "Novo", cls: "bg-primary text-primary-foreground" },
    em_preparo: { label: "Em Preparo", variant: "secondary" },
    pronto: { label: "Pronto", variant: "secondary" },
    entregue: { label: "Entregue", variant: "secondary" },
    cancelado: { label: "Cancelado", variant: "destructive" },
  };
  const cfg = map[status] ?? { label: status, variant: "secondary" as const };
  if (cfg.cls) return <Badge className={cfg.cls}>{cfg.label}</Badge>;
  return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
}

function OrdersTab() {
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
                {(o.restaurants as unknown as { name?: string } | null)?.name ?? "—"}
              </TableCell>
              <TableCell>{Number(o.total).toLocaleString("pt-MZ")} MZN</TableCell>
              <TableCell>{orderStatusBadge(o.status)}</TableCell>
              <TableCell>
                <div className="flex justify-end">
                  <select
                    className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                    value={o.status}
                    onChange={(e) =>
                      updateStatus.mutate({ id: o.id, status: e.target.value })
                    }
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

/* ----------------------------- Shared ----------------------------- */

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
