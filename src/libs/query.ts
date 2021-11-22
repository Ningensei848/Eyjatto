import axios from 'axios'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { isValidQuery, isValidUrl, JSONResponseIsValid } from '~/src/libs/validator'

import type { JSONResponse } from '~/src/types'

const delay = 500 // mili second
const pattern_embedded = /{{[^=]+?==([^}]*)?}}/gi

const axiosConfig = {
    headers: { Accept: 'application/sparql-results+json' },
}

const fetcher = (url: string): Promise<JSONResponse> =>
    axios.get(url, axiosConfig).then((res) => {
        if (!JSONResponseIsValid(res.data)) {
            throw new Error('SPARQL JSON Response is invalid.')
        } else {
            return res.data
        }
    })

export const useQueryExecute = (
    endpoint: string,
    varEmbeddedQuery: string,
    proxyURL: string | undefined
): { result?: JSONResponse; isLoading: boolean; isError?: Error } => {
    const query = varEmbeddedQuery.replace(pattern_embedded, '$1').trim()
    const params = new URLSearchParams({ endpoint, query })
    // TODO: specification of `default-graph-uri` and  `named-graph-uri`
    // cf. https://www.w3.org/TR/sparql11-protocol/#query-operation
    const url = proxyURL ? `${proxyURL}?${params.toString()}` : `${endpoint}?query=${encodeURIComponent(query)}`

    console.log(`useQueryExecute: url is ${url}`)

    const { data, error } = useSWR<JSONResponse, Error>(isValidQuery(query) && isValidUrl(url) ? url : null, fetcher)

    return {
        result: data,
        isLoading: !error && !data,
        isError: error,
    }
}

interface useQueryUpdateProps {
    variable: string
    initialValue: string
    query: string
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

export const useQueryUpdate = (
    props: useQueryUpdateProps
): [value: string, setValue: React.Dispatch<React.SetStateAction<string>>] => {
    const { variable: name, query, setQuery } = props
    const [value, setValue] = useState(props.initialValue)
    // make RegExp: 大小区別しない＆一致した部分をすべて置換する
    const pattern = new RegExp(`{{${name}(==)?[^]*?}}`, 'gi')

    useEffect(() => {
        // cf. https://zenn.dev/luvmini511/articles/4924cc4cf19bc9
        // delay 後 debounce の対象 state をアップデート
        const timer = setTimeout(() => {
            const newQuery = query.replace(pattern, `{{${name}==${value}}}`)
            setQuery(newQuery)
        }, delay)
        // 次の effect が実行される直前に timer キャンセル
        return () => {
            clearTimeout(timer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]) // value がアップデートするたびに effect 実行

    return [value, setValue]
}
