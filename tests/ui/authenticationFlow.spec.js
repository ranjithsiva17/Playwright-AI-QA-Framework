
const { test, expect } = require('@playwright/test');

const LoginPage = require('../../pages/orangehrm/LoginPage');
const DashboardPage = require('../../pages/orangehrm/DashboardPage');

const AppConstants = require('../../constants/orangehrm/AppConstants');
const loginData = require('../../testdata/ui/loginData.json');

test('Authentication flow: Login, Logout and Session Protection', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // 1. Navigate to Login
    await loginPage.navigate();

    // 2. Login with valid credentials
    await loginPage.login(
        loginData.validUser.username,
        loginData.validUser.password
    );

    // 3. Verify Dashboard
    await expect(page).toHaveURL(
        AppConstants.DASHBOARD_URL
    );

    await expect(
        dashboardPage.dashboardHeader
    ).toContainText('Dashboard');

    // 4. Logout
    await dashboardPage.logout();

    // 5. Verify Login page
    await expect(page).toHaveURL(/\/auth\/login/);

    await expect(
        loginPage.usernameTextbox
    ).toBeVisible();

    // 6. Access Dashboard without logging in
    await page.goto(AppConstants.DASHBOARD_URL);

    // 7. Verify redirection to Login
    await expect(page).toHaveURL(/\/auth\/login/);

});
