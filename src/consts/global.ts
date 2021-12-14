export const siteName = process.env.SITE_NAME || 'Eyjatto'

export const MOBILE_WIDTH = process.env.MOBILE_WIDTH || 600

export const ProxyURL = process.env.NEXT_PUBLIC_PROXY_SERVER || ''

// cf. https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options
export const FetchOption: RequestInit = {
  method: 'GET',
  headers: { Accept: 'application/sparql-results+json' },
  redirect: 'follow' // manual, *follow, error
}
