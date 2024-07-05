// tests/login.test.js

import { test, expect } from '@playwright/test';

test('should display error message if email or password is missing', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.click('text=ログイン');

  await page.click('button:has-text("ログイン")');
  await expect(page.locator('text=メールアドレスとパスワードを入力してください。')).toBeVisible();
});

test('should not display error message if email and password are provided', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button:has-text("ログイン")');

  await expect(page.locator('text=メールアドレスとパスワードを入力してください。')).not.toBeVisible();
});
