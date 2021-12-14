import { FetchOption, ProxyURL } from 'consts'
import { JSONResponseIsValid } from 'libs/validator'

import type { JSONResponse } from 'types/sparqlQueryResult'

export const hasOwnProps = (obj: unknown, key: string): boolean => {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export const fetcher = async (query: string, endpoint: string): Promise<JSONResponse> => {
  const params = new URLSearchParams({ endpoint, query })
  const url = ProxyURL
    ? `${ProxyURL}?${params.toString()}`
    : `${endpoint}?query=${encodeURIComponent(query)}`

  console.log(`Current fetch URL is `, `${endpoint}?query=${encodeURIComponent(query)}`)

  const res = await fetch(url, FetchOption)
  const data: unknown = await res.json()

  if (!JSONResponseIsValid(data)) {
    throw new Error('SPARQL JSON Response is invalid.')
  } else {
    return data
  }
}
