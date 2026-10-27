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
