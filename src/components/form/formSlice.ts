// Creating the Initial State Slices cf. https://redux-toolkit.js.org/tutorials/advanced-tutorial#creating-the-initial-state-slices
import {
  addIdToFormList,
  deleteFormChilden,
  deleteFormList,
  upsertAtMarks
} from "@/components/form/lib/reduceFunctions"
import { AtMark } from "@/types/common"
import { Form, FormOption, FormState, FormVariable } from "@/types/form"
import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"

// Adaptors --------------------------------------------------
export const formVariableAdaptor = createEntityAdapter<FormVariable>({
  // Keep the "all IDs" array sorted based on id characters
  sortComparer: (alpha, beta) => {
    const [idAlpha, idBeta] = [alpha.id.toString(), beta.id.toString()]
    return idAlpha.localeCompare(idBeta)
  }
})
export const formOptionAdaptor = createEntityAdapter<FormOption>({
  // Keep the "all IDs" array sorted based on id characters
  sortComparer: (alpha, beta) => {
    const [idAlpha, idBeta] = [alpha.id.toString(), beta.id.toString()]
    return idAlpha.localeCompare(idBeta)
  }
})
export const formAdaptor = createEntityAdapter<Form>({
  // Keep the "all IDs" array sorted based on id characters
  sortComparer: (alpha, beta) => {
    const [idAlpha, idBeta] = [alpha.id.toString(), beta.id.toString()]
    return idAlpha.localeCompare(idBeta)
  }
})

// ---------------------------------------------
const initialState: FormState = {
  variables: formVariableAdaptor.getInitialState(),
  options: formOptionAdaptor.getInitialState(),
  forms: formAdaptor.getInitialState()
}

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // Form を登録する関数：
    setForm(state, action: PayloadAction<{ parent_id: string | number; atMarks: Array<AtMark> }>) {
      const { parent_id, atMarks } = action.payload
      // state と atMarks を引数として, atMarks が既に登録されているか確認し，FormVariable, FormOption を更新・追加し，そのリストのペアを返す関数
      const { varIdList, optIdList } = upsertAtMarks(state, atMarks)
      formAdaptor.upsertOne(state.forms, { id: parent_id, vars: varIdList, opts: optIdList })
    },
    // Form を削除する関数：同時に Form.vars, Form.opts 内の id を持つ FormVariable, FormOption も削除する
    removeForm(state, action: PayloadAction<string | number>) {
      const formState = state.forms.entities[action.payload]
      const args = {
        state: state,
        list: { var: formState ? formState.vars : [], opt: formState ? formState.opts : [] },
        adaptor: { var: formVariableAdaptor, opt: formOptionAdaptor }
      }
      deleteFormChilden(args) // 子の状態を削除してから
      formAdaptor.removeOne(state.forms, action.payload)
    },
    // FormVariable 登録する関数：同時に Form.vars 内に var_id を登録する
    setFormVariable(state, action: PayloadAction<FormVariable>) {
      // setFormVariable する際に，「それは本当に登録すべきなのか？」を検証する
      const { id, at, name, elem, parent_id } = action.payload
      const payload = {
        id: id,
        at: at,
        name: name,
        elem: elem,
        parent_id: parent_id
      }
      formVariableAdaptor.upsertOne(state.variables, payload)
      addIdToFormList({ ...payload, state: state, type: "vars" }) // Form.varsに対して，var_idがなければ追加する，もしあればスルー
    },
    // FormVariable を削除する関数：同時に Form.vars 内に登録してある紐付けIDも削除する
    removeFormVariable(state, action: PayloadAction<string | number>) {
      const id = action.payload
      const parent_id = state.variables.entities[id]?.parent_id
      const args = { id: id, parent_id: parent_id, state: state, type: "vars" }
      formVariableAdaptor.removeOne(state.variables, id)
      deleteFormList(args) // Form.varsに対して，var_idがあれば消去，なければスルー
      // opt も同時に削除
      formOptionAdaptor.removeOne(state.options, id)
      deleteFormList({ ...args, type: "opts" }) // Form.optsに対して，opt_idがあれば消去，なければスルー
    },
    // FormOption 登録する関数：同時に Form.opts 内に opt_id を登録する
    setFormOption(state, action: PayloadAction<FormOption>) {
      const { id, at, name, elem, parent_id } = action.payload
      const payload = {
        id: id,
        at: at,
        name: name,
        elem: elem,
        parent_id: parent_id
      }
      formOptionAdaptor.upsertOne(state.options, payload)
      addIdToFormList({ ...payload, state: state, type: "opts" }) // Form.optsに対して，opt_idがなければ追加する，もしあればスルー
    },
    // FormOptionを削除する関数：同時にForm.opts内に登録してある紐付けIDも削除する
    removeFormOption(state, action: PayloadAction<string | number>) {
      const id = action.payload
      const parent_id = state.options.entities[id]?.parent_id
      const args = { id: id, parent_id: parent_id, state: state, type: "opts" }
      formOptionAdaptor.removeOne(state.options, id)
      deleteFormList(args) // Form.optsに対して，opt_idがあれば消去，なければスルー
    }
  }
})

export const {
  setForm,
  removeForm,
  setFormVariable,
  removeFormVariable,
  setFormOption,
  removeFormOption
} = formSlice.actions

// cf. https://redux-toolkit.js.org/usage/usage-guide#using-selectors-with-createentityadapter
// Rename the exports for readability in component usage
export const {
  selectById: selectFormVarById,
  selectIds: selectFormVarIds,
  selectEntities: selectFormVarEntities,
  selectAll: selectAllFormVars,
  selectTotal: selectTotalFormVars
} = formVariableAdaptor.getSelectors<FormState>((state: FormState) => state.variables)

export const {
  selectById: selectFormOptById,
  selectIds: selectFormOptIds,
  selectEntities: selectFormOptEntities,
  selectAll: selectAllFormOpts,
  selectTotal: selectTotalFormOpts
} = formOptionAdaptor.getSelectors<FormState>((state: FormState) => state.options)

export const {
  selectById: selectFormById,
  selectIds: selectFormIds,
  selectEntities: selectFormEntities,
  selectAll: selectAllForms,
  selectTotal: selectTotalForms
} = formAdaptor.getSelectors<FormState>((state: FormState) => state.forms)

export default formSlice.reducer
