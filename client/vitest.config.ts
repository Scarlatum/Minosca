import { defineConfig } from 'vitest/dist/config.js';

import path from 'path';

export default defineConfig({
  test: {
    exclude: ['node_modules', 'source', 'utils', 'app'],
    reporters: 'verbose',
    // dir: path.resolve(__dirname, './source/specs'),
    testTimeout: 12000,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './source'),
      'path::root': path.resolve(__dirname, '.')
    }
  },
});