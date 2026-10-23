# Destination context rollout

## Implemented locally

- `/plan` starts with destination selection; `/concierge` now opens a conversational AI interface with its own destination selector. No selection, unknown destinations and duplicate destination query parameters cannot open the Rome workspace.
- The directory distinguishes the 51 country guides from the one available city planning catalog (Rome). City and landmark search can find the corresponding country guide without claiming a city planner exists there.
- Country guide actions retain their country and travel preferences. Rome guide, venue details, gift routes and concierge actions pass `destination=italy/rome` explicitly.
- Switching destination retains dates, travelers, interests and budget, while discarding venue identifiers from the previous catalog.
- Homepage search has no preselected city. Country exploration precedes the clearly labeled Rome companion. The global footer action opens all destinations.
- New plans carry `destinationId`; legacy Rome plans remain readable and receive the field on their next save. Other destination ids cannot be accepted as Rome plans.
- AI chat supports the 51 country guides and the Rome catalog. `/api/concierge/guide` requires authentication, same-origin requests and an atomic hourly quota. Replies reference only ids from the selected guide; conversational text is model-generated and may still contain inaccuracies. UI states the guide freshness limitations.
- `/concierge/itinerary?destination=italy%2Frome` preserves the existing AI day-planning flow. Daily planning for other cities remains unavailable.
- Guide conversations remain in the tab until destination-aware persistence is ready; country chats are never written as Rome threads. Switching destination resets conversation history.
- Navbar source and appearance are unchanged. No deployment performed.

## Database migration prepared, not applied

`supabase/migrations/0004_destination_context.sql` is for an existing installation after 0001–0003. It adds a public, read-only city directory, backfills existing records as Rome, links trips / saved places / conversations / quote requests to a destination, and keeps existing ownership policies. Saved trips and conversations cannot silently change destination. The trip RPC preserves legacy input compatibility and reads destination identity explicitly.

The migration replaces the Rome-only city checks with directory foreign keys. It currently registers Rome only; a future city must have a reviewed catalog before it is enabled. Venue ids must remain globally unique when adding catalogs, because existing saved-place operations identify a venue by its id.

The fresh-project bundle includes this migration. Do not run that bundle on an existing database. The new migration has not been executed or verified against PostgreSQL; it needs a staging run and ownership regression checks before application to the shared database. The local application remains compatible with the currently installed schema.

## Remaining catalog expansion

This rollout fixes misleading Rome fallback. It does not add Paris, Tokyo or other city planning catalogs. Before enabling another city:

1. Research venues, coordinates, official sources, image licenses, local currency, price basis and opening hours. Record verification dates and uncertainty.
2. Register the city in the directory and catalog resolver; use unique venue ids.
3. Generalize the current Rome-specific editor, map center, starter places, gift logic, pricing rules and AI result validation to the selected catalog. Current schemas deliberately reject other cities until these are ready.
4. Add destination fields explicitly to account save operations and conversation creation when additional cities become available. Never rely on the legacy Rome defaults for a new city.
5. Run cross-city browser flows and signed-in ownership tests, including saved trips and conversations. Verify that unsupported / unknown cities never receive another city's venues.

## Verification performed

- TypeScript and targeted ESLint checks pass; 16 domain checks pass, including unsupported destinations, legacy plan compatibility, capability availability and dropping venue ids when switching destinations.
- Local HTTP requests with France and a missing destination both return 400 before provider calls.
- Browser: Paris search → France availability → France guide → France concierge availability retains the selected country. Rome concierge → Rome planner works, the sample day adds three stops, and switching destination preserves the edited traveler count.
- At 320px, both the chooser and France availability fit without horizontal overflow. Navbar source hashes match their pre-change versions.
- The follow-up AI chat change passes 19 domain checks. A live provider smoke request using the shared prompt/context/validation returned an answer about France with valid Louvre and Versailles references. The configured model initially returned `model_not_found`; the provider model list was checked and `.env.local` / shared defaults were updated to `openai/gpt-oss-20b` with low reasoning effort.
- Browser checks cover country selection, question suggestions and the guest sign-in gate. A signed-in browser conversation has not been tested. No production build, live database migration or signed-in save was performed. No deployment performed.
