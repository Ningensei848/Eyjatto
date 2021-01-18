import EditorReducer from "@/components/editor/editorSlice"
import FormReducer from "@/components/form/formSlice"
import ResultReducer from "@/components/resultSolution/resultSolutionSlice"
import { combineReducers } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
  editor: EditorReducer,
  results: ResultReducer,
  forms: FormReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
