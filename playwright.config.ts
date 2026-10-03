import { defineConfig } from '@playwright/test';
import process from 'node:process';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://127.0.0.1:4322',
    browserName: 'chromium',
    // Use the installed Google Chrome locally; CI installs Playwright's bundled Chromium.
    channel: process.env.CI ? undefined : 'chrome',
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: 'npm run preview -- --port 4322 --ignore-lock',
        url: 'http://127.0.0.1:4322',
        reuseExistingServer: !process.env.CI,
      },
});
