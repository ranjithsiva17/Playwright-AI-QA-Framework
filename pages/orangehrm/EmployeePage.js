const BasePage = require('./BasePage');

class EmployeePage extends BasePage {

    constructor(page) {

        super(page);

        // PIM menu
        this.pimMenu =
            this.page.getByRole('link', {
                name: 'PIM'
            });

        // Employee ID input
        this.employeeIdTextbox =
            this.page.locator(
                '.oxd-input-group'
            ).filter({
                has: this.page.getByText(
                    'Employee Id',
                    { exact: true }
                )
            }).locator('input');

        // Search button
        this.searchButton =
            this.page.getByRole(
                'button',
                {
                    name: 'Search',
                    exact: true
                }
            );
    }

    // async navigateToPIM() {

    //     await this.pimMenu.click();

    // }
    async navigateToPIM() {

    await this.pimMenu.waitFor({
        state: 'visible',
        timeout: 30000
    });

    await this.pimMenu.click();
}

    async searchEmployee(employeeId) {

        await this.employeeIdTextbox.fill(
            employeeId
        );

        await this.searchButton.click();

    }

    getEmployeeRow(employeeId) {

        return this.page
            .locator(
                '.oxd-table-card'
            )
            .filter({
                hasText: employeeId
            });

    }

}

module.exports = EmployeePage;