import { selectResultById, setResult } from "@/components/resultSolution/resultSolutionSlice"
import { useAppDispatch } from "@/store"
import { RootState } from "@/store/rootReducer"
import { ResultSolutionProps } from "@/types/resultSolution"
import { EditorConfiguration } from "codemirror"
import React from "react"
import { Controlled as ReactCodeMirror } from "react-codemirror2"
import { useSelector } from "react-redux"
// import styled from "styled-components"

const onBrowserLoadOnce = (
  loaded: boolean,
  callback: { (value: React.SetStateAction<boolean>): void; (arg: boolean): void }
): void => {
  // cf. https://jaketrent.com/post/render-codemirror-on-server/
  // if 1. not loaded yet, 2. window is defined and 3. window.navigator is defined,
  // then we will load scripts
  if (!loaded && typeof window !== "undefined" && typeof window.navigator !== "undefined") {
    require("codemirror/mode/javascript/javascript")
    callback(true)
  }
}

export const ResultSolution: React.FC<ResultSolutionProps> = (props) => {
  const dispatch = useAppDispatch()
  const [modeLoaded, setModeLoaded] = React.useState(false)
  onBrowserLoadOnce(modeLoaded, setModeLoaded)
  const { id, styleProps } = props

  const result = useSelector((state: RootState) => selectResultById(state.results, id))

  const options: EditorConfiguration = {
    readOnly: true, // <--------- Do not Edit
    theme: "material",
    mode: "application/ld+json",
    lineNumbers: true,
    viewportMargin: Infinity
  }

  if (result) {
    return (
      <ReactCodeMirror
        value={JSON.stringify(result, null, 2)}
        options={options}
        onBeforeChange={(_e, _d, value) => {
          // setCurrentValue(value)
          dispatch(setResult(JSON.parse(value)))
        }}
      />
    )
  } else {
    return null
  }
}
