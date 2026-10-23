-- Run in an isolated Supabase test database after 0001_concierge.sql.
-- Existing fixture users must be set by the test runner. Everything rolls back.
-- Run: psql ... -v user_a='<fixture uuid>' -v user_b='<fixture uuid>' -f supabase/tests/ownership.sql
begin;
select set_config('test.user_a', :'user_a', true);
select set_config('test.user_b', :'user_b', true);
set local role authenticated;
select set_config('request.jwt.claim.sub', current_setting('test.user_a'), true);
insert into public.trips(id,user_id,title,plan) values('10000000-0000-4000-8000-000000000001',auth.uid(),'A private trip','{"items":[]}');
insert into public.trip_items(id,trip_id,place_id,day,position) values('10000000-0000-4000-8000-000000000002','10000000-0000-4000-8000-000000000001','pantheon',1,0);
insert into public.concierge_threads(id,user_id) values('10000000-0000-4000-8000-000000000003',auth.uid());
insert into public.concierge_messages(thread_id,role,content) values('10000000-0000-4000-8000-000000000003','user','private request');
select set_config('request.jwt.claim.sub', current_setting('test.user_b'), true);
do $$
begin
  if exists(select from public.trips where id='10000000-0000-4000-8000-000000000001') then raise exception 'Cross-user trip visible'; end if;
  if exists(select from public.trip_items where trip_id='10000000-0000-4000-8000-000000000001') then raise exception 'Cross-user item visible'; end if;
  if exists(select from public.concierge_messages where thread_id='10000000-0000-4000-8000-000000000003') then raise exception 'Cross-user message visible'; end if;
  begin
    insert into public.trip_items(id,trip_id,place_id,day,position) values(gen_random_uuid(),'10000000-0000-4000-8000-000000000001','pantheon',1,1);
    raise exception 'Cross-user item insertion allowed';
  exception when insufficient_privilege then null;
  end;
  begin
    insert into public.concierge_messages(thread_id,role,content) values('10000000-0000-4000-8000-000000000003','user','intrusion');
    raise exception 'Cross-user message insertion allowed';
  exception when insufficient_privilege then null;
  end;
  if exists(select from public.save_trip('10000000-0000-4000-8000-000000000001','{"title":"changed","items":[]}')) then
    raise exception 'Cross-user save allowed';
  end if;
exception when raise_exception then
  if sqlerrm <> 'Trip unavailable' then raise; end if;
end $$;
rollback;
