-- Read-only post-import checks. Expected for the initial Rome import: 47 / 13.
select destination_id,count(*) as published_places,
       count(*) filter(where entry->'place'->>'section'='shop') as published_shops
from public.travel_catalog group by destination_id;
select has_table_privilege('anon','public.travel_catalog','select') as guest_can_read_published,
       has_schema_privilege('anon','travel_content','usage') as guest_can_access_private_schema,
       has_table_privilege('anon','travel_content.places','update') as guest_can_edit,
       has_table_privilege('authenticated','travel_content.editors','insert') as user_can_assign_editor;
-- Expected: true, false, false, false.
select table_schema,table_name,column_name from information_schema.columns
where table_schema='public' and table_name='travel_catalog' order by ordinal_position;
-- Public view must contain only destination_id,place_id,position,entry,destination,review_policy.
