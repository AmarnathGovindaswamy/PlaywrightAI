import { test, expect } from '@playwright/test';

const sandboxUrl = 'https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic';

test.beforeEach(async ({ page }) => {
  await page.goto(sandboxUrl);
});

test('renders the basic sandbox page', async ({ page }) => {
  await expect(page).toHaveTitle('Playwright Mastery Academy');
  await expect(page.getByRole('heading', { name: 'Interactive Playwright Sandbox Basic' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Inputs, Checkbox, Radio, Dropdown' })).toBeVisible();
});

test('handles single and double clicks', async ({ page }) => {
  await page.getByRole('button', { name: 'Single Click' }).click();
  await page.getByRole('button', { name: 'Double Click' }).dblclick();

  await expect(page.getByText('Single click completed.')).toBeVisible();
  await expect(page.getByText('Double click completed.')).toBeVisible();
});

test('handles hover, tooltip, and static dropdown selection', async ({ page }) => {
  await page.getByRole('button', { name: 'Hover Target' }).hover();
  await page.getByRole('button', { name: 'Tooltip' }).hover();
  await page.getByLabel('Static Dropdown Practice').selectOption({ label: 'Easy - Basic locator targeting' });

  await expect(page.getByText('Hover triggered successfully.')).toBeVisible();
  await expect(page.getByText('Tooltip verified successfully.')).toBeVisible();
  await expect(page.getByText('Static dropdown selected: Easy.')).toBeVisible();
});

test('submits the learner form with selected preferences', async ({ page }) => {
  await page.getByLabel('Learner Name').fill('Casey Tester');
  await page.getByLabel('Email').fill('casey@example.com');
  await page.getByLabel('Track').selectOption({ label: 'API + UI' });
  await page.getByLabel('Remember preference').check();
  await page.getByLabel('API Mode').check();
  await page.getByRole('button', { name: 'Submit Practice Form' }).click();

  await expect(page.getByText('Casey Tester submitted (casey@example.com) for API + UI.')).toBeVisible();
});

test('submits a command with Enter', async ({ page }) => {
  const commandInput = page.getByLabel('Command Input (press Enter)');
  await commandInput.fill('run checks');
  await commandInput.press('Enter');

  await expect(page.getByText('Command submitted: run checks')).toBeVisible();
});
