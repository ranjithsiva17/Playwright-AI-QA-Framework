const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/orangehrm/LoginPage');
const loginData =require('../../testdata/ui/loginData.json');

test('Verify error message for invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(loginData.invalidUser.username,loginData.invalidUser.password);
    await expect(page.locator(loginPage.invalidCredentialError)).toContainText('Invalid credentials');

});

test('Verify error message for empty login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(loginData.emptyUser.username,loginData.emptyUser.password);
    await expect(page.locator(loginPage.requiredError)).toHaveCount(2);

});