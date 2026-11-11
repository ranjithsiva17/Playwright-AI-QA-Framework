const BasePage = require('./BasePage');
const AppConstants = require('../../constants/orangehrm/AppConstants');

class LoginPage extends BasePage {

    constructor(page) {

        super(page);

        this.usernameTextbox =
            page.locator('input[name="username"]');

        this.passwordTextbox =
            page.locator('input[name="password"]');

        this.loginButton =
            page.locator('button[type="submit"]');

        this.invalidCredentialError =
            page.locator('.oxd-alert-content-text');

        this.requiredError =
            page.locator('.oxd-input-field-error-message');

        this.forgotPasswordLink =
            page.locator('.orangehrm-login-forgot-header');

    }

    async navigate() {

        await super.navigate(
            AppConstants.LOGIN_URL
        );

    }

    async enterUsername(username) {

        await this.fill(
            this.usernameTextbox,
            username
        );

    }

    async enterPassword(password) {

        await this.fill(
            this.passwordTextbox,
            password
        );

    }

    async clickLogin() {

        await this.click(
            this.loginButton
        );

    }

    async login(username, password) {

        await this.enterUsername(username);

        await this.enterPassword(password);

        await this.clickLogin();

    }

    async getInvalidCredentialMessage() {

        return await this.getText(
            this.invalidCredentialError
        );

    }

    async getRequiredMessage() {

        return await this.getText(
            this.requiredError
        );

    }

    async clickForgotPassword() {

        await this.click(
            this.forgotPasswordLink
        );

    }

}

module.exports = LoginPage;