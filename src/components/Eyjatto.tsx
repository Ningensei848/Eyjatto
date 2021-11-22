// TODO: もろもろすべての細かな設定変更は，環境変数経由でやる
import { useEffect, useState } from 'react'
import { useAppDispatch, useSPARQLet, useQueryExecute } from '~/src/libs'
import { update } from '~/src/libs/rtk/slice'
import ConfigurableElement from '~/src/components/ConfigurableElement'

import type { EyjattoProps, FormElement } from '~/src/types'

export const useEyjatto = (props: EyjattoProps) => {
    const { proxyURL } = props

    const [query, setQuery] = useState(props.query || '')
    const { config, isError: isSparqletError } = useSPARQLet(props, setQuery)

    const { endpoint, form } = config

    // クエリの実行と結果の状態管理：proxyURL, endpoint, query
    const { result, isError: isQueryError } = useQueryExecute(endpoint, query, proxyURL)

    return { result, form, query, setQuery, isSparqletError, isQueryError }
}

const Eyjatto = (props: EyjattoProps): JSX.Element => {
    const dispatch = useAppDispatch()
    const { result, form, query, setQuery, isSparqletError, isQueryError } = useEyjatto(props)

    useEffect(() => {
        if (result && !isQueryError) {
            dispatch(update(result))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result])

    if (isSparqletError) {
        console.error(isSparqletError)
        return <p>Error! Failed to load settings.</p> // <Error />
    }

    return (
        <form>
            {form.map((element: FormElement) => (
                <ConfigurableElement key={element.param.name} config={element} query={query} setQuery={setQuery} />
            ))}
        </form>
    )
}

export default Eyjatto
