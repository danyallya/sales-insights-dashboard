# 30-day delivery plan
## Daily operating loop
Every day begins by reviewing the prior code, Git diff, backlog and open defects. Write or update tests for changed behavior, implement today's ticket, run tests/typecheck/build, update README and backlog, debug regressions and leave tomorrow ready. If dependencies or credentials prevent a check, document that reason and continue with review and static inspection. Add discovered work with priority.

## Foundation status
Day 00 starter workspace is scaffolded. Packages are not installed and build/test validation has not been run. The Nexus .npmrc is local and ignored by Git.

## Daily tickets
| Day | Deliverable |
|---|---|
| 01 | Define metric contracts and typed revenue, margin and order fixtures. |
| 02 | Establish layout tokens, persisted theme preference and visible focus styles. |
| 03 | Add date-range selection with stable periods and applied-state feedback. |
| 04 | Add sales-channel filters and reconcile filtered KPI totals. |
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
