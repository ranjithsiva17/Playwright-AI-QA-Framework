const { test, expect } = require('@playwright/test');

const LoginPage = require('../../pages/orangehrm/LoginPage');
const ForgotPasswordPage = require('../../pages/orangehrm/ForgotPasswordPage');

test('Verify user can request password reset successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const forgotPasswordPage = new ForgotPasswordPage(page);

    await loginPage.navigate();

    await loginPage.clickForgotPassword();

    await forgotPasswordPage.resetPassword('Admin');
    console.log(
    await page.locator('input[name="username"]').inputValue()
);

    await expect(
        page.locator(forgotPasswordPage.successMessage)
    ).toContainText('Reset Password');
    await page.waitForTimeout(5000);
console.log(await page.url());
});