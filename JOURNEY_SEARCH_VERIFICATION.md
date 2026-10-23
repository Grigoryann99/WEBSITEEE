# Journey search · 21 October 2026

## Mobile follow-up · 23 October 2026

User reports that tapping the home search fields in Android Chrome does not open the pickers. The browser preview could not attach in this session, so the phone-specific failure has not been reproduced or confirmed fixed on a real device.

Changes made from code inspection:

- Move the grid into a div inside the disabled fieldset, with explicit mobile destination/date rows and a shared travelers/budget row. Desktop retains the five-column search bar.
- Remove the persistent transform/filter promotion after the hero entrance animation finishes.
- Keep search controls usable if restoring optional URL preferences fails.
- Support the legacy MediaQueryList listener API so older iOS browsers do not throw in the shared display-preferences effect.
- Render dialogs within the visual viewport, including keyboard resize/scroll events. Keep the heading/close button outside the scrolling content and avoid automatic keyboard focus on touch devices. Inputs use 16px text on small screens.
- Show one calendar month on phones, preserve next/previous month selection, reduce narrow-screen calendar spacing and keep date actions sticky. Traveler controls stack on narrow screens.

TypeScript, targeted ESLint, 12 functional checks and 23 concierge/domain checks passed. These checks do not establish native touch or iOS keyboard acceptance. No remote deployment was performed; the live site's mobile behavior must be checked after publishing the change.

Production build also passed in `.next-mobile-search-build`, including Supabase catalog preparation and all 65 generated pages. Existing middleware/Edge Runtime warnings remain. Android Chrome touch acceptance is still pending.

## Original verification

Scope: the home page destination, dates, travelers, spending budget and Explore flow. Navbar and authentication unchanged.

Findings reproduced in the previous local production build:

- Searching for Paris returned zero results: the picker only matched the country label even though it promised city search.
- The country guide kept URL parameters in some links but did not show the selected dates, group size or budget. Rome ignored the numeric spending budget when filtering places.
- Trending destination buttons navigated immediately and discarded the selection in the search bar.
- Traveler and budget controls had different interaction patterns from destination/dates. Dialog scrolling was not excluded from the smooth-page scroll handler.

Changes:

- Every search segment now opens an accessible dialog, including group size and spending budget. All segment buttons use the full available area. Dialog scrolling stays inside the dialog and the destination search receives focus.
- Search controls stay disabled until the client and restored preferences are ready, with a Loading label. Navigation uses a transition, an Exploring label and disabled controls to prevent silent or duplicate submissions.
- City names and landmarks resolve to the existing country guide; no unsupported city planner is advertised. A single matching guide can be chosen with Enter.
- No interest is silently selected on a fresh visit. Explicit selections remain URL preferences.
- Trending suggestions fill the destination field, retaining the other inputs until Explore.
- The budget is stored in EUR and displayed in the user's currency. Changing currency inside the budget dialog converts the amount. Optional and explicit zero budgets remain distinct.
- Explore validates the destination/date range and carries the selection to the guide. It keeps a return URL for editing or returning to the home search.
- Rome shows a summary, compares known per-person starting costs with the group budget, and passes dates, group and budget to the planner. Per-car transport is compared once. Shops/stays/unpriced entries require quotes rather than being assumed free.
- Country pages show the same preference summary, Edit/Clear controls and preserve preferences on planning/concierge links. Country highlights have no price/availability feed and explicitly do not claim date/budget filtering.

Validation: 23 domain checks, TypeScript and full lint passed. Includes real catalog city search, invalid query handling, year-boundary dates, party/budget round trips, zero/optional budgets, group affordability and planning links. Browser checks recorded after production build below.

Browser verification (local production preview):

- Paris → one France country-guide result; Enter selects it.
- Calendar → 15–18 November 2026; travelers → 3; group budget → €90.
- Explore → France summary displays all four values; planning and AI links preserve them.
- Edit search restores the fields. Rome trending suggestion changes the destination without losing the dates, group or budget.
- Rome → Build your days initializes 4 days, 3 travelers, the exact date range and €90 budget.
- Mobile 390×844: all segments fit without horizontal overflow; dates dialog fits and scrolls internally. Budget EUR→USD→EUR retains the draft value (rounded to currency precision).
- Changing budget €90→€10 with 3 travelers changes Rome results from 45 to 28; Pantheon is excluded at a €10 group budget. Unquoted shops/stays remain explicitly outside the known activity-cost comparison.
- Repeated quick suggestions now issue a fresh selection even after a manual destination change; search and budget inputs have explicit dialog autofocus targets.

Limitations: these are destination guides and estimated planning costs, not live booking inventory, weather or opening-date availability. Existing venue estimates still require confirmation. No hosted database change or external deployment.
