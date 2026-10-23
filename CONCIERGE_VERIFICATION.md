# Local verification · 18 October 2026

No Git push or Vercel deployment was performed. The owner's separate publication instruction is required.

## Checked

- Next.js production build and TypeScript validation.
- Ten domain checks: currency precision and invalid rates, same-day combined tickets, group versus per-person transport, missing stay quotes, plan validation, gift quantities, filters, concierge ID validation and safe OAuth return paths.
- Canonicals for 95 sitemap pages, four legacy URL variants and two missing pages.
- HTTP checks passed: actual 308 Location headers, rejection of foreign request origins, guest access denied, private responses marked no-store and all ten currency rates available.
- Browser: Rome detail sheets, selected map locations (Pantheon and Trevi Fountain), AMD conversion and persistence after reload, guest sign-in messaging, planner traveller counts and day changes, keyboard reorder buttons, gifts and over-budget handling.
- Mobile viewport 390 × 844: no horizontal overflow; place-list / map toggle; selected Trevi coordinates retained after showing the previously hidden map.
- Nested detail / sign-in sheets close one at a time with Escape, retain the body scroll lock until the last sheet closes, and restore it afterward.
- Essential-only cookie choice hides the banner and leaves zero optional Google analytics / advertising script elements.
- Browser motion preference was reduced motion; geographic selection was verified, while the animated `flyTo` branch still needs visual review with motion enabled.
- Targeted lint: no errors; two inherited image-optimization warnings in Navigation.

## Must be verified after external setup

- Supabase migration execution, real provider sign-in / sign-out / session refresh and two-user ownership tests. SQL tests are supplied but have not been run against a hosted database.
- Real Groq responses and error handling with an active provider key.
- Payments, partner revenue and commercial delivery: no live checkout or confirmed booking functionality is enabled.
- Rome facts, prices, opening hours and media licensing; initial approximate data must be reviewed before a public launch.
- Inherited dependency security advisories and the absence of a shared durable server-side last-good FX store remain release work.

See `CONCIERGE_SETUP.md` for activation steps and repeatable checks.
