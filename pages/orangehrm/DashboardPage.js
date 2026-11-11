
const BasePage = require('./BasePage');

class DashboardPage extends BasePage {

    constructor(page) {

        super(page);

        this.dashboardHeader =
            page.locator('.oxd-topbar-header-breadcrumb');

        this.userDropdown =
            page.locator('.oxd-userdropdown-tab');

        this.logoutMenuItem =
            page.getByRole('menuitem', {
                name: 'Logout',
                exact: true
            });

    }

    async logout() {

        await this.click(this.userDropdown);

        await this.click(this.logoutMenuItem);

    }

}

module.exports = DashboardPage;
