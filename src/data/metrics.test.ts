import { describe, expect, it } from 'vitest';
import {
  dashboardMetrics,
  marginPeriods,
  orderPeriods,
  revenuePeriods,
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
});
