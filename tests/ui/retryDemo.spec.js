const { test, expect } = require('@playwright/test');

test('Retry Demo', async ({}, testInfo) => {

    console.log(`Running attempt: ${testInfo.retry + 1}`);
    console.log(`testInfo.retry = ${testInfo.retry}`);

    if (testInfo.retry === 0) {

        console.log('Failed');

        // Deliberately fail the first attempt
        expect(false).toBe(true);

    } else {

        console.log('Passed');
    }
});