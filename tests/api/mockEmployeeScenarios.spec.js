const { test, expect } = require('@playwright/test');

const LoginPage = require('../../pages/orangehrm/LoginPage');
const EmployeePage = require('../../pages/orangehrm/EmployeePage');

test.describe.configure({
    mode: 'parallel'
});

const employeeApi = '**/api/v2/pim/employees*';

async function loginAndNavigateToPIM(page) {

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        'Admin',
        'admin123'
    );

    const employeePage = new EmployeePage(page);

    await employeePage.navigateToPIM();
}


// =====================================================
// 1. Mock 200 Response - Empty Employee List
// =====================================================

test(
    'Mock Employee API - 200 Empty Response',
    async ({ page }) => {

        await page.route(
            employeeApi,
            async route => {

                console.log('200 API intercepted');

                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',

                    json: {
                        data: [],
                        meta: {
                            total: 0
                        },
                        rels: []
                    }
                });
            }
        );

        const responsePromise =
            page.waitForResponse(response =>
                response.url().includes(
                    '/api/v2/pim/employees'
                )
            );

        await loginAndNavigateToPIM(page);

        const response = await responsePromise;

        const body = await response.json();

        console.log(
            '200 Status:',
            response.status()
        );

        console.log(
            '200 Response:',
            body
        );

        expect(response.status()).toBe(200);
        expect(body.data).toEqual([]);
        expect(body.meta.total).toBe(0);
    }
);


// =====================================================
// 2. Mock 500 Response - Server Error
// =====================================================

test(
    'Mock Employee API - 500 Server Error',
    async ({ page }) => {

        await page.route(
            employeeApi,
            async route => {

                console.log('500 API intercepted');

                await route.fulfill({
                    status: 500,
                    contentType: 'application/json',

                    json: {
                        message: 'Internal Server Error'
                    }
                });
            }
        );

        const responsePromise =
            page.waitForResponse(response =>
                response.url().includes(
                    '/api/v2/pim/employees'
                )
            );

        await loginAndNavigateToPIM(page);

        const response = await responsePromise;

        const body = await response.json();

        console.log(
            '500 Status:',
            response.status()
        );

        console.log(
            '500 Response:',
            body
        );

        expect(response.status()).toBe(500);
        expect(body.message).toBe(
            'Internal Server Error'
        );
    }
);


// =====================================================
// 3. Abort Employee API Request
// =====================================================

test(
    'Mock Employee API - Network Failure',
    async ({ page }) => {

        await page.route(
            employeeApi,
            async route => {

                console.log(
                    'Employee API request aborted'
                );

                await route.abort();
            }
        );

        const failedRequestPromise =
            page.waitForEvent(
                'requestfailed',
                request =>
                    request.url().includes(
                        '/api/v2/pim/employees'
                    )
            );

        await loginAndNavigateToPIM(page);

        const failedRequest =
            await failedRequestPromise;

        console.log(
            'Failed Request:',
            failedRequest.url()
        );

        expect(
            failedRequest.url()
        ).toContain(
            '/api/v2/pim/employees'
        );

        expect(
            failedRequest.failure()
        ).not.toBeNull();
    }
);


// =====================================================
// 4. Fetch Real Response + Modify + Fulfill
// =====================================================

test(
    'Mock Employee API - Modify Real Response',
    async ({ page }) => {

        await page.route(
            employeeApi,
            async route => {

                console.log(
                    'Real API intercepted'
                );

                // Get REAL response
                const response =
                    await route.fetch();

                // Read REAL response
                const body =
                    await response.json();

                console.log(
                    'Original Employee Count:',
                    body.data.length
                );

                // Modify REAL response
                body.data = [];

                body.meta.total = 0;

                // Send modified response
                await route.fulfill({
                    response,
                    json: body
                });
            }
        );

        const responsePromise =
            page.waitForResponse(response =>
                response.url().includes(
                    '/api/v2/pim/employees'
                )
            );

        await loginAndNavigateToPIM(page);

        const response = await responsePromise;

        const body = await response.json();

        console.log(
            'Modified Employee Count:',
            body.data.length
        );

        expect(response.status()).toBe(200);
        expect(body.data).toEqual([]);
        expect(body.meta.total).toBe(0);
    }
);


// =====================================================
// 5. Inspect Employee API Request
// =====================================================

test(
    'Inspect Employee API Request',
    async ({ page }) => {

        const requestPromise =
            page.waitForRequest(request =>
                request.url().includes(
                    '/api/v2/pim/employees'
                )
            );

        await loginAndNavigateToPIM(page);

        const request =
            await requestPromise;

        console.log(
            'Request Method:',
            request.method()
        );

        console.log(
            'Request URL:',
            request.url()
        );

        expect(request.method()).toBe('GET');

        expect(request.url()).toContain(
            '/api/v2/pim/employees'
        );
    }
);