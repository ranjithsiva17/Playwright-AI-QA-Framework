class BasePage {

    constructor(page) {
        this.page = page;
    }

    // async navigate(url) {
    //     await this.page.goto(url);
    // }
    async navigate(url) {
    await this.page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
}

    async click(locator) {
        await locator.click();
    }

    async fill(locator, value) {
        await locator.fill(value);
    }

    async type(locator, value) {
        await locator.type(value);
    }

    async getText(locator) {
        return await locator.textContent();
    }

    async isVisible(locator) {
        return await locator.isVisible();
    }

    async waitForElement(locator) {
        await locator.waitFor();
    }

    async getTitle() {
        return await this.page.title();
    }

    async getCurrentUrl() {
        return this.page.url();
    }

}

module.exports = BasePage;