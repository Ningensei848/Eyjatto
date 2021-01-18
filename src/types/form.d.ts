// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import { formModeList, formNameList } from "@/util/nameList"

// cf. TypeScript array to string literal type https://stackoverflow.com/questions/45251664/typescript-derive-union-type-from-tuple-array-values
export type FormMode = typeof formModeList[number]
export type FormNameList = typeof formNameList[number]

type Id = import("@/types/common").Id
type AtTypes = import("@/types/common").AtTypes

export interface FormKeyValue {
  name: string
  elem: string | string[]
}

export interface FormVariable {
  id: Id // random generated value (e.g. Date.now())
  at: "param" | "endpoint" | "proxy" | "author" | "title"
  name: string
  elem: string | string[]
  parent_id: Id
}
export interface FormOption {
  id: Id // same as FormVariable.id
  at: "param" | "endpoint" | "proxy" | "author" | "title"
  name: string
  elem: string | string[]
  parent_id: Id
}

export interface Form {
  id: Id // inherited value (props.id)
  vars: Array<Id>
  opts: Array<Id>
}

export interface FormState {
  variables: import("@reduxjs/toolkit").EntityState<FormVariable>
  options: import("@reduxjs/toolkit").EntityState<FormOption>
  forms: import("@reduxjs/toolkit").EntityState<Form>
}

export interface SearchUpdateResult {
  var_update: {
    id: Id
    changes: FormKeyValue // { name: string; elem: string | string[] }
  } | null
  opt_update: {
    id: Id
    changes: FormKeyValue // { name: string; elem: string | string[] }
  } | null
}

export interface FormChildIds {
  varIdList: Array<Id>
  optIdList: Array<Id>
}

export type FormElement = React.ReactElement<any, any> | null

export interface GeneratedFormProps {
  parent_id: Id
  mode?: FormMode
  styleProps?: import("@/types/common").StylingProps
}

export interface GeneratedHTMLProps {
  id: Id
  at: AtTypes // 'param' | 'endpoint' | 'proxy' | 'author' | 'title'
  formVariable: FormKeyValue
  formOption?: FormKeyValue
  parent_id: Id
  styleProps?: import("@/types/common").StylingProps
}

export interface operateFormStateProps {
  id: Id
  parent_id: Id | undefined
  type: string
  state: FormState
}

export interface formChildrenProps {
  state: FormState
  list: { var: Array<Id>; opt: Array<Id> }
  adaptor: {
    var: import("@reduxjs/toolkit").EntityAdapter<FormVariable>
    opt: import("@reduxjs/toolkit").EntityAdapter<FormOption>
  }
}

export interface reflectChangeProps {
  id: Id
  at: AtTypes
  variable: FormKeyValue
  option?: FormKeyValue
  dispatch: import("@/store").AppDispatch
  parent_id: Id
}

export interface createFormProps {
  formVarState: FormVariable | undefined
  styleProps?: import("@/types/common").StylingProps
}

export interface EditableFormProps {
  parent_id: Id
  childVarIdList: Array<string | number> // childVarIdList is "Superset" of childOptIdList
  styleProps?: import("@/types/common").StylingProps
}

export interface generatedFormProps {
  id: Id
  parent_id: Id // formState側からEditorState.valueを変更するときに必要
  styleProps?: import("@/types/common").StylingProps
}

export interface paramEditableProps {
  formVarState: FormVariable
  styleProps?: import("@/types/common").StylingProps
}

export interface createFormElemProps extends paramEditableProps {
  formOptState: FormOption | undefined
}
