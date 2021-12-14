import { Children } from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import { theme, createEmotionCache } from 'styles/theme'
import { GoogleTagManagerAlt } from 'components/Google'

import type { DocumentContext } from 'next/document'
import type { EmotionCriticalToChunks } from '@emotion/server/create-instance'

const cache = createEmotionCache()

const getEmotionStyleTags = ({ html }: { html: string }) => {
  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const { extractCriticalToChunks } = createEmotionServer(cache) as {
    extractCriticalToChunks: (html: string) => EmotionCriticalToChunks
  }
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(html)
  return emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))
}

class MyDocument extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage
    ctx.renderPage = () =>
      originalRenderPage({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        enhanceApp: (App: any) =>
          function EnhanceApp(props) {
            return <App emotionCache={cache} {...props} />
          }
      })
    const initialProps = await NextDocument.getInitialProps(ctx)
    const emotionStyleTags = getEmotionStyleTags(initialProps)

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags]
    }
  }

  render(): JSX.Element {
    return (
      <Html lang='en'>
        <Head>
          {/* PWA primary color */}
          <meta name='theme-color' content={theme.palette.primary.main} />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
          />
        </Head>
        <body>
          <GoogleTagManagerAlt />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
