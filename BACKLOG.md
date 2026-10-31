# 30-day delivery plan
## Daily operating loop
Every day begins by reviewing the prior code, Git diff, backlog and open defects. Write or update tests for changed behavior, implement today's ticket, run tests/typecheck/build, update README and backlog, debug regressions and leave tomorrow ready. If dependencies or credentials prevent a check, document that reason and continue with review and static inspection. Add discovered work with priority.

## Foundation status
Day 00 foundation is complete. Dependencies and lockfile are installed; the smoke test (1/1), typecheck and production build passed. This Vite template has no standalone lint script. The local Nexus .npmrc is ignored.

## Daily tickets
### Day 00 verification
Nexus returned 404 for packages used by this project. Following the user's approval, dependencies were installed with npmjs fallback; the ignored local .npmrc keeps Nexus as default and contains only required scope overrides. Day 01 has not started.

| Day | Deliverable |
|---|---|
| 01 | **Done** — define metric contracts and typed revenue, margin and order fixtures; derive dashboard KPIs and plan variance from aligned sample periods. |
| 02 | **Done** — layout tokens, persisted theme preference and visible focus styles; PR #4 merged after exact-head panel review. |
| 03 | **Done** — stable full-year/quarter date ranges update aligned revenue, margin, order and plan metrics plus the chart; account samples are labeled as full-year. PR #7 merged to `main` on 2026-10-29. |
| 04 | **Done** — added illustrative Direct, Wholesale and Marketplace splits. Channel and quarter filters update aligned KPIs and chart series; per-month channel totals reconcile exactly to the unfiltered revenue, plan, cost and order fixtures. Account rows remain explicitly unfiltered. |
| 05 | Add chart loading, empty and error states with text summaries. |
| 06 | Add sortable, paginated customer cohort table. |
| 07 | Review week-one UI; test KPI, date and filter behavior; fix regressions. |
| 08 | Add customer detail drawer with revenue history and source attribution. |
| 09 | Add period comparison and metric definition tooltips. |
| 10 | Add saved dashboard views and URL-safe filter state. |
| 11 | Add CSV export for visible table rows and clear column labels. |
| 12 | Add XLSX export with summary and account sheets. |
| 13 | Add print-ready PDF report and export status feedback. |
| 14 | Review export and keyboard flows; add regression tests. |
| 15 | Add forecast range with explicit assumptions and uncertainty. |
| 16 | Add inventory and repeat-purchase signals with explanatory copy. |
| 17 | Add chart drill-down and synchronized table alternative. |
| 18 | Improve tablet navigation and compact chart legends. |
| 19 | Refine phone filters, KPI cards and scrollable account data. |
| 20 | Audit both themes for contrast, density and reduced motion. |
| 21 | Review mobile/theme changes, fix defects and update design docs. |
| 22 | Add offline shell messaging and safe stale-data timestamps. |
| 23 | Add data-source settings and connection states. |
| 24 | Add accessible global search for accounts and reports. |
| 25 | Add currency, timezone and number-format preferences. |
| 26 | Add help content explaining metrics and data freshness. |
| 27 | Run keyboard and screen-reader review; resolve priority findings. |
| 28 | Run functional regression pass, remove dead UI and refine empty states. |
| 29 | Finalize setup, data, export and deployment documentation. |
| 30 | Release-candidate review: run all checks, close blockers and write release notes. |

## Completion tracking
Mark each day Done, In progress or Blocked after its session. Keep tomorrow's ticket ready and explain new backlog items.

- Day 01: Done. Synthetic metric fixtures now drive the dashboard totals.
- Day 02: Done. Reconciled PR #4's merge receipt and local `main` at `0f5c990`; appearance preferences, layout tokens and visible focus styles are delivered.
- Day 03: Done; PR #7 was merged with merge commit `a065148` and local `main` synchronized. The prior date control only changed its label; quarter snapshots now recalculate aligned metrics and chart points. Customer rows remain illustrative full-year samples and say so.
- Day 04: Done; channel and quarter selections recalculate the same metrics and chart from exact-reconciling illustrative channel splits. Desktop keyboard selection and the focused filter layout were checked. Small-screen layout was updated in CSS; mobile emulation was not available in this review.
- Next: Day 05 — add chart loading, empty and error states with text summaries.

## Delivery process update — 2026-10-27

Effective Day 02: apply [DELIVERY-POLICY.md](DELIVERY-POLICY.md) to every ticket. Complete Aurelia's own reviewed PR and merge (or record a concrete external blocker) before the next portfolio repository. Choose commit boundaries and counts from the actual metric/UI work. Day 01 and the Day 02–30 product schedule remain as recorded.

## Contribution integration — 2026-10-27

Effective Day 02: apply [CONTRIBUTING.md](CONTRIBUTING.md) inside existing tickets. At already scheduled weekly reviews, assess real feedback such as a synthetic metric-reconciliation case with expected cents and aligned periods; at documentation/setup tickets, improve chart alternatives and a calculation walkthrough. Day 30 records actual contribution evidence and outstanding external dependencies. No day is renumbered and no quota or badge is a completion criterion. The next scope is Day 04 — sales-channel filters and reconciled totals.
