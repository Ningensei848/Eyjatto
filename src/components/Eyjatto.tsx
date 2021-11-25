// TODO: もろもろすべての細かな設定変更は，環境変数経由でやる
import { useEffect, useState } from 'react'
import { useAppDispatch, useSPARQLet, useQueryExecute } from '~/src/libs'
import { update } from '~/src/libs/rtk/slice'
import ConfigurableElement from '~/src/components/ConfigurableElement'

import type { EyjattoProps, FormElement } from '~/src/types'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'

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
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
            {form.map((element: FormElement, idx: number) => (
                <>
                    <ConfigurableElement key={element.param.name} config={element} query={query} setQuery={setQuery} />
                    {/* 複数のフォームがある場合，それらの間に縦棒を置いて仕切る */}
                    {idx + 1 !== form.length && (
                        <Divider sx={{ height: '2rem', m: '0.25rem' }} orientation="vertical" />
                    )}
                </>
            ))}
        </Paper>
    )
}

export default Eyjatto
