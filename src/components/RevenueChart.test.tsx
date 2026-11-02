import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import RevenueChart from './RevenueChart';

vi.mock('@tremor/react/dist/components/chart-elements/BarChart/BarChart.js', () => ({
  default: () => <div data-testid="bar-chart" />,
}));

afterEach(() => cleanup());

describe('RevenueChart', () => {
  it('provides a text alternative with the monthly revenue and plan values', () => {
    render(<RevenueChart data={[{ month: 'Jan', Revenue: 38, Plan: 32 }]} />);

    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByText('View chart data as text')).toBeInTheDocument();
    expect(screen.getByText('Jan: revenue $38,000, plan $32,000')).toBeInTheDocument();
  });

  it('explains when the selected view has no chart data', () => {
    render(<RevenueChart data={[]} />);

    expect(screen.getByRole('status')).toHaveTextContent('No revenue data for this view');
    expect(screen.queryByTestId('bar-chart')).not.toBeInTheDocument();
  });
});
