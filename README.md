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

### Metric contract for the current sample
`src/data/metrics.ts` stores USD amounts as integer cents. Net revenue is the sum of monthly net revenue; gross margin is `(net revenue - cost of goods sold) / net revenue`; plan variance is `(net revenue - plan) / plan`; order count is the sum of monthly orders; and average order value is `net revenue / order count`, rounded to cents. Monthly revenue, plan, margin-cost and order-count fixtures cover the same twelve months and are explicitly illustrative. The customer table is also sample content. No live Shopify or merchant connection exists yet.

The reporting-period selector applies the full-year or one of four stable calendar-quarter ranges to revenue, plan, margin and order fixtures together. Selected months update the KPI cards, revenue trend, plan variance and a polite status message. Customer account rows are separate full-year synthetic examples and are labeled as unfiltered. Period-change indicators are omitted because the sample has no prior-year comparison series.

The sales-channel selector applies Direct, Wholesale or Marketplace fixtures to the same KPI and chart calculations. The channel allocation is illustrative (50%, 30% and the residual share); cents and whole orders are split per month, with the residual assigned to Marketplace so channel totals reconcile exactly to the source month. No connected channel data exists. The customer account examples remain full-year and unfiltered by both selectors.

## Delivery and metric review

From Day 02, [DELIVERY-POLICY.md](DELIVERY-POLICY.md) governs sequential work, scope-driven commits and Aurelia's own branch/PR. Panel review must reconcile metric values and chart alternatives before merging; a passing check in another product is not evidence for this dashboard.

## Appearance preferences and layout

The dashboard stores only `light` or `dark` under the browser-local `aurelia.theme` key. The initial default is dark; invalid values and unavailable storage fall back safely, and toggling remains usable without storage. The toggle exposes its pressed (dark) state. Shared layout tokens define the rail, page gutter, maximum reading width, panel spacing and radius; phone/tablet overrides retain table scrolling. Keyboard focus uses an offset outline in both palettes, and reduced motion disables decorative transitions. Automated DOM checks do not replace browser visual and keyboard review.

## Contributions and examples

See [CONTRIBUTING.md](CONTRIBUTING.md) for reproducible reports, genuine collaboration and the planned chart alternatives and a calculation walkthrough. Contributions follow the product backlog and reviewed PR workflow.
