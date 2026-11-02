import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ChartErrorBoundary from './ChartErrorBoundary';

function UnstableChart() {
  const shouldFail = vi.fn(() => { throw new Error('render failed'); });
  return shouldFail();
}

describe('ChartErrorBoundary', () => {
  it('contains chart render failures and offers a retry', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<ChartErrorBoundary><UnstableChart /></ChartErrorBoundary>);

    expect(screen.getByRole('alert')).toHaveTextContent('Revenue trend is unavailable');
    fireEvent.click(screen.getByRole('button', { name: 'Try chart again' }));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    consoleError.mockRestore();
  });
});
