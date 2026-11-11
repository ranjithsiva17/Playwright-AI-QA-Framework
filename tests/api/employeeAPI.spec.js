const { test, expect } = require('@playwright/test');
const EmployeePage = require('../../pages/orangehrm/EmployeePage');
const LoginPage = require('../../pages/orangehrm/LoginPage');
const AppConstants = require('../../constants/orangehrm/AppConstants');
const ApiValidator = require('../../utils/api/apiValidator');
const employeeSchema = require('../../utils/api/schemas/employeeSchema');

test(
    'Create employee through API',
    async ({ page }) => {

        // =========================
        // 1. Login through UI
        // =========================

        const loginPage = new LoginPage(page);

        await loginPage.navigate();

        await loginPage.login(
            'Admin',
            'admin123'
        );

        await expect(page).toHaveURL(
            AppConstants.DASHBOARD_URL
        );

        console.log('UI Login Successful');

        // =========================
        // 2. Employee Test Data
        // =========================

        const employeeData = {
            firstName: 'Automation',
            middleName: '',
            lastName: 'Engineer',
            empPicture: null,

            // Keep employee ID reasonably short
            employeeId: `AU${Date.now()
                .toString()
                .slice(-6)}`
        };

        console.log(
            'Employee Data:',
            employeeData
        );

        // =========================
        // 3. Create Employee via API
        // =========================

        const response = await page.request.post(
            'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',
            {
                data: employeeData
            }
        );

        // =========================
        // 4. Validate API Response
        // =========================

        console.log(
            'Status:',
            response.status()
        );

        const responseBody =
            await response.json();

        // =========================
        // 4.1 Schema Validation
        // =========================

        const apiValidator =
            new ApiValidator();

        apiValidator.validateSchema(
            employeeSchema,
            responseBody
        );

        console.log(
            'Schema validation successful'
        );

        console.log(
            'Response:',
            JSON.stringify(
                responseBody,
                null,
                2
            )
        );

        expect(response.ok()).toBeTruthy();

        expect(response.status())
            .toBe(200);

        expect(responseBody.data.firstName)
            .toBe(employeeData.firstName);

        expect(responseBody.data.lastName)
            .toBe(employeeData.lastName);

        expect(responseBody.data.employeeId)
            .toBe(employeeData.employeeId);

        expect(responseBody.data.empNumber)
            .toBeTruthy();

        // =========================
        // 5. UI Validation
        // =========================

        const employeePage =
            new EmployeePage(page);

        console.log('Navigating to PIM...');

        await employeePage.navigateToPIM();

        console.log('Navigated to PIM');

        console.log(
            'Searching employee:',
            employeeData.employeeId
        );

        await employeePage.searchEmployee(
            employeeData.employeeId
        );

        console.log('Search completed');

        const employeeRow =
            employeePage.getEmployeeRow(
                employeeData.employeeId
            );

        console.log('Validating employee row...');

        await expect(
            employeeRow
        ).toBeVisible();

        console.log('Employee row is visible');

        await expect(
            employeeRow
        ).toContainText(
            employeeData.employeeId
        );

        await expect(
            employeeRow
        ).toContainText(
            employeeData.firstName
        );

        await expect(
            employeeRow
        ).toContainText(
            employeeData.lastName
        );

        console.log('UI validation successful');

    }

);