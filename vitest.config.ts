import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.tsx'],
    setupFiles: './src/setupTests.ts',
    globals: true,
    testTimeout: 10000,
  }
});