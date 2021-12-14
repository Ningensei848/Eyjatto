import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || ''
export const Ad_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || ''

// cf. https://dev.classmethod.jp/articles/typings-of-window-object/#toc-11
interface Window {
  dataLayer: any
}
declare var window: Window

const pageview = (url: string) => {
  window.dataLayer.push({
    event: 'pageview',
    page: url
  })
}

export const usePageView = () => {
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])
}
