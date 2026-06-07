-- Roles enum
create type public.app_role as enum ('admin', 'client');

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to service_role;
alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update to authenticated using (auth.uid() = id);

-- User roles
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create policy "Users can view own roles" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);

-- has_role function
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Admin can view all profiles / roles
create policy "Admins can view all profiles" on public.profiles
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can view all roles" on public.user_roles
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

-- New user handler: create profile + assign role
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, phone)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'phone', '')
  );

  if new.email = 'yurangrey66@gmail.com' then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  else
    insert into public.user_roles (user_id, role) values (new.id, 'client');
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Restaurants
create table public.restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  hours text,
  whatsapp text,
  owner_name text,
  owner_email text,
  owner_phone text,
  category text,
  image_url text,
  status text not null default 'pendente',
  created_at timestamptz not null default now()
);
grant select, insert on public.restaurants to anon;
grant select, insert, update, delete on public.restaurants to authenticated;
grant all on public.restaurants to service_role;
alter table public.restaurants enable row level security;

create policy "Anyone can view active restaurants" on public.restaurants
  for select to anon, authenticated using (status = 'ativo');
create policy "Admins can view all restaurants" on public.restaurants
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Anyone can submit a restaurant" on public.restaurants
  for insert to anon, authenticated with check (status = 'pendente');
create policy "Admins can update restaurants" on public.restaurants
  for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete restaurants" on public.restaurants
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

-- Orders
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references auth.users(id) on delete set null,
  restaurant_id uuid references public.restaurants(id) on delete set null,
  customer_name text,
  customer_phone text,
  items jsonb not null default '[]'::jsonb,
  total numeric not null default 0,
  status text not null default 'novo',
  created_at timestamptz not null default now()
);
grant select, insert, update, delete on public.orders to authenticated;
grant all on public.orders to service_role;
alter table public.orders enable row level security;

create policy "Customers can view own orders" on public.orders
  for select to authenticated using (auth.uid() = customer_id);
create policy "Customers can create own orders" on public.orders
  for insert to authenticated with check (auth.uid() = customer_id);
create policy "Admins can view all orders" on public.orders
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update orders" on public.orders
  for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete orders" on public.orders
  for delete to authenticated using (public.has_role(auth.uid(), 'admin'));