import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../specs',
  testMatch: '**.e2e.ts',
  // Maximum time one test can run for.
  timeout: 10000,
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 5000,
  },
  use: {
    // Maximum time each action such as `click()` can take. Defaults to 0 (no limit).
    actionTimeout: 0,
    // Base URL to use in actions like `await page.goto('/')`.
    // baseURL: 'http://localhost:3000',
    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: 'off', // 'on-first-retry' causes CI job to get stuck
    viewport: null,
  },
  // Run tests in files in parallel
  fullyParallel: true,
  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,
  // Retry on CI only
  retries: process.env.CI ? 2 : 0,
  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,
  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: 'list',
  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: '../test-results',
  projects: [
    {
      name: 'chrome',
      use: devices['Desktop Chrome'],
    },
    {
      name: 'safari',
      use: devices['Desktop Safari'],
    },
    {
      name: 'firefox',
      use: devices['Desktop Firefox'],
    },
  ],
  webServer: {
    command: 'yarn preview',
    port: 4173,
  },
});
