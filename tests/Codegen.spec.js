import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoapps.qspiders.com/ui?scenario=1');
  await page.getByRole('textbox', { name: 'Name' }).fill('Melvin');
  await page.getByRole('textbox', { name: 'Email Id' }).fill('melvingeorgedaniel@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Melvin');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: 'Email Id' }).fill('melvingeorgedaniel@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Melvin');
  await page.getByRole('button', { name: 'Login' }).click();
});