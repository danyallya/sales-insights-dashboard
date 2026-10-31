import { describe, expect, it } from 'vitest';
import {
  channelPeriodFixtures,
  dashboardMetrics,
  getPeriodSnapshot,
  marginPeriods,
  orderPeriods,
  revenuePeriods,
  salesChannelOptions,
  summarizeMetrics,
} from './metrics';

describe('Aurelia metric contracts', () => {
  it('derives revenue, gross margin, order count, and average order value from aligned sample periods', () => {
    expect(dashboardMetrics).toEqual({
      netRevenueCents: 74_200_000,
      planRevenueCents: 58_500_000,
      planVarianceBasisPoints: 2_684,
      grossMarginBasisPoints: 6_840,
      orderCount: 10_024,
      averageOrderValueCents: 7_402,
    });
  });

  it('rejects revenue, margin, and order fixtures that cover different periods', () => {
    expect(() => summarizeMetrics(revenuePeriods, marginPeriods.slice(1), orderPeriods)).toThrow(
      'Revenue, margin, and order fixtures must cover the same months in the same order.',
    );
  });

  it('rejects cost fixtures that exceed revenue', () => {
    const invalidMargins = marginPeriods.map((period, index) =>
      index === 0 ? { ...period, costOfGoodsSoldCents: period.netRevenueCents + 1 } : period,
    );

    expect(() => summarizeMetrics(revenuePeriods, invalidMargins, orderPeriods)).toThrow(
      'Metric fixtures must have positive revenue and orders, with costs between zero and revenue.',
    );
  });

  it('returns a stable quarter snapshot with aligned totals and chart months', () => {
    const q4 = getPeriodSnapshot('q4');

    expect(q4.label).toBe('Q4 · Oct–Dec');
    expect(q4.metrics.netRevenueCents).toBe(25_300_000);
    expect(q4.metrics.planRevenueCents).toBe(19_300_000);
    expect(q4.metrics.orderCount).toBe(3_004);
    expect(q4.chartData.map(({ month }) => month)).toEqual(['Oct', 'Nov', 'Dec']);
  });

  it('reconciles every channel to the unfiltered metrics for each quarter', () => {
    const channels = salesChannelOptions.filter(({ value }) => value !== 'all');

    for (const range of ['q1', 'q2', 'q3', 'q4'] as const) {
      const all = getPeriodSnapshot(range).metrics;
      const channelMetrics = channels.map(({ value }) => getPeriodSnapshot(range, value).metrics);

      expect(channelMetrics.reduce((sum, metrics) => sum + metrics.netRevenueCents, 0)).toBe(all.netRevenueCents);
      expect(channelMetrics.reduce((sum, metrics) => sum + metrics.planRevenueCents, 0)).toBe(all.planRevenueCents);
      expect(channelMetrics.reduce((sum, metrics) => sum + metrics.orderCount, 0)).toBe(all.orderCount);
    }
  });

  it('reconciles monthly channel revenue, plan, cost, and order fixtures exactly', () => {
    for (const revenue of revenuePeriods) {
      const channels = channelPeriodFixtures.filter(({ month }) => month === revenue.month);

      expect(channels.reduce((sum, period) => sum + period.netRevenueCents, 0)).toBe(revenue.netRevenueCents);
      expect(channels.reduce((sum, period) => sum + period.planRevenueCents, 0)).toBe(revenue.planRevenueCents);
      expect(channels.reduce((sum, period) => sum + period.costOfGoodsSoldCents, 0)).toBe(
        marginPeriods.find(({ month }) => month === revenue.month)?.costOfGoodsSoldCents,
      );
      expect(channels.reduce((sum, period) => sum + period.orderCount, 0)).toBe(
        orderPeriods.find(({ month }) => month === revenue.month)?.orderCount,
      );
    }
  });

  it('returns the selected channel revenue and chart series for the same months', () => {
    const wholesaleQ1 = getPeriodSnapshot('q1', 'wholesale');

    expect(wholesaleQ1.channelLabel).toBe('Wholesale');
    expect(wholesaleQ1.metrics.netRevenueCents).toBe(3_660_000);
    expect(wholesaleQ1.metrics.planRevenueCents).toBe(3_090_000);
    expect(wholesaleQ1.metrics.orderCount).toBe(648);
    expect(wholesaleQ1.chartData.map(({ month }) => month)).toEqual(['Jan', 'Feb', 'Mar']);
    expect(wholesaleQ1.chartData.reduce((sum, month) => sum + month.Revenue, 0)).toBe(36.6);
  });
});
