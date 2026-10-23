begin;
-- Supabase projects can retain default table-management grants even when
-- SELECT/INSERT/UPDATE/DELETE were explicitly configured. RLS does not guard TRUNCATE.
-- Revoke permissions only; no rows or tables are deleted.
revoke truncate, references, trigger on table
  public.profiles,
  public.trips,
  public.trip_items,
  public.saved_places,
  public.concierge_threads,
  public.concierge_messages,
  public.concierge_usage,
  public.custom_plan_requests
from authenticated, anon, public;

-- Fail atomically if another inherited grant still allows these operations.
do $$
begin
  if exists (
    select 1 from pg_class c join pg_namespace n on n.oid=c.relnamespace
    where n.nspname='public' and c.relname in
      ('profiles','trips','trip_items','saved_places','concierge_threads',
       'concierge_messages','concierge_usage','custom_plan_requests')
      and (has_table_privilege('authenticated',c.oid,'TRUNCATE,REFERENCES,TRIGGER')
        or has_table_privilege('anon',c.oid,'TRUNCATE,REFERENCES,TRIGGER'))
  ) then
    raise exception 'Inherited table-management permissions remain; inspect role grants.';
  end if;
end $$;
commit;
