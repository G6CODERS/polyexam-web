import { expect, test } from '@playwright/test';

test('home page renders the scaffold', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: /PolyExam v2/i }),
  ).toBeVisible();
});
