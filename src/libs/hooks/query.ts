import useSWR from 'swr'
import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from './rtk'
import { isValidQuery } from 'libs/validator'
import { update as resultUpdate } from 'stores/resultSlice'
import { querySelectors, queryUpdated } from 'stores/sparqlQuerySlice'

import type { JSONResponse } from 'types/sparqlQueryResult'

const pattern_embedded = /{{[^=]+?==([^}]*)?}}/gi

export const useQueryExecute = (props: {
  id: string
  endpoint: string
}): { isLoading: boolean; isError?: Error } => {
  const { id, endpoint } = props
  const dispatch = useAppDispatch()
  const queryState = useAppSelector((state) => querySelectors.selectById(state, id))
  const varEmbeddedQuery = queryState ? queryState.query : ''

  // query 内部の変数を置換する処理
  const query = varEmbeddedQuery.replace(pattern_embedded, '$1').trim()

  const { data, error } = useSWR<JSONResponse, Error>(
    query.length && isValidQuery(query) ? [query, endpoint] : null
  )

  useEffect(() => {
    if (data) {
      dispatch(resultUpdate({ id, data }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return {
    isLoading: !error && !data,
    isError: error
  }
}

const delay = 1000

export const useQueryUpdate = (props: {
  id: string
  name: string
}): [value: string, setValue: React.Dispatch<React.SetStateAction<string>>] => {
  const { id, name } = props

  // make RegExp: 大小区別しない＆一致した部分をすべて置換する
  const pattern = new RegExp(`{{${name}(==)?[^]*?}}`, 'gi')
  const [value, setValue] = useState('')
  const dispatch = useAppDispatch()
  const queryState = useAppSelector((state) => querySelectors.selectById(state, id))

  useEffect(() => {
    // cf. https://zenn.dev/luvmini511/articles/4924cc4cf19bc9
    // delay 後 debounce の対象 state をアップデート
    const timer = setTimeout(() => {
      if (queryState) {
        const replacedQuery = queryState.query.replace(pattern, `{{${name}==${value}}}`)
        dispatch(queryUpdated({ id, query: replacedQuery }))
      }
    }, delay)
    // 次の effect が実行される直前に timer キャンセル
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]) // value がアップデートするたびに effect 実行

  return [value, setValue]
}
