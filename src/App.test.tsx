import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
describe('Aurelia Revenue Intelligence', () => {
  it('renders the revenue workspace', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /Revenue, in focus/i })).toBeInTheDocument();
  });
});
