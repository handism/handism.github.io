import { test, expect } from '@playwright/test';

test('homepage loads with the motion toggle', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const response = await page.goto('/');
  expect(response?.status()).toBe(200);
  await expect(page.locator('body')).toHaveClass(/editorial/);
  await expect(page.locator('h1')).toContainText('Curiosity,');
  await page.getByRole('button', { name: '動きを停止', exact: true }).click();
  await expect(page.locator('body')).toHaveClass(/motion-paused/);
  await expect(page.locator('.motion-toggle .icon-play')).toBeVisible();
  await expect(page.locator('.motion-toggle .icon-pause')).toBeHidden();
  await expect(
    page.getByRole('button', { name: 'Web', exact: true }),
  ).toContainText('02');
  await page.getByRole('button', { name: 'Tools', exact: true }).click();
  await expect(page.locator('.project:visible')).toHaveCount(1);
  await page.getByRole('button', { name: 'Memo Explorerの詳細を見る' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 375, height: 812 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test('project dialogs open from and clear the URL hash', async ({ page }) => {
  await page.goto('/#memo-explorer');
  await expect(page.getByRole('dialog')).toContainText('Memo Explorer');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page).toHaveURL(/\/$/);
  await page
    .getByRole('button', { name: '関連作品「Mini Brain」を見る' })
    .click();
  await expect(page.getByRole('dialog')).toContainText('Mini Brain');
  await expect(page).toHaveURL(/\/#mini-brain$/);
  await page.goto('/#apple-fm-chatui');
  await expect(page.getByRole('dialog')).toContainText('Local FM Chat');
  await expect(
    page.getByRole('dialog').getByRole('link', { name: /VSIX/ }),
  ).toHaveAttribute(
    'href',
    'https://github.com/handism/apple-fm-chatui/releases/latest',
  );
});

test('filters, details and keyboard focus', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page.getByRole('button', { name: 'AI', exact: true }).click();
  await expect(page.locator('.project:visible')).toHaveCount(2);
  await expect(page.locator('.result-count')).toHaveText('2 PROJECTS');
  const open = page.getByRole('button', { name: 'Mini Brainの詳細を見る' });
  await open.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(
    page.getByRole('dialog').getByRole('link', { name: /APK/ }),
  ).toHaveAttribute(
    'href',
    'https://github.com/handism/mini-brain/releases/latest',
  );
  await expect(
    page.getByRole('dialog').getByRole('link', { name: /GitHub/ }),
  ).toHaveAttribute('href', 'https://github.com/handism/mini-brain');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(open).toBeFocused();
  await page.getByRole('button', { name: /^All/ }).click();
  await expect(page.locator('.project:visible')).toHaveCount(5);
  await page.getByRole('button', { name: '動きを停止', exact: true }).click();
  await expect(page.locator('body')).toHaveClass(/motion-paused/);
  await page.getByRole('button', { name: '動きを再開' }).click();
  await expect(page.locator('body')).not.toHaveClass(/motion-paused/);
  expect(errors).toEqual([]);
});

test('narrow viewport and reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator('.motion-toggle')).toBeDisabled();
  await expect(page.locator('body')).toHaveClass(/motion-paused/);
  await expect(page.locator('.hero .flower')).toHaveCSS(
    'animation-name',
    'none',
  );
  await page
    .getByRole('button', { name: 'Sauna Simulatorの詳細を見る' })
    .click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: '詳細を閉じる' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('.motion-toggle')).toBeInViewport();
});

test('removed design studies are not published', async ({ page }) => {
  for (const path of ['/concepts/', '/lab/', '/editorial/', '/gallery/']) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
  }
});
