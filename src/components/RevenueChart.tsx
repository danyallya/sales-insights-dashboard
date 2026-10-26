import BarChart from "@tremor/react/dist/components/chart-elements/BarChart/BarChart.js";

type RevenuePoint = { month: string; Revenue: number; Plan: number };

export default function RevenueChart({ data }: { data: RevenuePoint[] }) {
  return (
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
    />
  );
}