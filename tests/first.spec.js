import { test, expect } from '@playwright/test';

test.describe('Playwright Health Check', () => {

  test('Verify core functionalities', async ({ page }) => {

    // 1️⃣ Open a website
    await page.goto('https://playwright.dev/');

    // 2️⃣ Verify title
    await expect(page).toHaveTitle(/Playwright/);

    // 3️⃣ Click an element
    await page.click('text=Docs');

    // 4️⃣ Verify navigation
    await expect(page).toHaveURL(/docs/);

    // 5️⃣ Take screenshot
    await page.screenshot({ path: 'screenshot.png' });

    // 6️⃣ Check element visibility
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    // 7️⃣ Print log (check test runner output)
    console.log('✅ Playwright is working correctly');

  });

});