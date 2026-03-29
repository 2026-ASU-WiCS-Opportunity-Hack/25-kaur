-- AidBridge core tables + HIPAA-adjacent audit_log (field names only — never store PII values in audit rows)
-- Apply in Supabase: SQL Editor > run this file, or: supabase db push

create extension if not exists "pgcrypto";

-- Staff / app users (not Supabase Auth users — link later if needed)
create table if not exists public.app_staff (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text not null,
  role text not null default 'staff' check (role in ('staff', 'admin', 'supervisor')),
  created_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  client_code text not null unique,
  first_name text not null,
  last_name text not null,
  dob date,
  phone text,
  email text,
  status text not null default 'Active' check (status in ('Active', 'Inactive')),
  last_visit date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_entries (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  staff_id uuid references public.app_staff (id) on delete set null,
  service_type text not null,
  notes text,
  logged_on date not null default (current_date),
  created_at timestamptz not null default now()
);

create index if not exists idx_service_entries_client on public.service_entries (client_id);
create index if not exists idx_service_entries_logged on public.service_entries (logged_on desc);

-- Audit: record *which fields* were touched, never the values (HIPAA-adjacent pattern)
create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  actor_staff_id uuid references public.app_staff (id) on delete set null,
  action text not null,
  resource_table text not null,
  resource_id uuid,
  field_names text[] not null default '{}' check (array_length(field_names, 1) is null or cardinality(field_names) >= 0),
  context jsonb not null default '{}'::jsonb
);

create index if not exists idx_audit_log_created on public.audit_log (created_at desc);
create index if not exists idx_audit_log_resource on public.audit_log (resource_table, resource_id);

comment on table public.audit_log is 'Compliance-oriented access trail: store action, resource, and affected column names only — never PII/PHI values.';

-- Dev / seed: clear demo data (service role only in production)
create or replace function public.seed_reset_aidbridge()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Avoid bare DELETE (some hosts require a predicate); TRUNCATE clears FK-linked tables in one pass.
  truncate table
    public.service_entries,
    public.audit_log,
    public.clients,
    public.app_staff
  restart identity cascade;
end;
$$;

revoke all on function public.seed_reset_aidbridge() from public;
grant execute on function public.seed_reset_aidbridge() to service_role;

-- Optional: RLS templates (enable when wiring auth — service_role bypasses RLS for admin tasks)
alter table public.app_staff enable row level security;
alter table public.clients enable row level security;
alter table public.service_entries enable row level security;
alter table public.audit_log enable row level security;

-- Allow full access to authenticated users for now (tighten per role in production)
create policy "authenticated_all_app_staff"
  on public.app_staff for all
  to authenticated
  using (true) with check (true);

create policy "authenticated_all_clients"
  on public.clients for all
  to authenticated
  using (true) with check (true);

create policy "authenticated_all_service_entries"
  on public.service_entries for all
  to authenticated
  using (true) with check (true);

create policy "authenticated_select_audit_log"
  on public.audit_log for select
  to authenticated
  using (true);

create policy "authenticated_insert_audit_log"
  on public.audit_log for insert
  to authenticated
  with check (true);

create policy "service_role_all_app_staff"
  on public.app_staff for all
  to service_role
  using (true) with check (true);

create policy "service_role_all_clients"
  on public.clients for all
  to service_role
  using (true) with check (true);

create policy "service_role_all_service_entries"
  on public.service_entries for all
  to service_role
  using (true) with check (true);

create policy "service_role_all_audit_log"
  on public.audit_log for all
  to service_role
  using (true) with check (true);

-- Browser uses the anon key before Supabase Auth is wired; allow read-only access to clients for local demo.
-- Tighten or remove this policy when real auth + per-user RLS are in place.
create policy "anon_select_clients"
  on public.clients
  for select
  to anon
  using (true);

-- Refresh PostgREST so REST immediately sees new tables (helps avoid PGRST205 / schema cache errors).
notify pgrst, 'reload schema';
