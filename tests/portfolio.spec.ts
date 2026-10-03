import { test, expect } from '@playwright/test';

test('selected editorial homepage works without demo controls', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('body')).toHaveClass(/editorial/);
  await expect(page.locator('h1')).toContainText('Curiosity,');
  await expect(page.locator('.concept-switcher')).toHaveCount(0);
  await page.getByRole('button', { name: '動きを停止', exact: true }).click();
  await expect(page.locator('body')).toHaveClass(/motion-paused/);
  await page.getByRole('button', { name: 'Tools', exact: true }).click();
  await expect(page.locator('.project:visible')).toHaveCount(1);
  await page.getByRole('button', { name: 'Memo Explorerの詳細を見る' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 375, height: 812 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

for (const theme of ['lab', 'editorial', 'gallery']) {
  test(`${theme}: filters, details, keyboard and concept switching`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`/${theme}/`);
    await expect(page.locator('h1')).toBeVisible();
    await page.getByRole('button', { name: 'AI', exact: true }).click();
    await expect(page.locator('.project:visible')).toHaveCount(1);
    await expect(page.locator('.result-count')).toHaveText('1 PROJECT');
    const open = page.getByRole('button', { name: 'Mini Brainの詳細を見る' });
    await open.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('dialog').getByRole('link')).toHaveAttribute('href', 'https://github.com/handism/mini-brain');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(open).toBeFocused();
    await page.getByRole('button', { name: /^All/ }).click();
    await expect(page.locator('.project:visible')).toHaveCount(4);
    await page.getByRole('button', { name: '動きを停止', exact: true }).click();
    await expect(page.locator('body')).toHaveClass(/motion-paused/);
    await page.getByRole('button', { name: '動きを再開' }).click();
    await expect(page.locator('body')).not.toHaveClass(/motion-paused/);
    await page.getByRole('navigation', { name: 'デザインデモの切り替え' }).getByRole('link', { name: '3案の比較ページ' }).click();
    await expect(page.locator('.concept')).toHaveCount(3);
    expect(errors).toEqual([]);
  });

  test(`${theme}: narrow viewport and reduced motion`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`/${theme}/`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(page.locator('.motion-toggle')).toBeDisabled();
    await expect(page.locator('body')).toHaveClass(/motion-paused/);
    await page.getByRole('button', { name: 'Sauna Simulatorの詳細を見る' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: '詳細を閉じる' }).click();
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.locator('.concept-switcher')).toBeInViewport();
  });
}

test('comparison page links to every design at desktop and mobile widths', async ({ page }) => {
  await page.goto('/concepts/');
  const flower = page.locator('.concept-editorial .flower');
  await page.getByRole('button', { name: '動きを停止', exact: true }).click();
  await expect(flower).toHaveCSS('animation-play-state', 'paused');
  await page.getByRole('button', { name: '動きを再開' }).click();
  await expect(flower).toHaveCSS('animation-play-state', 'running');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.motion-toggle')).toBeDisabled();
  await expect(flower).toHaveCSS('animation-name', 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('.motion-toggle')).toBeEnabled();
  for (const theme of ['lab', 'editorial', 'gallery']) {
    await page.locator(`.concept-${theme}`).click();
    await expect(page).toHaveURL(new RegExp(`/${theme}/$`));
    await page.goto('/concepts/');
  }
  await page.setViewportSize({ width: 375, height: 812 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
