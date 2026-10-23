-- Read-only. Run in the intended project's SQL Editor before any import.
select current_database() as database_name, current_user as database_role,
       to_regnamespace('travel_content') is not null as content_schema_exists,
       to_regclass('public.travel_catalog') is not null as public_catalog_exists,
       to_regclass('supabase_migrations.schema_migrations') is not null as migration_history_exists;
select table_schema,table_name,column_name,data_type
from information_schema.columns
where table_schema in ('travel_content','supabase_migrations')
   or (table_schema='public' and table_name in ('profiles','trips','trip_items','saved_places','travel_catalog'))
order by table_schema,table_name,ordinal_position;
select schemaname,tablename,policyname,roles,cmd from pg_policies
where schemaname='travel_content' or (schemaname='public' and tablename='travel_catalog');
-- If content_schema_exists=true, do not rerun 02-import.sql: review the existing
-- content structure and publication history first. No users or private rows returned.
