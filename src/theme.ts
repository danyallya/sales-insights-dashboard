export type Theme = 'light' | 'dark';
export const themeKey = 'aurelia.theme';

export function readTheme(): Theme {
  try {
    const saved = localStorage.getItem(themeKey);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* Storage may be disabled; keep the workspace usable. */ }
  return 'dark';
}

export function saveTheme(theme: Theme): void {
  try { localStorage.setItem(themeKey, theme); } catch { /* Session state still works. */ }
}
