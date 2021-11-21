// TODO: もろもろすべての細かな設定変更は，環境変数経由でやる
import { useEffect, useState } from 'react'
import { useAppDispatch } from '~/src/libs/rtk'
import { update } from '~/src/libs/rtk/slice'
import { ConfigurableElement } from '~/src/components/ConfigurableElement'
import { useSPARQLet } from '~/src/libs/fetch'
import { useQueryExecute } from '~/src/libs/query'

import { EyjattoProps, FormElement } from '~/src/types'

const Eyjatto = (props: EyjattoProps): JSX.Element => {
    const { proxyURL } = props

    const [query, setQuery] = useState(props.query || '')
    const { config, isError } = useSPARQLet(props, setQuery)

    const { endpoint, form } = config

    // クエリの実行と結果の状態管理：proxyURL, endpoint, query
    const { result, isExecError } = useQueryExecute(endpoint, query, proxyURL)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (result && !isExecError) {
            dispatch(update(result))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result])

    if (isError) return <p>Error! Failed to load settings.</p> // <Error />

    return (
        <form>
            {form.map((element: FormElement) => (
                <ConfigurableElement
                    key={element.param.name}
                    config={element}
                    query={query}
                    setQuery={setQuery}
                />
            ))}
        </form>
    )
}

export default Eyjatto
