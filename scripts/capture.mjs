import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import process from 'node:process';

const baseUrl = process.env.BASE_URL ?? 'http://127.0.0.1:4321';
const output =
  process.env.CAPTURE_DIR ?? join(tmpdir(), 'handism-portfolio-previews');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  await page.goto(`${baseUrl}/`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${output}/home-desktop.png` });
  await page.locator('#work').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${output}/home-work.png` });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${baseUrl}/`);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${output}/home-mobile.png` });
  console.log(`Screenshots saved to ${output}`);
} finally {
  await browser.close();
}
