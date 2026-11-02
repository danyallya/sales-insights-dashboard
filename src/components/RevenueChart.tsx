import BarChart from "@tremor/react/dist/components/chart-elements/BarChart/BarChart.js";
import { formatCurrency } from "../data/metrics";

type RevenuePoint = { month: string; Revenue: number; Plan: number };

export default function RevenueChart({ data }: { data: RevenuePoint[] }) {
  if (data.length === 0) {
    return <div className="chart-state" role="status"><strong>No revenue data for this view</strong><span>Choose another reporting period or sales channel.</span></div>;
  }

  return (
    <>
      <BarChart
        data={data}
        index="month"
        categories={["Revenue", "Plan"]}
        colors={["emerald", "slate"]}
        valueFormatter={(value: number) => `$${value}k`}
        showLegend={false}
        showGridLines={false}
        yAxisWidth={48}
        className="revenue-chart"
        aria-label="Monthly revenue and plan chart"
      />
      <details className="chart-data-summary">
        <summary>View chart data as text</summary>
        <ul>
          {data.map(({ month, Revenue, Plan }) => (
            <li key={month}>{month}: revenue {formatCurrency(Math.round(Revenue * 100_000), 0)}, plan {formatCurrency(Math.round(Plan * 100_000), 0)}</li>
          ))}
        </ul>
      </details>
    </>
  );
}
