// Creating the Initial State Slices cf. https://redux-toolkit.js.org/tutorials/advanced-tutorial#creating-the-initial-state-slices

import { infuseFormStates } from "@/components/editor/lib/reduceFunctions"
import { Editor, EditorState, Id } from "@/types/editor"
import { FormOption, FormVariable } from "@/types/form"
import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"

export const editorAdaptor = createEntityAdapter<Editor>({
  // Keep the "all IDs" array sorted based on id characters
  sortComparer: (alpha, beta) => {
    const [idAlpha, idBeta] = [alpha.id.toString(), beta.id.toString()]
    return idAlpha.localeCompare(idBeta)
  }
})

// --------------------------------------------
const initialState: EditorState = {
  editors: editorAdaptor.getInitialState()
}

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    // Editor を登録する関数
    setEditor(state, action: PayloadAction<{ id: string | number; query: string }>) {
      const { id, query } = action.payload
      const editorState = state.editors.entities[id]
      const [display, editable] = editorState ? [editorState.display, editorState.editable] : [true, true]
      editorAdaptor.upsertOne(state.editors, { id: id, query: query, display: display, editable: editable })
    },
    // FormVariable / FormOption を引数にとって， AtMark 部分を置換する関数 FormOption, FormVariabl
    replaceEditor(
      state,
      action: PayloadAction<{ id: Id; formVariable: FormVariable | undefined; formOption?: FormOption }>
    ) {
      infuseFormStates({ state: state, ...action.payload })
    },
    // Editor を削除する関数
    removeEditor(state, action: PayloadAction<string>) {
      editorAdaptor.removeOne(state.editors, action.payload)
    }
  }
})

export const { setEditor, replaceEditor, removeEditor } = editorSlice.actions

// cf. https://redux-toolkit.js.org/usage/usage-guide#using-selectors-with-createentityadapter
// Rename the exports for readability in component usage
export const {
  selectById: selectEditorById,
  selectIds: selectEditorIds,
  selectEntities: selectEditorEntities,
  selectAll: selectAllEditors,
  selectTotal: selectTotalEditors
} = editorAdaptor.getSelectors<EditorState>((state: EditorState) => state.editors)

export default editorSlice.reducer
