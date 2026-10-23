# Functional pass — 20 October 2026

Scope: user flows and failure recovery. No security audit, access-policy changes, credential changes, database migrations or deployment were performed.

## Fixed

- Saved-place links include their category and open the requested place details on arrival. Closing details clears the place query. The separate Locate action still selects the map without opening a dialog.
- Saved-place controls wait for the initial saved status, show readable failures, allow retry and finish their pending state on network errors. Repeated save inserts do not create duplicate entries. Collection loading/removal also supports retry and pending feedback, and uses the existing photo fallback.
- Country planning pages accurately advertise their existing AI guide chat and link to it with destination and journey preferences intact. The full city planner remains Rome-only.
- Full-page AI requests have a timeout, cancel when switching destinations/leaving, preserve the draft on failure and honor the display motion preference while scrolling.
- Plan saves have a timeout and finish with a readable error on malformed responses. Editing controls pause while a save is pending to avoid losing changes during the subsequent route transition.
- Purchase quantities become whole numbers in the stop editor.
- The floating AI launcher is compact on planner routes so the wide launcher no longer covers the budget button.

## Verification

- `node scripts/check-functional.cjs`: 12 offline functional checks passed. Includes normal/error JSON, malformed response, network failure, stalled fetch/body, cancellation, trip totals, combined tickets, group quotes, hotel quotes, dates, destination preferences and currency round-trips. Fetch is mocked only inside this offline script; no browser auth state or live provider responses are simulated.
- `npx tsc --noEmit`: passed.
- Targeted Next lint for all changed TypeScript files: passed without warnings.
- Browser: France planner link opens the France AI conversation and retains five days/three travelers in planner links.
- Browser: suggested question survives opening and closing the email sign-in/create-account dialog. No credentials entered or account submitted.
- Browser: sample day adds three places; three travelers show €69–€93; two Pantheon purchases show €84–€108. Entering quantity 2.5 becomes 2. Moving Pantheon to Day 2 updates the day/map; reducing to one day retains all three stops.
- Browser: budget €50 shows the above-budget notice. Save journey opens sign-in for the guest; closing leaves the three-stop plan intact.
- Browser: 390px viewport has 375px document width (scrollbar excluded), without horizontal page overflow.
- Browser: Hotel Artemide deep link opens the correct details; closing works; Locate selects its map pin without opening details.

## Still needs a signed-in user

Real email delivery/confirmation and password recovery, Google sign-in completion, actual trip/place writes and reloading saved data from another device remain unverified. No test account was created, no password was entered and no confirmation email was sent during this pass. A successful guest preview is not proof of account persistence.
