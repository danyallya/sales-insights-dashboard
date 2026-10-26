import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({
  plugins: [react(), VitePWA({ registerType: 'autoUpdate', includeAssets: ['favicon.svg'], manifest: { name: 'Aurelia Revenue Intelligence', short_name: 'Aurelia', description: 'Revenue intelligence for independent commerce teams.', theme_color: '#111923', background_color: '#111923', display: 'standalone', start_url: '/', icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }] }, workbox: { globPatterns: ['**/*.{js,css,html,svg,woff2}'] } })],
  test: { environment: 'jsdom', setupFiles: './src/test/setup.ts', css: true }
});
