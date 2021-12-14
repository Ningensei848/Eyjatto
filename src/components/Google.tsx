/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @next/next/next-script-for-ga */
// import Script from 'next/script'
import { Ad_ID, GTM_ID } from 'libs/google'

export const GoogleTagManager = (): JSX.Element => (
  // <Script
  <script
    id='script-for-gtm'
    // strategy='afterInteractive'
    dangerouslySetInnerHTML={{
      __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `
    }}
  />
)

/*
This component is used inside `_document.tsx`, so we should use <script /> instead of `<Script />` from 'next/script'
 */
export const GoogleTagManagerAlt = (): JSX.Element => (
  // cf. https://github.com/vercel/next.js/blob/a4159321b20148ff2f9f6fa847395a8c8162dbef/examples/with-google-tag-manager/pages/_document.js#L10-L17
  <noscript>
    <iframe
      title='GoogleTagManagerAlt'
      src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
      height='0'
      width='0'
      style={{ display: 'none', visibility: 'hidden' }}
    />
  </noscript>
)

export const GoogleAdsense = (): JSX.Element => (
  // <Script
  <script
    id='script-for-adsense'
    // strategy='lazyOnload'
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${Ad_ID}`}
  />
)
