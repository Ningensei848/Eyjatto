type Id = import("@/types/common").Id

export interface Editor {
  id: Id
  // instance: CodeMirror.Editor // instance は持たせてはいけない `serializable`な値である必要がある
  query: string // Caution!! => editorState で持つのは Query, editor.localState で持つのは Value
  display: boolean
  editable: boolean
}

export interface EditorState {
  editors: import("@reduxjs/toolkit").EntityState<Editor>
}

// -----------------------------------------------------------------------------
// props -----------------------------------------------------------------------

export interface EditorProps {
  id?: Id
  query?: string
  mode?: "search" | "edit"
  endpoint?: string
  styleProps?: import("@/types/common").StylingProps
  config?: CodeMirror.EditorConfiguration // 後でextendして設定内容を追加
}

export interface extractAtMarkProps {
  parent_id: Id
  editorState: Editor | undefined
}

export interface extractDataProps {
  at: string
  line: string
  parent_id: string | number
  pattern: RegExp
}

export interface makeLineProps {
  formVariable: import("@/types/form").FormVariable | undefined
  formOption?: import("@/types/form").FormOption
}

export interface infuseFormProps extends makeLineProps {
  id: Id
  state: EditorState
}

export interface replaceLineProps extends makeLineProps {
  at: import("@/types/common").AtTypes
  line: string
}

export interface replaceQueryProps extends makeLineProps {
  query: string
}

export interface generatedFormProps {
  id: Id
  styleProps?: import("@/types/common").StylingProps
}

export interface SearchFormProps {
  id: Id
  styleProps?: import("@/types/common").StylingProps
}
