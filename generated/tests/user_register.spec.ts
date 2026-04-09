import { test, expect } from '@playwright/test';

test('user can register and log in on Automation Exercise', async ({ page }) => {
  const userName = 'Test User';
  const email = `testuser+${Date.now()}@example.com`;
  const password = 'Password123!';

  await page.goto('https://automationexercise.com/');
  await expect(page).toHaveURL('https://automationexercise.com/');
  await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();

  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page.getByRole('heading', { name: 'New User Signup!' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Name' }).fill(userName);
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);
  await page.getByRole('button', { name: 'Signup' }).click();

  await expect(page.getByRole('heading', { name: 'Enter Account Information' })).toBeVisible();

  await page.getByRole('radio', { name: 'Mr.' }).check();
  await page.locator('input[name="password"]').fill(password);
  await page.locator('select#days').selectOption('1');
  await page.locator('select#months').selectOption('1');
  await page.locator('select#years').selectOption('1990');
  await page.locator('input[name="newsletter"]').check();
  await page.locator('input[name="optin"]').check();

  await page.locator('input[name="first_name"]').fill('Test');
  await page.locator('input[name="last_name"]').fill('User');
  await page.locator('input[name="company"]').fill('Test Company');
  await page.locator('input[name="address1"]').fill('123 Test Street');
  await page.locator('input[name="address2"]').fill('Suite 100');
  await page.locator('select#country').selectOption('United States');
  await page.locator('input[name="state"]').fill('Test State');
  await page.locator('input[name="city"]').fill('Test City');
  await page.locator('input[name="zipcode"]').fill('12345');
  await page.locator('input[name="mobile_number"]').fill('+11234567890');

  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();

  await page.getByRole('link', { name: 'Continue' }).click();
  await expect(page.locator('text=Logged in as Test User')).toBeVisible();
});
