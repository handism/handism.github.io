import { chromium } from '@playwright/test';
import process from 'node:process';

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:4321';
const output = new URL('../public/og.png', import.meta.url);
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  await page.goto(`${baseUrl}/`);
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.motion-toggle').evaluate((el) => el.remove());
  await page.screenshot({ path: output.pathname });
  console.log(`OG image saved to ${output.pathname}`);
} finally {
  await browser.close();
}
