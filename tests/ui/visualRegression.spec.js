const { test, expect } = require('@playwright/test');

const LoginPage = require('../../pages/orangehrm/LoginPage');

test(
    'Visual regression - OrangeHRM dashboard',
    async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await loginPage.login(
            'Admin',
            'admin123'
        );

        // Confirm dashboard content is ready
        await expect(
            page.getByRole('heading', {
                name: 'Dashboard'
            })
        ).toBeVisible();

        // Visual regression
        await expect(page).toHaveScreenshot(
            'orangehrm-dashboard.png'
        );
    }
);