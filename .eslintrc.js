/*
- [Linting your TypeScript Codebase | TypeScript ESLint](https://typescript-eslint.io/docs/linting/linting)
*/

module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        'import', // cf. https://github.com/alexgorbatchev/eslint-import-resolver-typescript#configuration
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended', // cf. https://typescript-eslint.io/docs/linting/linting#configuration
        'plugin:react/recommended', // cf. https://github.com/yannickcr/eslint-plugin-react
        'plugin:react-hooks/recommended', // cf. https://github.com/facebook/react
        'plugin:react/jsx-runtime', // cf. https://github.com/yannickcr/eslint-plugin-react#configuration
        'plugin:jsx-a11y/recommended', // cf. https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#usage
        'plugin:eslint-comments/recommended', // cf. https://mysticatea.github.io/eslint-plugin-eslint-comments/
        'plugin:import/recommended', // cf. https://github.com/import-js/eslint-plugin-import
        'plugin:import/typescript', // cf. https://github.com/import-js/eslint-plugin-import#typescript
        'plugin:@typescript-eslint/recommended', //cf. https://typescript-eslint.io/docs/linting/linting/#configuration
        'plugin:@typescript-eslint/recommended-requiring-type-checking', // cf. https://typescript-eslint.io/docs/linting/type-linting
        // at last
        'prettier',
    ],
    parserOptions: {
        // cf. https://typescript-eslint.io/docs/linting/type-linting -------------
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        // ------------------------------------------------------------------------
        // Only ESLint 6.2.0 and later support ES2020.
        ecmaVersions: 2021,
    },
    settings: {
        react: { version: 'detect' },
        // eslint-import-resolver-typescript ---------------------------------------------------
        // cf. https://github.com/alexgorbatchev/eslint-import-resolver-typescript#configuration
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                // always try to resolve types under `<root>@types` directory
                // even it doesn't contain any source code, like `@types/unist`
                alwaysTryTypes: true,
            },
        },
        // -------------------------------------------------------------------------------------
    },
    rules: {
        // turn on errors for missing imports
        'import/no-unresolved': 'error',
    },
}
