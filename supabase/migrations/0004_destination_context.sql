begin;
-- Additive destination identity for existing Rome data. Apply after 0001–0003.
-- No existing application data or ownership policies are removed.
create table public.travel_destinations (
  id text primary key check (id ~ '^[a-z][a-z0-9-]*/[a-z][a-z0-9-]*$'),
  name text not null,
  country_slug text not null,
  city_slug text not null,
  currency text not null check (currency ~ '^[A-Z]{3}$'),
  catalog_ready boolean not null default false,
  unique (id,city_slug)
);
insert into public.travel_destinations(id,name,country_slug,city_slug,currency,catalog_ready)
values ('italy/rome','Rome','italy','rome','EUR',true);
alter table public.travel_destinations enable row level security;
revoke all on public.travel_destinations from anon,authenticated;
grant select on public.travel_destinations to anon,authenticated;
create policy destination_directory_read on public.travel_destinations for select to anon,authenticated using(true);

alter table public.trips add column destination_id text not null default 'italy/rome' references public.travel_destinations(id);
alter table public.saved_places add column destination_id text not null default 'italy/rome' references public.travel_destinations(id);
alter table public.concierge_threads add column destination_id text not null default 'italy/rome' references public.travel_destinations(id);
alter table public.custom_plan_requests add column destination_id text not null default 'italy/rome' references public.travel_destinations(id);

update public.trips set plan=jsonb_set(plan,'{destinationId}','"italy/rome"'::jsonb) where not (plan ? 'destinationId');
alter table public.trips add constraint trips_plan_destination_matches check (plan->>'destinationId' is not null and plan->>'destinationId'=destination_id);
-- Replace the Rome-only checks with a link to the supported destination directory.
alter table public.trips drop constraint trips_city_check;
alter table public.custom_plan_requests drop constraint custom_plan_requests_city_check;
alter table public.trips add constraint trips_city_destination foreign key(destination_id,city) references public.travel_destinations(id,city_slug);
alter table public.custom_plan_requests add constraint custom_requests_city_destination foreign key(destination_id,city) references public.travel_destinations(id,city_slug);

-- A saved journey or conversation keeps its destination. A new destination starts a new one.
create function public.keep_destination_context() returns trigger language plpgsql security invoker set search_path='' as $$
begin
  if new.destination_id is distinct from old.destination_id then raise exception 'Start a new journey or conversation to change destination'; end if;
  return new;
end $$;
revoke all on function public.keep_destination_context() from public,anon,authenticated;
create trigger trip_destination_stays before update on public.trips for each row execute function public.keep_destination_context();
create trigger thread_destination_stays before update on public.concierge_threads for each row execute function public.keep_destination_context();

create or replace function public.save_trip(p_id uuid, p_plan jsonb) returns uuid language plpgsql security invoker set search_path='' as $$
declare result_id uuid; entry jsonb; ordinal integer:=0; selected_id text; selected_city text;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  selected_id:=coalesce(p_plan->>'destinationId','italy/rome');
  select city_slug into selected_city from public.travel_destinations where id=selected_id and catalog_ready;
  if selected_city is null then raise exception 'Destination planning is unavailable'; end if;
  if jsonb_typeof(p_plan->'items') is distinct from 'array' or jsonb_array_length(p_plan->'items')>100 then raise exception 'Invalid plan'; end if;
  p_plan:=jsonb_set(p_plan,'{destinationId}',to_jsonb(selected_id));
  if p_id is null then
    insert into public.trips(user_id,city,destination_id,title,plan)
      values(auth.uid(),selected_city,selected_id,p_plan->>'title',p_plan) returning id into result_id;
  else
    update public.trips set city=selected_city,destination_id=selected_id,title=p_plan->>'title',plan=p_plan,updated_at=now()
      where id=p_id and user_id=auth.uid() returning id into result_id;
    if result_id is null then raise exception 'Trip unavailable'; end if;
    delete from public.trip_items where trip_id=result_id;
  end if;
  for entry in select value from jsonb_array_elements(p_plan->'items') loop
    insert into public.trip_items(id,trip_id,place_id,day,position)
      values((entry->>'id')::uuid,result_id,entry->>'placeId',(entry->>'day')::integer,ordinal);
    ordinal:=ordinal+1;
  end loop;
  return result_id;
end $$;
revoke all on function public.save_trip(uuid,jsonb) from public,anon;
grant execute on function public.save_trip(uuid,jsonb) to authenticated;
commit;
