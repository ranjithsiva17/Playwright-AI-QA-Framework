const { test, expect } = require('@playwright/test');

const LoginPage = require('../../pages/orangehrm/LoginPage');
const EmployeePage = require('../../pages/orangehrm/EmployeePage');

test('Route interception and network mocking - complete topic', async ({ page }) => {

    const employeeApi = '**/api/v2/pim/employees*';

    // =========================================
    // 1. LOGIN
    // =========================================

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        'Admin',
        'admin123'
    );

    console.log('Login completed');

    const employeePage = new EmployeePage(page);


    // =========================================
    // 2. MOCK 200 RESPONSE USING FULFILL
    // =========================================

    await page.route(employeeApi, async route => {

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
    });

    const responsePromise200 =
        page.waitForResponse(response =>
            response.url().includes('/api/v2/pim/employees')
        );

    await employeePage.navigateToPIM();

    const response200 = await responsePromise200;

    console.log(
        '200 Status:',
        response200.status()
    );

    const body200 = await response200.json();

    console.log(
        '200 Response:',
        body200
    );

    expect(response200.status()).toBe(200);
    expect(body200.data).toEqual([]);


    // =========================================
    // 3. REMOVE 200 ROUTE
    // =========================================

    await page.unroute(employeeApi);

    console.log('200 route removed');


    // =========================================
    // 4. MOCK 500 RESPONSE
    // =========================================

    await page.route(employeeApi, async route => {

        console.log('500 API intercepted');

        await route.fulfill({
            status: 500,
            contentType: 'application/json',

            json: {
                message: 'Internal Server Error'
            }
        });
    });

    const responsePromise500 =
        page.waitForResponse(response =>
            response.url().includes('/api/v2/pim/employees')
        );

    await page.reload();

    const response500 = await responsePromise500;

    console.log(
        '500 Status:',
        response500.status()
    );

    expect(response500.status()).toBe(500);


    // =========================================
    // 5. REMOVE 500 ROUTE
    // =========================================

    await page.unroute(employeeApi);

    console.log('500 route removed');


    // =========================================
    // 6. ABORT REQUEST
    // =========================================

    await page.route(employeeApi, async route => {

        console.log('Employee API aborted');

        await route.abort();
    });

    await page.reload();

    console.log('Abort scenario completed');


    // =========================================
    // 7. REMOVE ABORT ROUTE
    // =========================================

    await page.unroute(employeeApi);


    // =========================================
    // 8. FETCH REAL RESPONSE + MODIFY
    // =========================================

    await page.route(employeeApi, async route => {

        console.log('Real API intercepted');

        // Call the REAL API
        const response = await route.fetch();

        // Read REAL response
        const body = await response.json();

        console.log(
            'Original employee count:',
            body.data.length
        );

        // Modify real response
        body.data = [];

        // Send modified response to browser
        await route.fulfill({
            response,
            json: body
        });
    });

    const responsePromiseFetch =
        page.waitForResponse(response =>
            response.url().includes('/api/v2/pim/employees')
        );

    await page.reload();

    const responseFetch = await responsePromiseFetch;

    const bodyFetch = await responseFetch.json();

    console.log(
        'Modified employee count:',
        bodyFetch.data.length
    );

    expect(responseFetch.status()).toBe(200);
    expect(bodyFetch.data).toEqual([]);


    // =========================================
    // 9. REMOVE FETCH ROUTE
    // =========================================

    await page.unroute(employeeApi);


    // =========================================
    // 10. INSPECT REQUEST
    // =========================================

    const requestPromise =
        page.waitForRequest(request =>
            request.url().includes('/api/v2/pim/employees')
        );

    await page.reload();

    const request = await requestPromise;

    console.log(
        'Request Method:',
        request.method()
    );

    console.log(
        'Request URL:',
        request.url()
    );

    console.log('Complete network mocking topic finished');
});