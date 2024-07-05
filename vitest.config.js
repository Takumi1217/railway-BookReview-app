// vitest.config.js

/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    globals: true,
    testTimeout: 30000, // テストのタイムアウトを設定
    include: ['src/__tests__/App.test.jsx'], // `Vitest` テストファイルを指定
  },
});
