import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { readTheme, themeKey } from './theme';

vi.mock('./components/RevenueChart', () => ({ default: () => <div>Chart sample</div> }));
afterEach(() => { cleanup(); localStorage.clear(); vi.restoreAllMocks(); });

describe('Aurelia appearance preference', () => {
  it('defaults to dark and ignores invalid stored values', () => {
    expect(readTheme()).toBe('dark');
    localStorage.setItem(themeKey, 'unknown');
    expect(readTheme()).toBe('dark');
  });
  it('restores a light preference and persists a toggle across remounts', () => {
    localStorage.setItem(themeKey, 'light');
    const first = render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle color theme' }));
    expect(localStorage.getItem(themeKey)).toBe('dark');
    first.unmount();
    render(<App />);
    expect(screen.getByRole('button', { name: 'Toggle color theme' })).toHaveAttribute('aria-pressed', 'true');
    expect(document.documentElement.style.colorScheme).toBe('dark');
  });
  it('keeps toggling when browser storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle color theme' }));
    expect(screen.getByRole('button', { name: 'Toggle color theme' })).toHaveAttribute('aria-pressed', 'false');
  });
});
