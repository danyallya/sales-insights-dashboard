# Daily work log

## Day 00 — foundation (2026-10-26, Asia/Tehran)

- Prepared the project-specific React/TypeScript workspace, responsive interface, light/dark theme, React Icons, PWA shell, README, AGENTS.md and 30-day backlog.
- Review: inspected the starter UI, tests, dependency graph, PWA output, Git ignore rules and local registry setup; corrected issues found by tests before recording a passing result.
- Dependencies: generated package-lock.json and installed packages after Nexus 404s. The user approved npmjs fallback. Local .npmrc remains ignored, preserves Nexus as default and maps only required scopes. No private registry config is tracked.
- Checks: npm test -- --reporter=dot passed (1/1), npm run typecheck passed, and npm run build passed; no standalone lint script is configured in this Vite project. The PWA build generated its service worker and manifest.
- Performance review: moved the Tremor chart into a separate chunk; first-load JavaScript is 187 KB (gzip 59.46 KB), and the chart is a 397 KB chunk (gzip 110.18 KB).
- GitHub: Day 00 foundation commit 403427d is pushed to both main and day-00-foundation: https://github.com/danyallya/sales-insights-dashboard. Day 01 has not started.
- Schedule: Day 01 has not started. The next task is Day 01 in BACKLOG.md; wait for the user to trigger that day.

## Day 01 — metric contracts (2026-10-27, Asia/Tehran)

- Review: the dashboard KPIs were hard-coded separately from the chart fixtures, the plan variance did not match the displayed monthly series, and the footer claimed a Shopify sync despite there being no connector. Replaced these claims and derived the KPIs and plan variance from one aligned synthetic fixture set.
- Implementation: added typed monthly revenue, plan, margin-cost, and order-count fixtures in integer USD cents; documented net revenue, gross margin, plan variance, order count, and average order value. Added runtime checks for aligned periods and valid costs.
- Tests: `npm test -- --reporter=dot` passed (2 files, 4 tests); `npm run typecheck` passed; `npm run build` passed, including PWA asset generation. An initial validation test exposed that costs were checked only against aggregate revenue; validation now checks each monthly period and the suite passes.
- Documentation: README now defines the current metric contract; BACKLOG marks Day 01 done and records the Day 03 carry-over that the date-range control currently changes its label without applying new data.
- Git: implementation commit `30458b6` (`feat: define revenue metric contracts`) is pushed to `day-01/metric-contracts` and fast-forwarded to `main`. This daily-log entry is included in the final synchronization of both branches. No `.npmrc`, environment files, credentials, or generated build output are tracked.
- Next: Day 02 — establish layout tokens, persist theme preference, and add visible focus styles.

## Delivery policy maintenance — 2026-10-27

- User request: raise per-project review care, run portfolio projects strictly one at a time, use project-specific coherent commits and a separate branch/PR with GitHub panel review and merge.
- Aurelia policy now requires aligned integer-cent metrics, chart alternatives, truthful sample/source labels and product-specific UI evidence. Linked it from AGENTS, README and BACKLOG; the next product task is still Day 02.
- Scope: documentation only on `docs/aurelia-review-gates`. Reviewed the changed Markdown and used `git diff --check`; application tests/build are not rerun for this workflow-only update.
- Publication: this entry records the pre-merge state. The actual PR URL, panel review, merge commit and local sync receipt are recorded in the portfolio workspace DELIVERY-RECEIPTS.md after completion and reconciled at the next authorized log update.

## Contribution guidance maintenance — 2026-10-27

- User request: integrate achievable GitHub profile goals naturally into future project work. Added Aurelia contribution guidance around a synthetic metric-reconciliation case with expected cents and aligned periods and useful documentation examples. Preserved the daily backlog and all delivery gates.
- Previous delivery-policy PR #1 is merged in origin/main; this maintenance starts from that merged history. No badge, collaborator, star or accepted answer is claimed.
- Documentation-only scope on docs/aurelia-community; reviewed Markdown and git diff --check. App tests/build are not rerun because runtime behavior is unchanged.
- Publication is pre-merge here; the final PR/head/panel/check/merge/sync evidence goes in the workspace DELIVERY-RECEIPTS.md after completion. Next: Day 02 — layout tokens, persisted theme preference and visible focus styles. Wait for the user's day trigger.

## Day 02 — appearance and layout — 2026-10-28 (Asia/Tehran)

- Reconciled earlier maintenance receipts: policy PR #1 and contribution PR #2 merged; origin/main 4ce41c7 includes both. Reviewed previous metric contracts, chart component and presentation styles. Day 03 date-range data mismatch remains scheduled and visible.
- Added shared rail/gutter/width/panel tokens, palette-aware focus outlines and improved small-text/positive/negative colors. Theme preference restores and persists with a product-specific key, reports pressed state, and tolerates invalid or blocked storage. Reduced motion disables decorative transitions.
- Checks: npm test -- --reporter=dot passed (3 files, 7 tests). npm run build passed, including TypeScript and PWA generation. git diff --check passed. No standalone lint script exists. No private configuration or generated output is staged.
- Browser blocker: local browser use is disabled in Work settings (observed today). Visual phone/tablet/desktop, keyboard focus and light/dark inspection, PR creation, exact-head Files changed/Checks/conversation review and panel merge remain pending. No CI or approval is claimed. Branch day-02/theme-layout-focus will be pushed; final head/status is recorded in the workspace receipt.
- Contribution evidence: useful regression cases for preference restoration/storage failure; no new issue, coauthor, star or badge claim. Next product scope: Day 03 stable date periods and applied-state feedback, after finishing Day 02 delivery gates.

## Day 03 — applied reporting periods — 2026-10-29 (Asia/Tehran)

- Reconciled Day 02 against the workspace receipt and Git: PR #4 targets `main`, was reviewed at `087f4e895ac5875c534c2929eef8d05081f8af63`, and merged by merge commit `0f5c990676ac018f0efa68d52c4ce37854c246ef`; local `main` is clean and synchronized. The browser-disable note in the historical Day 02 entry is superseded by that later receipt.
- Review finding: the range button only changed its label while KPIs and the monthly chart stayed on the full-year data (existing Issue #6). Replaced it with an accessible reporting-period selector for the full year and four fixed quarters. Each selection summarizes the same months across revenue, plan, costs and orders, updates the KPIs, chart and plan variance, and announces the applied range. Account rows remain full-year illustrative examples and are labeled accordingly; period-change percentages are omitted because no comparison-year fixture exists.
- Regression evidence: added aligned quarter-summary/chart-month tests and an interaction test for Q1 totals and applied-state announcement. The first run exposed leaked RTL render trees between tests; added explicit cleanup and reran successfully.
- Checks: `npm test -- --reporter=dot` passed (3 files, 9 tests); `npm run typecheck` passed; `npm run build` passed, including TypeScript, Vite and PWA generation. No standalone lint script is configured. `git diff --check` passed and all nine changed files were reviewed; no secrets, local config or generated output is staged.
- Visual review: desktop Chrome preview at 1920×1080 applied Q1 correctly (`$122,000`, 2,160 orders, `$56.48` AOV) and showed its visible focus ring. At 393×851, the Mobile View preview showed two-column KPI cards, full-width controls and no page-level horizontal overflow; the table retains internal scrolling. The chart's custom Recharts rectangles had no color class, so the dark chart rendered black; added explicit series fills and confirmed emerald revenue/slate plan bars. Moved and widened the full-year account note after visual review found it wrapping into a narrow column. Keyboard-only browser checks remain unverified.
- Branch: `day-03/aurelia-date-ranges`, based on synchronized `main`; implementation commit `d3e186e` contains the feature, tests and product docs, and browser evidence is recorded in `9fdc2ae`. PR [#7](https://github.com/danyallya/sales-insights-dashboard/pull/7) is open against `main` and closes Issue #6 on merge. At head `1f94f6b2c3dd23053b97743bdae28207d03215bf`, GitHub Files changed showed all nine files reviewed. Opening Commits redirected Chrome to a Kaspersky untrusted-certificate warning; it was left untouched. Checks, conversation, merge eligibility and post-merge synchronization remain unverified. Next action: restore trusted GitHub browser access, inspect the latest head's Commits/Checks/Conversation panels and merge only when gates permit; then synchronize local `main` and record the receipt.
- Contribution evidence: added a synthetic quarter reconciliation case with expected totals inside the existing product tests; no new issue, collaborator, external post or profile award is claimed.
- Next: Day 04 — add sales-channel filters and reconcile filtered KPI totals after completing this PR's delivery gates.

## Day 04 — sales-channel filters — 2026-10-31 (Asia/Tehran)

- Reconciled Day 03 from workspace receipt: PR #7 targeted `main`, its tested head was `0cf0c7cfbbd491b2b2c0e2bbbdc4ee49b29f99b8`, and GitHub merged it with commit `a0651488081f8c84f29d8eab558b791e44641c47`. Files changed showed 9/9 viewed, Checks had 0 configured runs, and the conversation had no findings. No independent review was claimed. Local `main` was already synchronized and clean.
- Review: the Day 03 period selector uses aligned monthly cents, cost and order fixtures. Added synthetic Direct, Wholesale and Marketplace allocations; each month preserves exact revenue, plan, cost and order totals, and both period and channel selections recalculate KPIs and the chart. The status message identifies the active filters and illustrative allocation. Account examples remain explicitly unfiltered.
- Regression evidence: tests cover quarterly reconciliation across channels, exact monthly reconciliation for all four measures, selected-channel chart months and the Q1 Wholesale UI state.
- Checks: `npm test -- --reporter=dot` passed (3 files, 13 tests); `npm run typecheck` passed; `npm run build` passed with Vite and PWA generation; `git diff --check` passed. No standalone lint script is configured.
- Browser review: keyboard selection of Q1 + Wholesale showed `$36,600` revenue, 648 orders and `$56.48` average order value, with matching three-month chart data. Desktop layout and filter contrast were checked in dark and light themes. Mobile emulation and assistive-technology review were not performed.
- Contribution evidence: added a repeatable synthetic per-month channel-reconciliation test; no new issue, collaborator, external post or profile award is claimed.
- Branch `day-04/sales-channel-filter` is based on synchronized `main`. Implementation commit `db37d7541909006cb43a314b7fe6968e86292b65` was pushed. PR [#8](https://github.com/danyallya/sales-insights-dashboard/pull/8) explicitly targets `main`, has 1 commit / 7 files and was open at head `db37d7541909006cb43a314b7fe6968e86292b65` when this entry was recorded. Exact-head Files changed, Checks and conversation review and merge remain pending.
- Next: finish the exact-head PR panel review and permitted merge/sync, then Day 05 — chart loading, empty and error states with text summaries.
