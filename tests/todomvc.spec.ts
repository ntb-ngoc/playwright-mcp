import { test, expect } from '@playwright/test';

test.describe('TodoMVC Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/todomvc/');
  });

  test('should allow me to add, complete, filter, and clear todos', async ({ page }) => {
    // Add three todos
    await page.getByPlaceholder('What needs to be done?').fill('Buy groceries');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await page.getByPlaceholder('What needs to be done?').fill('Walk the dog');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await page.getByPlaceholder('What needs to be done?').fill('Call mom');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    // Verify all three todos are displayed
    await expect(page.getByText('Buy groceries')).toBeVisible();
    await expect(page.getByText('Walk the dog')).toBeVisible();
    await expect(page.getByText('Call mom')).toBeVisible();

    // Verify counter shows 3 items left
    await expect(page.getByText('3 items left')).toBeVisible();

    // Mark "Buy groceries" as completed
    await page.getByRole('listitem').filter({ hasText: 'Buy groceries' }).getByRole('checkbox').check();

    // Verify counter shows 2 items left
    await expect(page.getByText('2 items left')).toBeVisible();

    // Filter to show only completed todos
    await page.getByRole('link', { name: 'Completed' }).click();

    // Verify only "Buy groceries" is visible
    await expect(page.getByText('Buy groceries')).toBeVisible();
    await expect(page.getByText('Walk the dog')).not.toBeVisible();
    await expect(page.getByText('Call mom')).not.toBeVisible();

    // Filter back to show all todos
    await page.getByRole('link', { name: 'All' }).click();

    // Verify all todos are visible again
    await expect(page.getByText('Buy groceries')).toBeVisible();
    await expect(page.getByText('Walk the dog')).toBeVisible();
    await expect(page.getByText('Call mom')).toBeVisible();

    // Clear completed todos
    await page.getByRole('button', { name: 'Clear completed' }).click();

    // Verify only 2 todos remain
    await expect(page.getByText('Buy groceries')).not.toBeVisible();
    await expect(page.getByText('Walk the dog')).toBeVisible();
    await expect(page.getByText('Call mom')).toBeVisible();

    // Verify counter shows 2 items left
    await expect(page.getByText('2 items left')).toBeVisible();
  });

  test('should allow me to delete a todo', async ({ page }) => {
    // Add a todo
    await page.getByPlaceholder('What needs to be done?').fill('Test deletion');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    // Verify todo is added
    await expect(page.getByText('Test deletion')).toBeVisible();

    // Hover over the todo to reveal delete button
    await page.getByRole('listitem').filter({ hasText: 'Test deletion' }).hover();

    // Click the delete button
    await page.getByRole('button', { name: 'Delete' }).click();

    // Verify todo is deleted
    await expect(page.getByText('Test deletion')).not.toBeVisible();
  });

  test('should allow me to edit a todo', async ({ page }) => {
    // Add a todo
    await page.getByPlaceholder('What needs to be done?').fill('Original task');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    // Double-click to edit
    await page.getByRole('listitem').filter({ hasText: 'Original task' }).dblclick();

    // Clear and type new text
    await page.getByRole('textbox', { name: 'Edit' }).fill('Updated task');
    await page.getByRole('textbox', { name: 'Edit' }).press('Enter');

    // Verify todo is updated
    await expect(page.getByText('Updated task')).toBeVisible();
    await expect(page.getByText('Original task')).not.toBeVisible();
  });

  test('should handle empty todo submission', async ({ page }) => {
    const initialTodoCount = await page.locator('[data-testid="todo-item"]').count();

    // Try to add empty todo
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    // Verify no new todo was added
    await expect(page.locator('[data-testid="todo-item"]')).toHaveCount(initialTodoCount);
  });
});