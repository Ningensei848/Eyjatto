import Head from 'next/head'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { Provider as StateProvider } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { CacheProvider, EmotionCache } from '@emotion/react'

// cf. https://nextjs.org/docs/basic-features/built-in-css-support#import-styles-from-node_modules
import 'github-markdown-css'
import 'styles/global.css'

import { siteName, swrOptions, Description, SITE_NAME, Title, imageUrl, TWITTER_SITE } from 'consts'
import { theme, createEmotionCache } from 'styles/theme'
import { store } from 'stores'
import { usePageView } from 'libs/google'
import Layout from 'components/Layout'
import { GoogleTagManager, GoogleAdsense } from 'components/Google'

const siteUrl = 'https://ningensei848.github.io/eyjatto'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  // https://github.com/vercel/next.js/blob/a4159321b20148ff2f9f6fa847395a8c8162dbef/examples/with-google-tag-manager/pages/_app.js#L7-L13
  usePageView()

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{siteName}</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta name='description' content={Description} />
        <meta property='og:url' content={siteUrl} />
        <meta property='og:title' content={Title} />
        <meta property='og:site_name' content={SITE_NAME} />
        <meta property='og:description' content={Description} />
        <meta property='og:type' content='website' />
        <meta property='og:image' content={imageUrl} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        {/* About Twitter Cards |  https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards */}
        <meta name='twitter:card' content='summary_large_image' />
        {process.env.NEXT_PUBLIC_TWITTER_SITE ? (
          <meta name='twitter:site' content={TWITTER_SITE} />
        ) : (
          <meta name='twitter:site:id' content={TWITTER_SITE} />
        )}
        <meta name='twitter:title' content={Title} />
        <link rel='canonical' href={process.env.NEXT_PUBLIC_CANONICAL || siteUrl} />
        <GoogleTagManager />
        <GoogleAdsense />
      </Head>

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <StateProvider store={store}>
          <CssBaseline />
          <SWRConfig value={swrOptions}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SWRConfig>
        </StateProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
