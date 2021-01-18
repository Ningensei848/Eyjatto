import { selectEditorById, setEditor } from "@/components/editor/editorSlice"
import { useExtractAtMarks } from "@/components/editor/lib/extractAtMarks"
import { setResult } from "@/components/resultSolution/resultSolutionSlice"
import d3sparql from "@/library/d3sparql"
import defineSparqlMode from "@/library/defineSparqlMode"
import { useAppDispatch } from "@/store"
import { RootState } from "@/store/rootReducer"
import { EditorProps } from "@/types/editor"
import CodeMirror from "codemirror"
import debounce from "lodash.debounce"
import React from "react"
import { Controlled as ReactCodeMirror } from "react-codemirror2"
import { useSelector, shallowEqual } from "react-redux"
// import styled from "styled-components"

const globalEditorConfig: CodeMirror.EditorConfiguration = {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tryQueryingAsync = async (sparql: string): Promise<any> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await d3sparql.query(sparql, "https://dbpedia.org/sparql")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return data
  } catch (err) {
    console.error(err)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return err
  }
}

export const Editor: React.FC<EditorProps> = (props) => {
  // TODO: globalEditorConfig, endpoint, queryConfig を活用して，tryQueryingAsyncにクエリの設定を流し込めるようにする．
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, query, mode, endpoint, styleProps, config } = props

  const dispatch = useAppDispatch()

  const inheritedValue = query ? query : "" // props.query OR blank
  // editorId is inherited from props.id OR set generated random ID
  // TODO: ユーザがすきなID を入力できるようにする -------------------------------------------------------------------
  // updateFormId みたいな reducer を editorState で定義する => form とかから実行させる ------------------------------
  const editorId = id ? id : `${Date.now().toString()}${Math.floor(Math.random() * 100)}`
  const editorState = useSelector((state: RootState) => selectEditorById(state.editor, editorId), shallowEqual)
  // ---------------------------------------------------------------------------------------------------------------
  // `value` はエディタのローカルな state , `currentEditorValue` は エディタのグローバルな 疑似state ------------------
  const [currentEditorValue, setCurrentValue] = React.useState(inheritedValue) // Editor.LocalState として保持しておく
  // ---------------------------------------------------------------------------------------------------------------
  // 1. formState をdispatch (editor.localState の変化は無視する) ---------------------------------------------------
  const atMarkProps = {
    parent_id: editorId,
    editorState: editorState,
    setLocal: setCurrentValue
  } // editorStateの状態に依存して，formStateを変化させる
  useExtractAtMarks(atMarkProps)
  // ---------------------------------------------------------------------------------------------------------------
  // 2. editor.LocalStateをdispatch (editor.localState の変化は無視する) --------------------------------------------
  // editorStateの状態に依存して，editor.localStateを変化させる
  React.useEffect(() => {
    setCurrentValue(editorState ? editorState.query : inheritedValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorState?.query])

  // ---------------------------------------------------------------------------------------------------------------
  // 3. editorState を debounceDispatch (editor.LocalStateに依存) --------------------------------------------------
  const delayMillisecond = 800 // deley time
  const getResult = debounce(async (localCurrentValue: string) => {
    dispatch(setEditor({ id: editorId, query: localCurrentValue }))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    dispatch(setResult({ id: editorId, data: await tryQueryingAsync(localCurrentValue) }))
  }, delayMillisecond)
  // getResultは描画ごとに変更されてしまうため第二引数から除外する（？）
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceQuery = React.useCallback(getResult, [])
  // ---------------------------------------------------------------------------------------------------------------

  // form initialization -------------------------------------------------------------------------------------------
  if (!editorState) {
    console.log(`[@editor.initialize] Initial query:\n${query ? query : "no query"}`)
    dispatch(setEditor({ id: editorId, query: inheritedValue }))
    return null
  }
  // ---------------------------------------------------------------------------------------------------------------
  // Render --------------------------------------------------------------------------------------------------------
  return (
    <ReactCodeMirror
      value={currentEditorValue}
      options={{
        mode: "application/sparql-query",
        lineNumbers: true,
        viewportMargin: Infinity
      }}
      defineMode={{
        name: "application/sparql-query",
        fn: () => defineSparqlMode(globalEditorConfig)
      }}
      onBeforeChange={(_e, _d, value) => {
        setCurrentValue(value)
      }}
      onChange={(_e, _d, value) => {
        void debounceQuery(value)
      }}
    />
  )
} // ---------------------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------------
