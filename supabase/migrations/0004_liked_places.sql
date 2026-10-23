begin;
-- Likes (heart) are separate from saves (bookmark).
create table if not exists public.liked_places (
  user_id uuid not null references auth.users(id) on delete cascade, place_id text not null,
  created_at timestamptz not null default now(), primary key(user_id,place_id)
);
alter table public.liked_places enable row level security;
drop policy if exists liked_owner on public.liked_places;
create policy liked_owner on public.liked_places for all to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
revoke all on public.liked_places from anon;
grant select,insert,update,delete on public.liked_places to authenticated;
revoke truncate, references, trigger on table public.liked_places from authenticated, anon, public;
commit;
