const base = require('@open-web3/dev-config/config/eslint.cjs');

module.exports = {
  ...base,
  ignorePatterns: [
    '.eslintrc.cjs',
    '.eslintrc.js',
    '.github/**',
    '.vscode/**',
    '.yarn/**',
    '**/build/*',
    '**/coverage/*',
    '**/node_modules/*'
  ],
  parserOptions: {
    ...base.parserOptions,
    project: ['./tsconfig.json']
  },
  rules: {
    ...base.rules,
    'space-before-function-paren': 'off',
    '@typescript-eslint/require-await': 'off', // Async clearly indicates that it is an asynchronous function
    '@typescript-eslint/prefer-regexp-exec': 'off', // There is no need to force the use of this rule
    '@typescript-eslint/no-explicit-any': 'off', // Any is necessary
    '@typescript-eslint/explicit-function-return-type': 'off', // Type inference
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/camelcase': 'off'
  }
};
