const { test, expect } = require('@playwright/test');

const LoginPage = require('../../pages/orangehrm/LoginPage');
const DashboardPage = require('../../pages/orangehrm/DashboardPage');

const loginData = require('../../testdata/ui/loginData.json');

test('Verify user can login successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.navigate();

    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password
    );

    await expect(
        page.locator(dashboardPage.dashboardHeader)
    ).toBeVisible();

});