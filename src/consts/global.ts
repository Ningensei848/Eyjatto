export const siteName = process.env.SITE_NAME || 'Eyjatto'

export const MOBILE_WIDTH = process.env.MOBILE_WIDTH || 600

export const ProxyURL = process.env.NEXT_PUBLIC_PROXY_SERVER || ''

// cf. https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch#supplying_request_options
export const FetchOption: RequestInit = {
  method: 'GET',
  headers: { Accept: 'application/sparql-results+json' },
  redirect: 'follow' // manual, *follow, error
}

export const Description =
  'Repository server for SPARQL / No your own server, No RDB, No SSR, but Static Generation with Vercel.'
export const SITE_NAME = '気合でなんとか'
export const Title = `Eyjatto - Repository server for working SPARQL snippets | ${SITE_NAME}`
export const imageUrl =
  'https://custom-og-image-generator.vercel.app/api/' +
  '**Eyjatto**%20-%20_Repository%20server_%20for%20working%20%60SPARQL%60%20snippets.png' +
  '?theme=light&timestamp=Feb.2022' +
  '&copyright=Kubokawa+Takara&logo=https%3A%2F%2Fgithub.githubassets.com%2Fimages%2Fmona-loading-default-static.svg' +
  '&avater=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F763543133724352513%2Fr6RlBYDo_400x400.jpg' +
  '&author=Kiai&aka=%40Ningensei848&site=Ningensei848%2FEyjatto' +
  '&tags=sparql&tags=nextjs&tags=eyjatto'
export const HashTag = process.env.NEXT_PUBLIC_HASHTAG || 'Eyjatto'
export const TWITTER_SITE =
  process.env.NEXT_PUBLIC_TWITTER_SITE || process.env.NEXT_PUBLIC_TWITTER_SITE_ID || '@Ningensei848'
