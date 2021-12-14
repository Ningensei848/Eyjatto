// @ts-check
const buildId = process.env.BUILD_ID || 'build-id'

const assetPrefix = process.env.BASE_PATH ? `/${process.env.BASE_PATH}` : ''

// ----------------------------------------------------------------------------

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  // cf. https://nextjs.org/docs/basic-features/typescript#type-checking-nextconfigjs
  reactStrictMode: true,
  swcMinify: true,
  // cf. https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
  assetPrefix: process.env.CDN_URL || assetPrefix,
  // cf. https://nextjs.org/docs/api-reference/next.config.js/basepath
  basePath: process.env.BASE_PATH ? `/${process.env.BASE_PATH}` : '',

  // publicRuntimeConfig: cf. https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
  publicRuntimeConfig: {
    assetPrefix
  },
  // Explicitly specify ID || cf. https://nextjs.org/docs/api-reference/next.config.js/configuring-the-build-id
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return buildId
  },
  // Path Rewrites || cf. https://nextjs.org/docs/api-reference/next.config.js/rewrites
  async rewrites() {
    /*
     ** source にアクセスすると，destination に飛ばされる
     */
    return {
      // These rewrites are checked after pages/public files are checked but before dynamic routes
      afterFiles: [
        {
          // `/_next/data/build-id/PATH/TO/[id].json`
          source: '/source/sparqlet/:slug*',
          destination: `/_next/data/${buildId}/sparqlet/:slug*.json`
        }
      ]
    }
  }
}
