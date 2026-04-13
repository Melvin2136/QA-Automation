const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const { UploadInvoicePage } = require('.//UploadInvoicePage');

const EMAIL = 'business@prism.ai';
const PASSWORD = 'Business@123';

test('PRISM - User can upload invoice from dashboard', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const uploadInvoicePage = new UploadInvoicePage(page);

  await loginPage.goto();
  await loginPage.login(EMAIL, PASSWORD);

  await expect(page).toHaveURL(/dashboard/);

  await uploadInvoicePage.clickUploadInvoice();
  await uploadInvoicePage.waitForUploadForm();
  await expect(page).toHaveURL(/invoice/i);
  await expect(uploadInvoicePage.jobNameInput).toBeVisible();

  await uploadInvoicePage.enterJobName('QA Automation Invoice');
  await uploadInvoicePage.uploadFile();
  await uploadInvoicePage.submit();

  await expect(page).toHaveURL(/invoice|dashboard/i);
  await expect(uploadInvoicePage.successMessage).toBeVisible();
});
