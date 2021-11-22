/* If your project uses Storybook v6.x,
 * you will need to update `.storybook/main.js` webpack config to use the most recent version of emotion.
 * cf. https://mui.com/guides/migration-v4/#storybook-emotion-with-v5
 */

const path = require('path')
const toPath = (filePath) => path.join(process.cwd(), filePath)

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    // --------------------------------------------------------------------------------------------
    // cf. https://mui.com/guides/migration-v4/#storybook-emotion-with-v5
    webpackFinal: async (config) => {
        return {
            ...config,
            resolve: {
                ...config.resolve,
                alias: {
                    ...config.resolve.alias,
                    '@emotion/core': toPath('node_modules/@emotion/react'),
                    'emotion-theming': toPath('node_modules/@emotion/react'),
                },
            },
        }
    },
    // --------------------------------------------------------------------------------------------
}
