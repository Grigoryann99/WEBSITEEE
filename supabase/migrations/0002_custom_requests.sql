begin;
create table public.custom_plan_requests (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  city text not null check (city='rome'), brief text not null check(char_length(brief) between 20 and 2000),
  status text not null default 'requested' check(status in ('requested','quoted','closed')),
  created_at timestamptz not null default now()
);
create index custom_request_owner on public.custom_plan_requests(user_id);
alter table public.custom_plan_requests enable row level security;
create policy request_read on public.custom_plan_requests for select to authenticated using(user_id=(select auth.uid()));
create policy request_insert on public.custom_plan_requests for insert to authenticated with check(user_id=(select auth.uid()) and status='requested');
revoke all on public.custom_plan_requests from anon;
grant select,insert on public.custom_plan_requests to authenticated;
-- Bound storage even if a signed-in client bypasses the application form.
alter table public.trips add constraint trip_plan_size check(octet_length(plan::text)<=48000);
commit;
