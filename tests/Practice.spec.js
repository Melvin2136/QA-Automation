import {test,expect}from '@playwright/test'
import { TIMEOUT } from 'node:dns';
test('Practice program',async({page}) => {

await page.goto('https://demoapps.qspiders.com/ui');
await page.getByPlaceholder('Enter your name').fill('Melvin')
await page.getByPlaceholder('Enter Your Email').fill('melvingeorgedaniel@gmail.com')
await page.locator('#password').fill('Melvin')
//await page.waitForTimeout(3000);
await page.getByRole('button',{name:'Register'}).click()

//await expect(page.getByRole('status')).first().toBeHave('/Registered successfully/i');

await page.goto('https://demoapps.qspiders.com/ui/login');

await page.getByRole('textbox',{name:'email'}). fill('melvingeorge@gmail.com')
await page.getByPlaceholder('Enter your password').fill('Melvin123')
await page.waitForTimeout(2000);

const passwordfield=page.locator('#password');
const eyebutton = page.getByRole('img', { name: /password/i });

await page.waitForTimeout(3000)

await expect (passwordfield).toHaveAttribute('type','password');

await eyebutton.click();
await expect(passwordfield).toHaveAttribute('type','text');

await eyebutton.click();
await expect(passwordfield).toHaveAttribute('type','password');
})