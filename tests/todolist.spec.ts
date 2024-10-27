import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe("Suite de pruebas", () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.LoginWithNewUser();
    });

    test('Add task', async ({ page }) => {

        // Wait until the input field is visible
        await page.getByPlaceholder('What needs to be done?').waitFor({ state: 'visible' });
        
        // Fill out and add the task
        await page.getByPlaceholder('What needs to be done?').fill('Hacer Tarea');
        await page.getByPlaceholder('What needs to be done?').press('Enter');
        
        // Verify that the task was added
        await expect(page.getByText('Hacer Tarea')).toBeVisible();
    });

    test('Complete task', async ({ page }) => {
        await page.getByPlaceholder('What needs to be done?').waitFor({ state: 'visible' });
        await page.getByPlaceholder('What needs to be done?').fill('Completar Tarea');
        await page.getByPlaceholder('What needs to be done?').press('Enter');

        // Mark the task as completed
        await page.locator('input[type="checkbox"]').first().check();
        
        // Verify that the task is marked as completed
        await expect(page.getByText('Completar Tarea')).toHaveClass(/completed/);
    });

    test('Clear task', async ({ page }) => {
        await page.getByPlaceholder('What needs to be done?').waitFor({ state: 'visible' });
        await page.getByPlaceholder('What needs to be done?').fill('Limpiar Tarea');
        await page.getByPlaceholder('What needs to be done?').press('Enter');

        // Mark the task as completed
        await page.locator('input[type="checkbox"]').first().check();

        // Click the clear completed tasks button
        await page.getByText('Clear completed').click();

        // Verify that the task has been deleted
        await expect(page.getByText('Limpiar Tarea')).not.toBeVisible();
    });
});
