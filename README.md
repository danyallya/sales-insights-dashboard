# Aurelia Revenue Intelligence

Aurelia gives independent commerce teams one calm, decision-ready view of revenue quality. It is designed for founders and finance leads who need to understand whether growth is healthy, which customer relationships are strengthening, and where operating plans need attention.

## Product brief
The workspace brings net revenue, margin, order volume and average order value together with a monthly plan comparison and customer signal. Tremor supplies chart and metric building blocks; React Icons keeps navigation and actions consistent. The current foundation uses curated local sample records, which must be replaced with a connected merchant's data before operational use.

## Run locally
Use Node.js 20 or newer. The project-local `.npmrc` is intentionally ignored by Git because registry configuration is machine-specific. Use `npm ci` with your configured registry; npmjs is an approved fallback if a mirror is missing a dependency.

    npm ci
    npm run dev

Available checks are npm test, npm run typecheck and npm run build. The Vite PWA plugin creates an installable app shell and caches static assets. Verify offline behavior and update handling before a production release.

## Product roadmap
The 30-day plan covers merchant onboarding, accessible chart interactions, date and channel filters, cohort analysis, CSV/XLSX and PDF exports, PWA behavior, responsive QA and a release guide. Production use also requires a secure data connector, account-level access control, documented metric definitions and a privacy review.

## Design, accessibility and data
The interface uses a deep graphite canvas, muted emerald accents and a deliberate light theme. Layout adapts from a full navigation rail to a compact phone view; wide tables remain horizontally scrollable. Daily work must preserve keyboard access, visible focus, text summaries for charts and readable contrast in both themes. Sample records are synthetic. Never commit merchant exports, credentials, environment files or the local npm configuration.
