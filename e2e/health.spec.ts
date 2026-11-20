import { expect, test } from '@playwright/test';

test('health page is served by the generated MSW handler', async ({ page }) => {
  await page.goto('/health');

  await expect(page.getByRole('status')).toContainText(/ok/i);
});
