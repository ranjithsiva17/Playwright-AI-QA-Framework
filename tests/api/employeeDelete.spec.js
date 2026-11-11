const { test, expect } = require('@playwright/test');

const EmployeePage =
    require('../../pages/orangehrm/EmployeePage');

const LoginPage =
    require('../../pages/orangehrm/LoginPage');

const AppConstants =
    require('../../constants/orangehrm/AppConstants');

const ApiValidator =
    require('../../utils/api/apiValidator');

const employeeSchema =
    require('../../utils/api/schemas/employeeSchema');


// ==========================================
// Test State
// ==========================================

let testEmployee;


// ==========================================
// SETUP
// ==========================================

test.beforeEach(
    async ({ page }) => {

        // --------------------------
        // 1. Login
        // --------------------------

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


        // --------------------------
        // 2. Create Employee via API
        // --------------------------

        const employeeData = {

            firstName: 'Automation',

            middleName: '',

            lastName: 'Engineer',

            empPicture: null,

            employeeId:
                `AU${Date.now()
                    .toString()
                    .slice(-6)}`
        };


        const response =
            await page.request.post(

                'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',

                {
                    data: employeeData
                }

            );


        // --------------------------
        // 3. API Validation
        // --------------------------

        expect(response.ok())
            .toBeTruthy();

        expect(response.status())
            .toBe(200);


        const responseBody =
            await response.json();


        const apiValidator =
            new ApiValidator();


        apiValidator.validateSchema(
            employeeSchema,
            responseBody
        );


        // --------------------------
        // 4. Store Created Employee
        // --------------------------

        testEmployee = {

            ...responseBody.data

        };


        console.log(
            'Test Employee Created:',
            testEmployee
        );

    }
);


// ==========================================
// ACTUAL TEST
// ==========================================

test(
    'Search API-created employee in UI',
    async ({ page }) => {

        const employeePage =
            new EmployeePage(page);


        // --------------------------
        // 1. Navigate to PIM
        // --------------------------

        console.log(
            'Navigating to PIM...'
        );

        await employeePage.navigateToPIM();


        // --------------------------
        // 2. Search Employee
        // --------------------------

        console.log(
            'Searching employee:',
            testEmployee.employeeId
        );

        await employeePage.searchEmployee(
            testEmployee.employeeId
        );


        // --------------------------
        // 3. Validate Employee
        // --------------------------

        const employeeRow =
            employeePage.getEmployeeRow(
                testEmployee.employeeId
            );


        await expect(
            employeeRow
        ).toBeVisible();


        await expect(
            employeeRow
        ).toContainText(
            testEmployee.employeeId
        );


        await expect(
            employeeRow
        ).toContainText(
            testEmployee.firstName
        );


        await expect(
            employeeRow
        ).toContainText(
            testEmployee.lastName
        );


        console.log(
            'UI validation successful'
        );

    }
);


// ==========================================
// TEARDOWN
// ==========================================

test.afterEach(
    async ({ page }) => {

        // --------------------------
        // Safety Check
        // --------------------------

        if (!testEmployee?.empNumber) {

            console.log(
                'No employee available for cleanup.'
            );

            return;
        }


        // --------------------------
        // Delete Employee via API
        // --------------------------

        console.log(
            'Deleting test employee:',
            testEmployee.empNumber
        );


        const response =
            await page.request.delete(

                'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees',

                {
                    data: {
                        ids: [
                            testEmployee.empNumber
                        ]
                    }
                }

            );


        console.log(
            'Delete Status:',
            response.status()
        );


        const responseBody =
            await response.json();


        console.log(
            'Delete Response:',
            JSON.stringify(
                responseBody,
                null,
                2
            )
        );


        expect(response.ok())
            .toBeTruthy();


        console.log(
            'API cleanup successful'
        );


        // Clear state
        testEmployee = undefined;

    }
);