// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * PRISM Playwright Configuration
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',

  /* Run tests sequentially (safe for PRISM's shared dev environment) */
  fullyParallel: false,
  workers: 1,

  /* Fail the build on CI if test.only is accidentally committed */
  forbidOnly: !!process.env.CI,

  /* Retry once on both CI and local — PRISM dev server can be flaky */
  retries: 1,

  maxFailures: 0,

  /* Global timeout — upload + processing can be slow */
  timeout: 90_000,
  expect: { timeout: 30_000 },

  /* Reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],

  use: {
    baseURL: 'https://prism-opc-dev.gnxsolutions.app',

    /* Capture trace on first retry for debugging */
    trace: 'on-first-retry',

    /* Screenshot on every test failure */
    screenshot: 'only-on-failure',

    /* Video on first retry (helpful for upload debugging) */
    video: 'on-first-retry',

    /* Larger navigation timeout for PRISM's auth redirects */
    navigationTimeout: 30_000,
    actionTimeout: 30_000,
  },

  projects: [
    {
      name: 'PRISM – Chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
    },
    // Uncomment to run on additional browsers:
    // { name: 'PRISM – Firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'PRISM – WebKit',  use: { ...devices['Desktop Safari']  } },
  ],
});



