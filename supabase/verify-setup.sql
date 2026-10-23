-- Read-only structural checks. Expect eight rows with setup_ok = true.
-- These checks do not replace the separate two-user ownership test.
with expected(table_name, can_write, can_update) as (values
  ('profiles',true,true), ('trips',true,true), ('trip_items',true,true),
  ('saved_places',true,true), ('concierge_threads',true,true),
  ('concierge_messages',true,true), ('concierge_usage',false,false),
  ('custom_plan_requests',true,false)
), checks as (
  select e.table_name,
    coalesce(c.relrowsecurity,false) as rls_enabled,
    (select count(*) from pg_policies p where p.schemaname='public' and p.tablename=e.table_name) as policy_count,
    coalesce(has_table_privilege('authenticated',c.oid,'SELECT'),false) as member_read,
    coalesce(has_table_privilege('authenticated',c.oid,'INSERT'),false)=e.can_write as insert_correct,
    coalesce(has_table_privilege('authenticated',c.oid,'UPDATE'),false)=e.can_update as update_correct,
    coalesce(has_table_privilege('authenticated',c.oid,'DELETE'),false)=e.can_update as delete_correct,
    not coalesce(has_table_privilege('anon',c.oid,'SELECT,INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER'),true) as guest_blocked,
    not coalesce(has_table_privilege('authenticated',c.oid,'TRUNCATE,REFERENCES,TRIGGER'),true) as privileged_operations_blocked
  from expected e
  left join pg_namespace n on n.nspname='public'
  left join pg_class c on c.relnamespace=n.oid and c.relname=e.table_name and c.relkind='r'
)
select *, rls_enabled and policy_count>0 and member_read and insert_correct
  and update_correct and delete_correct and guest_blocked and privileged_operations_blocked as setup_ok
from checks order by table_name;

-- Expect two rows: member_execute=true, guest_execute=false, safe_search_path=true.
select p.proname as function_name,
  p.prosecdef as runs_as_owner,
  has_function_privilege('authenticated',p.oid,'EXECUTE') as member_execute,
  has_function_privilege('anon',p.oid,'EXECUTE') as guest_execute,
  coalesce('search_path=""'=any(p.proconfig),false) as safe_search_path
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public' and p.proname in ('save_trip','consume_concierge_quota')
order by p.proname;
