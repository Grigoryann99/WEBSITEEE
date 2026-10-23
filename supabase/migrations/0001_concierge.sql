begin;
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  currency text not null default 'EUR' check (currency in ('USD','EUR','AMD','RUB','GBP','CHF','AED','JPY','CNY','TRY')),
  created_at timestamptz not null default now()
);
create table public.trips (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  city text not null default 'rome' check (city='rome'), title text not null check (char_length(title) between 1 and 120),
  plan jsonb not null, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index trips_owner on public.trips(user_id);
create table public.trip_items (
  id uuid primary key, trip_id uuid not null references public.trips(id) on delete cascade,
  place_id text not null, day integer not null check (day between 1 and 21), position integer not null check (position between 0 and 99)
);
create index trip_items_parent on public.trip_items(trip_id);
create table public.saved_places (
  user_id uuid not null references auth.users(id) on delete cascade, place_id text not null,
  created_at timestamptz not null default now(), primary key(user_id,place_id)
);
create table public.concierge_threads (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Rome concierge', created_at timestamptz not null default now()
);
create index concierge_thread_owner on public.concierge_threads(user_id);
create table public.concierge_messages (
  id uuid primary key default gen_random_uuid(), thread_id uuid not null references public.concierge_threads(id) on delete cascade,
  role text not null check(role in ('user','assistant')), content text not null check(char_length(content)<=16000),
  created_at timestamptz not null default now()
);
create index concierge_message_parent on public.concierge_messages(thread_id);
create table public.concierge_usage (
  user_id uuid not null references auth.users(id) on delete cascade, bucket timestamptz not null,
  used integer not null default 1, primary key(user_id,bucket)
);
alter table public.profiles enable row level security;
alter table public.trips enable row level security;
alter table public.trip_items enable row level security;
alter table public.saved_places enable row level security;
alter table public.concierge_threads enable row level security;
alter table public.concierge_messages enable row level security;
alter table public.concierge_usage enable row level security;
create policy profiles_owner on public.profiles for all to authenticated using(id=(select auth.uid())) with check(id=(select auth.uid()));
create policy trips_owner on public.trips for all to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy saved_owner on public.saved_places for all to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy threads_owner on public.concierge_threads for all to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy items_owner on public.trip_items for all to authenticated
  using(exists(select 1 from public.trips t where t.id=trip_id and t.user_id=(select auth.uid())))
  with check(exists(select 1 from public.trips t where t.id=trip_id and t.user_id=(select auth.uid())));
create policy messages_owner on public.concierge_messages for all to authenticated
  using(exists(select 1 from public.concierge_threads t where t.id=thread_id and t.user_id=(select auth.uid())))
  with check(exists(select 1 from public.concierge_threads t where t.id=thread_id and t.user_id=(select auth.uid())));
create policy usage_read on public.concierge_usage for select to authenticated using(user_id=(select auth.uid()));
revoke all on public.profiles,public.trips,public.trip_items,public.saved_places,public.concierge_threads,public.concierge_messages,public.concierge_usage from anon;
grant select,insert,update,delete on public.profiles,public.trips,public.trip_items,public.saved_places,public.concierge_threads,public.concierge_messages to authenticated;
grant select on public.concierge_usage to authenticated;

create or replace function public.save_trip(p_id uuid, p_plan jsonb) returns uuid language plpgsql security invoker set search_path='' as $$
declare result_id uuid; entry jsonb; ordinal integer:=0;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if jsonb_typeof(p_plan->'items') is distinct from 'array' or jsonb_array_length(p_plan->'items')>100 then raise exception 'Invalid plan'; end if;
  if p_id is null then
    insert into public.trips(user_id,title,plan) values(auth.uid(),p_plan->>'title',p_plan) returning id into result_id;
  else
    update public.trips set title=p_plan->>'title',plan=p_plan,updated_at=now() where id=p_id and user_id=auth.uid() returning id into result_id;
    if result_id is null then raise exception 'Trip unavailable'; end if;
    delete from public.trip_items where trip_id=result_id;
  end if;
  for entry in select value from jsonb_array_elements(p_plan->'items') loop
    insert into public.trip_items(id,trip_id,place_id,day,position) values((entry->>'id')::uuid,result_id,entry->>'placeId',(entry->>'day')::integer,ordinal);
    ordinal:=ordinal+1;
  end loop;
  return result_id;
end $$;
revoke all on function public.save_trip(uuid,jsonb) from public,anon;
grant execute on function public.save_trip(uuid,jsonb) to authenticated;

-- Only this atomic function can increment usage. No service-role key is needed.
create or replace function public.consume_concierge_quota() returns boolean language plpgsql security definer set search_path='' as $$
declare current_used integer;
begin
  if auth.uid() is null then return false; end if;
  insert into public.concierge_usage(user_id,bucket,used) values(auth.uid(),date_trunc('hour',now()),1)
    on conflict(user_id,bucket) do update set used=public.concierge_usage.used+1 returning used into current_used;
  return current_used<=10;
end $$;
revoke all on function public.consume_concierge_quota() from public,anon;
grant execute on function public.consume_concierge_quota() to authenticated;
commit;
