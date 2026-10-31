export type CurrencyCode = 'USD';

/** Monetary values are stored as integer minor units (cents for USD). */
export type Cents = number;

export type RevenuePeriodFixture = {
  month: string;
  netRevenueCents: Cents;
  planRevenueCents: Cents;
};

export type MarginPeriodFixture = {
  month: string;
  netRevenueCents: Cents;
  costOfGoodsSoldCents: Cents;
};

export type OrderPeriodFixture = {
  month: string;
  orderCount: number;
};

export type DashboardMetrics = {
  netRevenueCents: Cents;
  planRevenueCents: Cents;
  planVarianceBasisPoints: number;
  grossMarginBasisPoints: number;
  orderCount: number;
  averageOrderValueCents: Cents;
};

const revenueInThousands = [38, 43, 41, 54, 51, 63, 58, 72, 69, 82, 77, 94];
const planInThousands = [32, 35, 36, 40, 43, 47, 50, 53, 56, 60, 64, 69];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const revenuePeriods: RevenuePeriodFixture[] = months.map((month, index) => ({
  month,
  netRevenueCents: revenueInThousands[index] * 100_000,
  planRevenueCents: planInThousands[index] * 100_000,
}));

// Synthetic costs use a stable 68.4% gross margin so the aggregate KPI and
// the month-level revenue fixture describe the same illustrative period.
export const marginPeriods: MarginPeriodFixture[] = revenuePeriods.map(({ month, netRevenueCents }) => ({
  month,
  netRevenueCents,
  costOfGoodsSoldCents: Math.round(netRevenueCents * 0.316),
}));

const monthlyOrderCounts = [700, 720, 740, 760, 780, 800, 820, 840, 860, 925, 960, 1_119];

export type PeriodRange = 'full-year' | 'q1' | 'q2' | 'q3' | 'q4';

export const periodRangeOptions: { value: PeriodRange; label: string; start: number; end: number; periodLabel: string }[] = [
  { value: 'full-year', label: 'Full year (Jan–Dec)', start: 0, end: 12, periodLabel: 'Jan–Dec' },
  { value: 'q1', label: 'Q1 (Jan–Mar)', start: 0, end: 3, periodLabel: 'Q1 · Jan–Mar' },
  { value: 'q2', label: 'Q2 (Apr–Jun)', start: 3, end: 6, periodLabel: 'Q2 · Apr–Jun' },
  { value: 'q3', label: 'Q3 (Jul–Sep)', start: 6, end: 9, periodLabel: 'Q3 · Jul–Sep' },
  { value: 'q4', label: 'Q4 (Oct–Dec)', start: 9, end: 12, periodLabel: 'Q4 · Oct–Dec' },
];

export const orderPeriods: OrderPeriodFixture[] = months.map((month, index) => ({
  month,
  orderCount: monthlyOrderCounts[index],
}));

export type SalesChannel = 'all' | 'direct' | 'wholesale' | 'marketplace';

export const salesChannelOptions: { value: SalesChannel; label: string }[] = [
  { value: 'all', label: 'All channels' },
  { value: 'direct', label: 'Direct' },
  { value: 'wholesale', label: 'Wholesale' },
  { value: 'marketplace', label: 'Marketplace' },
];

type ChannelPeriodFixture = {
  month: string;
  channel: Exclude<SalesChannel, 'all'>;
  netRevenueCents: Cents;
  planRevenueCents: Cents;
  costOfGoodsSoldCents: Cents;
  orderCount: number;
};

function splitAcrossChannels(total: number) {
  const direct = Math.round(total * 0.5);
  const wholesale = Math.round(total * 0.3);

  return {
    direct,
    wholesale,
    marketplace: total - direct - wholesale,
  };
}

// Synthetic channel shares are deliberately illustrative. The residual share
// keeps every monthly revenue, plan, cost and order total exactly reconciled.
export const channelPeriodFixtures: ChannelPeriodFixture[] = revenuePeriods.flatMap((revenue, index) => {
  const margin = marginPeriods[index];
  const orders = orderPeriods[index];
  const channelRevenue = splitAcrossChannels(revenue.netRevenueCents);
  const channelPlan = splitAcrossChannels(revenue.planRevenueCents);
  const channelCosts = splitAcrossChannels(margin.costOfGoodsSoldCents);
  const channelOrders = splitAcrossChannels(orders.orderCount);

  return (['direct', 'wholesale', 'marketplace'] as const).map((channel) => ({
    month: revenue.month,
    channel,
    netRevenueCents: channelRevenue[channel],
    planRevenueCents: channelPlan[channel],
    costOfGoodsSoldCents: channelCosts[channel],
    orderCount: channelOrders[channel],
  }));
});

export function summarizeMetrics(
  revenues: RevenuePeriodFixture[],
  margins: MarginPeriodFixture[],
  orders: OrderPeriodFixture[],
): DashboardMetrics {
  const periodNames = revenues.map(({ month }) => month);
  const periodsMatch = (periods: { month: string }[]) =>
    periods.length === periodNames.length && periods.every(({ month }, index) => month === periodNames[index]);

  if (!periodsMatch(margins) || !periodsMatch(orders)) {
    throw new Error('Revenue, margin, and order fixtures must cover the same months in the same order.');
  }

  if (margins.some((period, index) => period.netRevenueCents !== revenues[index].netRevenueCents)) {
    throw new Error('Revenue and margin fixtures must use the same net revenue for each month.');
  }

  const netRevenueCents = revenues.reduce((sum, period) => sum + period.netRevenueCents, 0);
  const planRevenueCents = revenues.reduce((sum, period) => sum + period.planRevenueCents, 0);
  const costOfGoodsSoldCents = margins.reduce((sum, period) => sum + period.costOfGoodsSoldCents, 0);
  const orderCount = orders.reduce((sum, period) => sum + period.orderCount, 0);

  const hasInvalidPeriod = revenues.some(({ netRevenueCents: revenue }) => revenue <= 0)
    || margins.some(({ netRevenueCents: revenue, costOfGoodsSoldCents: costs }) => costs < 0 || costs > revenue)
    || orders.some(({ orderCount: count }) => count < 0);

  if (netRevenueCents <= 0 || planRevenueCents <= 0 || costOfGoodsSoldCents < 0 || costOfGoodsSoldCents > netRevenueCents || orderCount <= 0 || hasInvalidPeriod) {
    throw new Error('Metric fixtures must have positive revenue and orders, with costs between zero and revenue.');
  }

  return {
    netRevenueCents,
    planRevenueCents,
    planVarianceBasisPoints: Math.round(((netRevenueCents - planRevenueCents) / planRevenueCents) * 10_000),
    grossMarginBasisPoints: Math.round(((netRevenueCents - costOfGoodsSoldCents) / netRevenueCents) * 10_000),
    orderCount,
    averageOrderValueCents: Math.round(netRevenueCents / orderCount),
  };
}

export const dashboardMetrics = summarizeMetrics(revenuePeriods, marginPeriods, orderPeriods);

export function getPeriodSnapshot(range: PeriodRange, channel: SalesChannel = 'all') {
  const option = periodRangeOptions.find(({ value }) => value === range);

  if (!option) {
    throw new Error(`Unknown reporting period: ${range}`);
  }

  const channelOption = salesChannelOptions.find(({ value }) => value === channel);

  if (!channelOption) {
    throw new Error(`Unknown sales channel: ${channel}`);
  }

  const selectedRevenue = revenuePeriods.slice(option.start, option.end);
  const selectedPeriods = selectedRevenue.map(({ month }) => {
    const channelRows = channelPeriodFixtures.filter((period) =>
      period.month === month && (channel === 'all' || period.channel === channel),
    );
    const netRevenueCents = channelRows.reduce((sum, period) => sum + period.netRevenueCents, 0);
    const planRevenueCents = channelRows.reduce((sum, period) => sum + period.planRevenueCents, 0);
    const costOfGoodsSoldCents = channelRows.reduce((sum, period) => sum + period.costOfGoodsSoldCents, 0);
    const orderCount = channelRows.reduce((sum, period) => sum + period.orderCount, 0);

    return {
      revenue: { month, netRevenueCents, planRevenueCents },
      margin: { month, netRevenueCents, costOfGoodsSoldCents },
      orders: { month, orderCount },
    };
  });

  return {
    label: option.periodLabel,
    channelLabel: channelOption.label,
    metrics: summarizeMetrics(
      selectedPeriods.map(({ revenue }) => revenue),
      selectedPeriods.map(({ margin }) => margin),
      selectedPeriods.map(({ orders }) => orders),
    ),
    chartData: selectedPeriods.map(({ revenue }) => ({
      month: revenue.month,
      Revenue: revenue.netRevenueCents / 100_000,
      Plan: revenue.planRevenueCents / 100_000,
    })),
  };
}

export const revenueChartData = getPeriodSnapshot('full-year').chartData;

export function formatCurrency(cents: Cents, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits,
    minimumFractionDigits: maximumFractionDigits === 2 ? 2 : 0,
  }).format(cents / 100);
}

export function formatCount(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}
