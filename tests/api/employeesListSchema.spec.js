const { test, expect } = require('@playwright/test');

const LoginPage =
    require('../../pages/orangehrm/LoginPage');

const AppConstants =
    require('../../constants/orangehrm/AppConstants');

const ApiValidator =
    require('../../utils/api/apiValidator');

const employeesListSchema =
    require('../../utils/api/schemas/employeesListSchema');

test(
    'Validate employees list API schema',
    async ({ page }) => {

        // =========================
        // 1. Login
        // =========================

        const loginPage =
            new LoginPage(page);

        await loginPage.navigate();

        await loginPage.login(
            'Admin',
            'admin123'
        );

        await expect(page).toHaveURL(
            AppConstants.DASHBOARD_URL
        );

        console.log(
            'UI Login Successful'
        );

        // =========================
        // 2. GET Employees
        // =========================

        const response =
            await page.request.get(
                'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees'
            );

        console.log(
            'Status:',
            response.status()
        );

        // =========================
        // 3. Status Validation
        // =========================

        expect(response.ok())
            .toBeTruthy();

        expect(response.status())
            .toBe(200);

        // =========================
        // 4. Read Response
        // =========================

        const body =
            await response.json();

        // Temporary schema failure
        // body.data[1].empNumber = 'INVALID';

        // =========================
        // 5. Schema Validation
        // =========================

        const apiValidator =
            new ApiValidator();

        apiValidator.validateSchema(
            employeesListSchema,
            body
        );

        console.log(
            'Employees list schema validation successful'
        );

    }
);