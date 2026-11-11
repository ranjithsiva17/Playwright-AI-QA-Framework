const BasePage = require('./BasePage');

class ForgotPasswordPage extends BasePage {

    constructor(page) {

        super(page);

        this.usernameTextbox =
            page.locator('input[name="username"]');

        this.resetPasswordButton =
            page.locator('button[type="submit"]');

        this.cancelButton =
            page.locator('button[type="button"]');

        this.successMessage =
            page.locator('.oxd-text--h6');

    }

    async enterUsername(username) {

        await this.fill(
            this.usernameTextbox,
            username
        );

    }

    async clickResetPassword() {

        await this.click(
            this.resetPasswordButton
        );

    }

    async clickCancel() {

        await this.click(
            this.cancelButton
        );

    }

    async resetPassword(username) {

        await this.enterUsername(username);

        await this.clickResetPassword();

    }

    async getSuccessMessage() {

        return await this.getText(
            this.successMessage
        );

    }

}

module.exports = ForgotPasswordPage;