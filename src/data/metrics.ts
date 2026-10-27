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

export const orderPeriods: OrderPeriodFixture[] = months.map((month, index) => ({
  month,
  orderCount: monthlyOrderCounts[index],
}));

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

export const revenueChartData = revenuePeriods.map(({ month, netRevenueCents, planRevenueCents }) => ({
  month,
  Revenue: netRevenueCents / 100_000,
  Plan: planRevenueCents / 100_000,
}));

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
