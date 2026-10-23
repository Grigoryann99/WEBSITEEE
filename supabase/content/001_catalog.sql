-- STAGING ONLY. Review hosted migration history and take a backup before deployment.
-- Additive: does not alter profiles, trips, saved places, quotas or existing policies.
begin;
create schema travel_content;
revoke all on schema travel_content from public, anon, authenticated;
create table travel_content.destinations (
    id text primary key,
    metadata jsonb not null,
    review_policy jsonb not null,
    check (id = metadata->>'id')
);
create table travel_content.editors (
    user_id uuid primary key references auth.users(id) on delete cascade
);
create table travel_content.places (
    destination_id text not null references travel_content.destinations(id),
    place_id text not null check (place_id ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
    position integer not null default 0 check (position >= 0),
    published jsonb,
    draft jsonb,
    revision integer not null default 1 check (revision > 0),
    updated_at timestamptz not null default now(),
    primary key(destination_id, place_id),
    check (published is not null or draft is not null)
);
create table travel_content.history (
    id bigint generated always as identity primary key,
    destination_id text not null,
    place_id text not null,
    actor uuid,
    action text not null check (action in ('draft','publish')),
    revision integer not null,
    previous jsonb,
    current jsonb not null,
    created_at timestamptz not null default now()
);
alter table travel_content.destinations enable row level security;
alter table travel_content.editors enable row level security;
alter table travel_content.places enable row level security;
alter table travel_content.history enable row level security;
-- No table grants or client-write policies. All editor operations use checked RPCs.
revoke all on all tables in schema travel_content from public, anon, authenticated;
revoke all on all sequences in schema travel_content from public, anon, authenticated;

create function travel_content.require_editor() returns void
language plpgsql security definer set search_path = '' as $$
begin
    if auth.uid() is null or not exists(select 1 from travel_content.editors where user_id = auth.uid()) then
        raise exception 'Content editor access required' using errcode = '42501';
    end if;
end $$;

create function travel_content.validate_entry(destination text, place_id text, entry jsonb) returns void
language plpgsql set search_path = '' as $$
declare p jsonb := entry->'place'; c jsonb; s jsonb; field text; checked date; city text;
begin
    select metadata->>'citySlug' into city from travel_content.destinations where id=destination;
    if city is null or jsonb_typeof(entry) is distinct from 'object' or jsonb_typeof(p) is distinct from 'object'
        or not (entry ?& array['place','media','checks']) or p->>'id' is distinct from place_id
        or p->>'city' is distinct from city or p->>'section' is null or p->>'section' not in ('see','eat','shop','stay','move') then
        raise exception 'Invalid catalog identity' using errcode='22023';
    end if;
    foreach field in array array['name','summary','whyVisit','district','subcategory','howToGet','lastChecked'] loop
        if jsonb_typeof(p->field) is distinct from 'string' or btrim(p->>field)='' then
            raise exception 'Missing catalog field: %',field using errcode='22023';
        end if;
    end loop;
    if jsonb_typeof(p->'coords') is distinct from 'array' or jsonb_array_length(p->'coords')<>2
        or jsonb_typeof(p->'coords'->0) is distinct from 'number' or jsonb_typeof(p->'coords'->1) is distinct from 'number' then
        raise exception 'Invalid coordinates' using errcode='22023';
    end if;
    if (p->'coords'->>0)::numeric not between -90 and 90 or (p->'coords'->>1)::numeric not between -180 and 180 then
        raise exception 'Coordinates out of bounds' using errcode='22023';
    end if;
    if jsonb_typeof(p->'sources') is distinct from 'array' or jsonb_array_length(p->'sources')=0 then
        raise exception 'Source required' using errcode='22023';
    end if;
    for s in select value from jsonb_array_elements(p->'sources') loop
        if coalesce(s->>'url','') !~ '^https://[^/[:space:]]+' or coalesce(s->>'label','')='' then
            raise exception 'Invalid source' using errcode='22023';
        end if;
    end loop;
    if p ? 'booking' and coalesce(p->'booking'->>'url','') !~ '^https://[^/[:space:]]+' then
        raise exception 'Invalid booking URL' using errcode='22023';
    end if;
    if jsonb_typeof(p->'price') is distinct from 'object' or coalesce(p->'price'->>'currency','') not in ('USD','EUR','AMD','RUB','GBP','CHF','AED','JPY','CNY','TRY')
        or coalesce(p->'price'->>'status','') not in ('verified','approximate') or coalesce(p->'price'->>'unit','')='' then
        raise exception 'Invalid price' using errcode='22023';
    end if;
    foreach field in array array['min','max'] loop
        if p->'price' ? field and (jsonb_typeof(p->'price'->field) is distinct from 'number' or (p->'price'->>field)::numeric<0) then
            raise exception 'Invalid price bound' using errcode='22023';
        end if;
    end loop;
    if (p->'price'->>'min')::numeric > (p->'price'->>'max')::numeric then
        raise exception 'Reversed price range' using errcode='22023';
    end if;
    if jsonb_typeof(entry->'checks') is distinct from 'object' then raise exception 'Checks required' using errcode='22023'; end if;
    foreach field in array array['details','price','hours','media'] loop
        c := entry->'checks'->field;
        if jsonb_typeof(c) is distinct from 'object' or not(c ?& array['checkedOn','sourceUrl']) then
            raise exception 'Check metadata required' using errcode='22023';
        end if;
        if (c->>'checkedOn' is null) <> (c->>'sourceUrl' is null) then
            raise exception 'Check needs a date and source' using errcode='22023';
        end if;
        if c->>'checkedOn' is not null then
            if c->>'checkedOn' !~ '^\d{4}-\d{2}-\d{2}$' or c->>'sourceUrl' !~ '^https://[^/[:space:]]+' then
                raise exception 'Invalid dated check' using errcode='22023';
            end if;
            checked := (c->>'checkedOn')::date;
            if checked>current_date then raise exception 'Future check is not allowed' using errcode='22023'; end if;
        end if;
    end loop;
    if p->'price'->>'status'='verified' and entry->'checks'->'price'->>'checkedOn' is null then
        raise exception 'Verified price needs evidence' using errcode='22023';
    end if;
    if p->'hours'->>'status'='verified' and entry->'checks'->'hours'->>'checkedOn' is null then
        raise exception 'Verified hours need evidence' using errcode='22023';
    end if;
    if entry->'media'<>'null'::jsonb then
        s := entry->'media';
        if jsonb_typeof(s) is distinct from 'object' or coalesce(s->>'credit','')='' or coalesce(s->>'type','') not in ('image','video')
            or (coalesce(s->>'src','') !~ '^https://[^/[:space:]]+' and (coalesce(s->>'src','') !~ '^/[^/]' or s->>'src' ~ '\.\.|[\\[:space:]<>]'))
            or (s ? 'creditUrl' and coalesce(s->>'creditUrl','') !~ '^https://[^/[:space:]]+')
            or (s ? 'licenseUrl' and coalesce(s->>'licenseUrl','') !~ '^https://[^/[:space:]]+') then
            raise exception 'Invalid media or missing attribution' using errcode='22023';
        end if;
        if s->>'context' in ('area','illustrative') and (s->>'representative' is distinct from 'true' or coalesce(s->>'caption','')='') then
            raise exception 'Contextual media needs a visible label and caption' using errcode='22023';
        end if;
    end if;
end $$;

-- Owner-backed view deliberately projects only the public snapshot; never draft/editor/history fields.
create view public.travel_catalog with (security_barrier=true) as
select p.destination_id,p.place_id,p.position,p.published as entry,d.metadata as destination,d.review_policy
from travel_content.places p join travel_content.destinations d on d.id=p.destination_id
where p.published is not null;
grant select on public.travel_catalog to anon,authenticated;

create function public.save_catalog_draft(p_destination text,p_place_id text,p_entry jsonb,p_expected_revision integer)
returns integer language plpgsql security definer set search_path='' as $$
declare next_revision integer; old_entry jsonb;
begin
    perform travel_content.require_editor();
    perform travel_content.validate_entry(p_destination,p_place_id,p_entry);
    if p_expected_revision=0 then
        insert into travel_content.places(destination_id,place_id,draft) values(p_destination,p_place_id,p_entry)
        on conflict do nothing returning revision into next_revision;
    else
        select coalesce(draft,published) into old_entry from travel_content.places
        where destination_id=p_destination and place_id=p_place_id and revision=p_expected_revision for update;
        update travel_content.places set draft=p_entry,revision=revision+1,updated_at=now()
        where destination_id=p_destination and place_id=p_place_id and revision=p_expected_revision returning revision into next_revision;
    end if;
    if next_revision is null then raise exception 'Catalog revision conflict; reload before editing' using errcode='40001'; end if;
    insert into travel_content.history(destination_id,place_id,actor,action,revision,previous,current)
    values(p_destination,p_place_id,auth.uid(),'draft',next_revision,old_entry,p_entry);
    return next_revision;
end $$;
create function public.publish_catalog_place(p_destination text,p_place_id text,p_expected_revision integer)
returns integer language plpgsql security definer set search_path='' as $$
declare row travel_content.places; next_revision integer;
begin
    perform travel_content.require_editor();
    select * into row from travel_content.places where destination_id=p_destination and place_id=p_place_id for update;
    if row.revision is distinct from p_expected_revision then raise exception 'Catalog revision conflict' using errcode='40001'; end if;
    if row.draft is null then raise exception 'No draft to publish' using errcode='22023'; end if;
    perform travel_content.validate_entry(p_destination,p_place_id,row.draft);
    update travel_content.places set published=draft,draft=null,revision=revision+1,updated_at=now()
    where destination_id=p_destination and place_id=p_place_id returning revision into next_revision;
    insert into travel_content.history(destination_id,place_id,actor,action,revision,previous,current)
    values(p_destination,p_place_id,auth.uid(),'publish',next_revision,row.published,row.draft);
    return next_revision;
end $$;
create function public.catalog_workspace() returns jsonb language plpgsql security definer set search_path='' as $$
begin
    perform travel_content.require_editor();
    return coalesce((select jsonb_agg(jsonb_build_object('destinationId',destination_id,'placeId',place_id,
        'revision',revision,'hasDraft',draft is not null,'entry',coalesce(draft,published)) order by destination_id,position,place_id)
        from travel_content.places),'[]'::jsonb);
end $$;
revoke all on all functions in schema travel_content from public,anon,authenticated;
revoke all on function public.save_catalog_draft(text,text,jsonb,integer) from public,anon;
revoke all on function public.publish_catalog_place(text,text,integer) from public,anon;
revoke all on function public.catalog_workspace() from public,anon;
grant execute on function public.save_catalog_draft(text,text,jsonb,integer),public.publish_catalog_place(text,text,integer),public.catalog_workspace() to authenticated;
commit;
