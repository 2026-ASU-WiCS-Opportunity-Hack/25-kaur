-- If you already applied an older migration, run this in SQL Editor to fix seed + refresh PostgREST schema cache.

create or replace function public.seed_reset_aidbridge()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
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

notify pgrst, 'reload schema';
