import path from 'path';
import { test, expect } from '@playwright/test';

test('contact us form', async ({ page }) => {
  await page.goto('https://automationexercise.com/contact_us');

  await expect(page).toHaveTitle(/Automation Exercise - Contact Us/);
  await expect(page.locator('h2', { hasText: 'Get In Touch' })).toBeVisible();

  await page.locator('input[name="name"]').fill('Test User');
  await page.locator('input[name="email"]').fill('test@example.com');
  await page.locator('input[name="subject"]').fill('Contact Form Test');
  await page.locator('textarea[name="message"]').fill('This is a test message from Playwright.');

  const uploadFile = path.join(__dirname, 'test-data', 'upload.txt');
  await page.setInputFiles('input[type=file]', uploadFile);

  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Submit' }).click();

  const successMessage = page.locator('text=Success! Your details have been submitted successfully.').first();
  await expect(successMessage).toBeVisible({ timeout: 10000 });

  await page.getByRole('link', { name: ' Home' }).click();
  await expect(page).toHaveURL(/https:\/\/automationexercise\.com\/?$/);
});
