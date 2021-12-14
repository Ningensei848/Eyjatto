module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    'import', // cf. https://github.com/alexgorbatchev/eslint-import-resolver-typescript#configuration
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended', // cf. https://typescript-eslint.io/docs/linting/linting#configuration
    'next/core-web-vitals',
    'plugin:react/jsx-runtime', // cf. https://github.com/yannickcr/eslint-plugin-react#configuration
    'plugin:jsx-a11y/recommended', // cf. https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#usage
    'plugin:eslint-comments/recommended', // cf. https://mysticatea.github.io/eslint-plugin-eslint-comments/
    'plugin:import/recommended', // cf. https://github.com/import-js/eslint-plugin-import
    'plugin:import/typescript', // cf. https://github.com/import-js/eslint-plugin-import#typescript
    'plugin:@typescript-eslint/recommended', //cf. https://typescript-eslint.io/docs/linting/linting/#configuration
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // cf. https://typescript-eslint.io/docs/linting/type-linting
    // At last, Extending "prettier" turns off a bunch of core ESLint rules, as well as a few rules:
    'prettier' // cf. https://github.com/prettier/eslint-config-prettier#readme
  ],
  parserOptions: {
    // cf. https://typescript-eslint.io/docs/linting/type-linting -------------
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    // ------------------------------------------------------------------------
    // Only ESLint 6.2.0 and later support ES2020.
    ecmaVersions: 2021
  },
  settings: {
    react: { version: 'detect' },
    // eslint-import-resolver-typescript ---------------------------------------------------
    // cf. https://github.com/alexgorbatchev/eslint-import-resolver-typescript#configuration
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        // always try to resolve types under `<root>@types` directory
        // even it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true
      }
    }
    // -------------------------------------------------------------------------------------
  },
  rules: {
    // turn on errors for missing imports
    'import/no-unresolved': 'error'
  }
}
