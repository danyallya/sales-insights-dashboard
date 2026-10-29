/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@tremor/**/*.{js,ts,jsx,tsx}'],
  safelist: ['fill-emerald-500', 'dark:fill-emerald-500', 'fill-slate-500', 'dark:fill-slate-500'],
  theme: { extend: {} },
  plugins: [],
};
