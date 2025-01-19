import type { Linter } from 'eslint';

export default [
  {
    files: ['src/**/*.ts'],
    ignores: ['.wrangler/'],
    rules: {
      'no-console': 'error',
    },
  },
] satisfies Linter.Config[];
