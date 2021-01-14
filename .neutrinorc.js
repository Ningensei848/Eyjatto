// const pkg = require("./package.json");
const tsconfig = require("./tsconfig.json");

const standard = require("@neutrinojs/standardjs");
const reactComponents = require("@neutrinojs/react-components");
const jest = require("@neutrinojs/jest");

const cwdDir = __dirname;
const srcDir = cwdDir + "src";
const outputDir = tsconfig.compilerOptions.outDir; // "dist"; // tsconfig.json から `compilerOptions.outDir` を読んでくるように
const testsDir = cwdDir + "test";

const eslintExtension = (neutrino) => {
  return {
    // cf. https://neutrinojs.org/packages/eslint/#usage
    // Test which files should be linted.
    test: neutrino.regexFromExtensions(["js", "ts", "jsx", "tsx", "mjs"]),
    // include: An array of paths to include in linting. Maps to webpack's Rule.include
    include: [neutrino.options.source, neutrino.options.tests],
    // An array of paths to exclude from linting. Maps to webpack's Rule.exclude
    exclude: [],
    // eslint: An object containing eslint-loader options, which includes options passed to ESLint's CLIEngine.
    eslint: {
      // For supported options, see:
      // https://github.com/webpack-contrib/eslint-loader#options
      // https://eslint.org/docs/developer-guide/nodejs-api#cliengine
      cache: true,
      // Downgrade errors to warnings when in development, to reduce the noise in
      // the webpack-dev-server overlay (which defaults to showing errors only),
      // and to also ensure hot reloading isn't prevented.
      emitWarning: process.env.NODE_ENV === "development",
      // Make errors fatal for 'production' and 'test'.
      // However note that even when `false` webpack still fails the build:
      // https://github.com/webpack-contrib/eslint-loader/issues/257
      failOnError: process.env.NODE_ENV !== "development",
      cwd: cwdDir,
      useEslintrc: false,
      // The options under `baseConfig` correspond to those
      // that can be used in an `.eslintrc.*` file.
      baseConfig: {
        // For supported options, see:
        // cf. https://github.com/webpack-contrib/eslint-loader#options
        // cf. https://eslint.org/docs/developer-guide/nodejs-api#cliengine
        parser: "@typescript-eslint/parser", //require.resolve("babel-eslint"),
        parserOptions: {
          // cf. https://www.npmjs.com/package/@typescript-eslint/parser
          sourceType: "module",
          ecmaVersion: 2018,
          ecmaFeatures: {
            jsx: true,
          },
          tsconfigRootDir: __dirname,
          project: ["./tsconfig.json"],
        },
        env: {
          es6: true,
        },
        plugins: ["babel", "@typescript-eslint", "jest"],
        extends: [
          "eslint:recommended",
          "plugin:eslint-comments/recommended", // cf. https://mysticatea.github.io/eslint-plugin-eslint-comments/#%F0%9F%93%96-usage
          "plugin:@typescript-eslint/recommended",
          "plugin:@typescript-eslint/recommended-requiring-type-checking",
          "plugin:react/recommended",
          "plugin:react-hooks/recommended",
          "plugin:jsx-a11y/recommended",
          // cf. https://github.com/benmosher/eslint-plugin-import#typescript
          "plugin:import/errors",
          "plugin:import/warnings",
          "plugin:import/typescript",
          "prettier",
          "prettier/@typescript-eslint",
          "plugin:jest/recommended",
        ],
        settings: {},
        globals: {
          process: true,
        },
        overrides: [],
        root: true,
        rules: {
          "babel/semi": ["error", "always"],
          // "prettier/prettier": "error",
          semi: ["error", "always"],
          quotes: ["error", "double"],
          // cf. https://github.com/yannickcr/eslint-plugin-react#configuration
          "react/jsx-uses-react": "error",
          "react/jsx-uses-vars": "error",
          "react/prop-types": "off", // We will use TypeScript's types for component props instead.
          "react/react-in-jsx-scope": "off", // No need to import React with Next.js
          "jsx-a11y/anchor-is-valid": "off", // This rule is not compatible with how Next.js's <Link />
          // I suggest this setting for requiring return types on functions only where usefull
          "@typescript-eslint/explicit-function-return-type": [
            "warn",
            {
              allowExpressions: true,
              allowConciseArrowFunctionExpressionsStartingWithVoid: true,
            },
          ],
          "import/order": [
            "warn",
            {
              alphabetize: {
                order: "asc",
              },
              "newlines-between": "always",
            },
          ],
        },
      },
    },
  };
};

const customWebpackChain = (neutrino) => {
  // neutrino.config.resolve.extensions.delete(".jsx");
  // TODO: https://neutrinojs.org/webpack-chain/
  neutrino.config.resolve.alias.clear();
  neutrino.config.node
    .clear() // delete `Buffer: false`, `fs: 'empty'`,  `tls: 'empty'`
    .set("global", false)
    .set("__filename", false)
    .set("__dirname", false);
  neutrino.config.optimization.splitChunks({
    chunks: "async",
    minSize: 20000,
    minRemainingSize: 0,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 30,
    maxInitialRequests: 30,
    enforceSizeThreshold: 50000,
    cacheGroups: {
      defaultVendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        reuseExistingChunk: true,
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
      },
    },
  });
  neutrino.config.devtool("inline-source-map");
  neutrino.config.resolve.extensions.add(".ts").add(".tsx");
  neutrino.config.module
    .rule("transcompile")
    .test(/.tsx?$/)
    .use("tsc")
    .loader("ts-loader");

  // Overwrite above -----------------------------------------------
  neutrino.config.merge({
    module: { rule: { transcompile: { exclude: /node_modules/ } } },
    node: {
      global: false,
      __filename: false,
      __dirname: false,
      // Buffer: undefined,
      // fs: undefined,
      // tls: undefined,
    },
  });
};

module.exports = {
  // cf. https://neutrinojs.org/customization/#optionsroot
  options: {
    root: __dirname,
  },
  source: srcDir, // cf. https://neutrinojs.org/customization/#optionssource
  output: outputDir, // cf. https://neutrinojs.org/customization/#optionsoutput
  tests: testsDir, // cf. https://neutrinojs.org/customization/#optionstests
  // cf. https://neutrinojs.org/customization/#optionsmains
  mains: {
    index: "index",
  },
  // cf. https://neutrinojs.org/customization/#using-middleware
  use: [
    standard(eslintExtension),
    reactComponents(),
    jest(),
    // cf. https://neutrinojs.org/customization/#advanced-configuration-changes
    customWebpackChain,
  ],
};
