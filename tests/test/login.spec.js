const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

test.describe('PRISM - Login Positive Flows', () => {
  let loginPage;

  test.skip(!EMAIL || !PASSWORD, 'EMAIL or PASSWORD is not set in environment variables');

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC01 - Login page loads with all elements visible', async () => {
    await loginPage.verifyLoginPageLoaded();
  });

  test('TC02 - Successful login', async ({ page }) => {
    await loginPage.login(EMAIL, PASSWORD);
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
  });

  test('TC03 - Password field is masked', async () => {
    await loginPage.passwordInput.fill(PASSWORD);
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('TC04 - Remember me checkbox works', async () => {
    await loginPage.rememberMeCheckbox.check();
    await expect(loginPage.rememberMeCheckbox).toBeChecked();
  });

  test('TC05 - Login with Remember Me', async ({ page }) => {
    await loginPage.rememberMeCheckbox.check();
    await loginPage.login(EMAIL, PASSWORD);
    await expect(page).toHaveURL(/dashboard/);
  });

  test('TC06 - Forgot Password navigation', async ({ page }) => {
    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL(/forgot-password/i);
  });

  test('TC07 - Page heading contains PRISM', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /PRISM/i })).toBeVisible();
  });

  test('TC08 - Session persists after reload', async ({ page }) => {
    await loginPage.login(EMAIL, PASSWORD);
    await page.reload();
    await expect(page).toHaveURL(/dashboard/);
  });
});

