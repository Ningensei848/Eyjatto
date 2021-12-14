import { useState, useEffect, useMemo } from 'react'
import ReactCodeMirror from '@uiw/react-codemirror'
import { StreamLanguage } from '@codemirror/stream-parser'
import { sparql } from '@codemirror/legacy-modes/mode/sparql'

import { CodeMirrorTheme } from 'libs/codemirror'
import { useAppDispatch, useAppSelector } from 'libs/hooks'
import { querySelectors, queryUpdated } from 'stores/sparqlQuerySlice'

const delay = 1000

const QueryEditable = (props: { id: string }): JSX.Element => {
  const { id } = props
  const dispatch = useAppDispatch()
  const queryState = useAppSelector((state) => querySelectors.selectById(state, id))
  const varEmbeddedQuery = queryState ? queryState.query : ''
  const [value, setValue] = useState(varEmbeddedQuery)

  // debounce update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (queryState) {
        dispatch(queryUpdated({ id, query: value }))
      }
    }, delay)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const CodeMirror = useMemo(
    () => (
      <ReactCodeMirror
        value={varEmbeddedQuery}
        height='50vh'
        width='100%'
        extensions={[CodeMirrorTheme, StreamLanguage.define(sparql)]}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onChange={(txt, _viewUpdate) => setValue(txt)}
      />
    ),
    [varEmbeddedQuery]
  )

  return <>{CodeMirror}</>
}

export default QueryEditable
