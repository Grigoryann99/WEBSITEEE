# Vercel deployment

Use the existing Vercel project connected to `Grigoryann99/WEBSITEEE`.
The branch `codex/preview-travel-updates-20261023` is intended for Preview review.
Do not change the project's production branch to this review branch.

## Build settings

- Framework: Next.js.
- Root directory: repository root.
- Build command: `npm run build` (required: this validates and pulls the catalog before Next.js builds).
- Output directory: Next.js default; do not configure a custom output folder.
- Leave `NEXT_BUILD_DIR` unset on Vercel. Local custom build folders are not deployment artifacts.
- Use a Vercel-supported Node.js version compatible with `package.json` (minimum 20.9).

## Environment variables

Configure these for Preview and Production in the existing project, preserving any existing working values:

| Name | Purpose |
| --- | --- |
| `CONTENT_SOURCE` | `supabase`; pulls published catalog during each build |
| `NEXT_PUBLIC_SUPABASE_URL` | Existing Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public publishable key; legacy anon key is also supported under `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `NEXT_PUBLIC_AUTH_PROVIDERS` | Comma-separated list of actually configured providers, e.g. `google` |
| `GROQ_API_KEY` | Server-only credential for the AI assistant |
| `GROQ_MODEL` | Optional model override; preserve the configured working model |

Never copy the complete local environment file into Git. `SUPABASE_DB_URL` is only for local administrative backup/import and is not needed on Vercel. Never use a service-role key as a public browser key.

Environment changes require a new deployment. A catalog change also needs a new build to become visible; this implementation is a controlled snapshot, not a live database subscription. Catalog fetch or validation failure deliberately fails the build instead of publishing stale data silently.

## Review before production

1. Confirm Vercel produced a successful Preview deployment for the branch commit.
2. Check the home search on Android Chrome: destination, date, travelers, budget, and Explore applying the selections. Actual phone verification remains pending.
3. Check `/stay` at mobile and desktop widths, including the three cards and expandable details. Image captions distinguish concept imagery from actual property photography.
4. Check login, account, planner, and AI chat. Supabase Auth redirect allowlists must permit the intended callback URL for the deployment being tested; preserve the existing production callback.
5. Check destination images and maps. Do not run administrative SQL or imports as part of deployment.
6. After review, merge the reviewed branch into the existing production branch and confirm the resulting production deployment. Keep the previous production deployment available for rollback.

This file describes the deployment procedure; its presence does not confirm that a remote deployment has succeeded.
