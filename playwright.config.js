// // @ts-check
// import { defineConfig, devices } from '@playwright/test';

// /**
//  * Read environment variables from file.
//  * https://github.com/motdotla/dotenv
//  */
// // import dotenv from 'dotenv';
// // import path from 'path';
// // dotenv.config({ path: path.resolve(__dirname, '.env') });

// /**
//  * @see https://playwright.dev/docs/test-configuration
//  */
// export default defineConfig({
//   testDir: './tests',
//   /* Run tests in files in parallel */
//   fullyParallel: true,
//   /* Fail the build on CI if you accidentally left test.only in the source code. */
//   forbidOnly: !!process.env.CI,
//   /* Retry on CI only */
//   retries: process.env.CI ? 2 : 0,
//   /* Opt out of parallel tests on CI. */
//   workers: process.env.CI ? 1 : undefined,
//   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//   reporter: 'html',
//   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
//   use: {
//     /* Base URL to use in actions like `await page.goto('')`. */
//     // baseURL: 'http://localhost:3000',

//     /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//     trace: 'on-first-retry',
//   },

//   /* Configure projects for major browsers */
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'],headless: false},
//     },

//     // {
//     //   name: 'firefox',
//     //   use: { ...devices['Desktop Firefox'] },
//     // },

//     // {
//     //   name: 'webkit',
//     //   use: { ...devices['Desktop Safari'] },
//     // },

//     /* Test against mobile viewports. */
//     // {
//     //   name: 'Mobile Chrome',
//     //   use: { ...devices['Pixel 5'] },
//     // },
//     // {
//     //   name: 'Mobile Safari',
//     //   use: { ...devices['iPhone 12'] },
//     // },

//     /* Test against branded browsers. */
//     // {
//     //   name: 'Microsoft Edge',
//     //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
//     // },
//     // {
//     //   name: 'Google Chrome',
//     //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
//     // },
//   ],

//   /* Run your local dev server before starting the tests */
//   // webServer: {
//   //   command: 'npm run start',
//   //   url: 'http://localhost:3000',
//   //   reuseExistingServer: !process.env.CI,
//   // },
// });

// @ts-check
// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  /* Global Settings */
  fullyParallel: false,// Run tests in files in parallel - Sharding Parallel Demo 1 & 2.

  forbidOnly: !!process.env.CI,

  retries: 0,

  workers: 1,

  reporter: 'html',

  timeout: 60000,

  expect: {
    timeout: 10000,
  },

  /* Common Settings */
  use: {
    ...devices['Desktop Chrome'],

    headless: false,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    actionTimeout: 10000,

    navigationTimeout: 30000,
  },

  /* Project Execution Control */
  projects: [

    /* =========================
       UI TESTS
       ========================= */

    {
      name: 'UI',

      testMatch: [

        // 'tests/ui/login.spec.js',
        // 'tests/ui/loginNegative.spec.js',
        // 'tests/ui/forgotPassword.spec.js',
        // 'tests/databaseValidation.spec.js',
        // 'tests/ui/visualRegression.spec.js',
        // 'tests/ui/parallelDemo.spec.js',
        // 'tests/ui/parallelDemo1.spec.js',
        // 'tests/ui/parallelDemo2.spec.js',
        // 'tests/ui/retryDemo.spec.js',
        // 'tests/ui/flakyHandlingDemo.spec.js',
        'tests/ui/authenticationFlow.spec.js'

      ]
    },
    {
      name: 'Datavalidation',

      testMatch: [

        'tests/datavalidation/databaseValidation.spec.js',
        'tests/datavalidation/apiDatabaseValidation.spec.js'

      ]
    },

    /* =========================
       API TESTS
       ========================= */

    {
      name: 'API',
      testMatch: [
        // 'tests/api/employeeAPI.spec.js',
        // 'tests/api/schemaValidation.spec.js',  //Invalid Schema Validation for Understanding
        // 'tests/api/employeesListSchema.spec.js',
        // 'tests/api/employeeDelete.spec.js',
        // 'tests/api/routeMocking.spec.js',
        // 'tests/api/mockEmployeeScenarios.spec.js', // Just for understanding route mocking scenarios as demo account is not behaving reliably when multiple tests log in and use the same external account concurrently.
      ]
    },

    //  AI TESTS

    {
      name: 'AI',
      testMatch: [
        // './tests/ai/openai.spec.js',
      ]
    }
  ]
});