import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({

  retries: 0,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:4200/',
    globalQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',

    trace: 'on-first-retry',
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 }
    }
  },

  projects: [
    {
      name: 'testEnv',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/'
      },
    },
    {
      name: 'chromium',
      use: {

      },
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox'
      },
    },

    {
      name: 'pageObgectFullScreen',
      testMatch: 'pageObjectTest.spec.ts',
      use: {
        viewport: { width: 1920, height: 1080 }
      },
    },
  ],
});
