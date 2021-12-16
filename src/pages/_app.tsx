import Head from 'next/head'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { Provider as StateProvider } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { CacheProvider, EmotionCache } from '@emotion/react'

// cf. https://nextjs.org/docs/basic-features/built-in-css-support#import-styles-from-node_modules
import 'github-markdown-css'
import 'styles/global.css'

import { siteName, swrOptions } from 'consts'
import { theme, createEmotionCache } from 'styles/theme'
import { store } from 'stores'
import { usePageView } from 'libs/google'
import Layout from 'components/Layout'
import { GoogleTagManager, GoogleAdsense } from 'components/Google'

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
