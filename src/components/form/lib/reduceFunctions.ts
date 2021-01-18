import { formOptionAdaptor, formVariableAdaptor } from "@/components/form/formSlice"
import { AtMark } from "@/types/common"
import { FormChildIds, formChildrenProps, FormState, operateFormStateProps, SearchUpdateResult } from "@/types/form"
import { isFormOptionName } from "@/util/validation"

export const addIdToFormList = (props: operateFormStateProps): void => {
  const { id, parent_id, type, state } = props
  const formState = parent_id ? state.forms.entities[parent_id] : undefined

  if (!parent_id || !formState) {
    return // 何もしない
  }

  if (type == "vars") {
    // Form.varsに対して，var_idがなければ追加する，もしあればスルー
    const formList = formState.vars
    state.forms.entities[parent_id] = formList.includes(id) ? formState : { ...formState, vars: formList.concat(id) }
  } else if (type == "opts") {
    // Form.optsに対して，opt_idがなければ追加する，もしあればスルー
    const formList = formState.opts
    state.forms.entities[parent_id] = formList.includes(id) ? formState : { ...formState, opts: formList.concat(id) }
  }
}

export const deleteFormList = (props: operateFormStateProps): void => {
  // removeFormVariable / removeFormOption にて，
  // state.variables.entities[id]?.parent_id は `string | number | undefined` になってしまう
  const { id, parent_id, type, state } = props
  const formState = parent_id ? state.forms.entities[parent_id] : undefined

  // ので，上意に合わせて operateFormStateProps を変更するが，この if 分岐で型ガードできる．
  if (!parent_id || !formState) {
    return // 何もしない
  }

  const outExistentId = (existentId: string | number): boolean => {
    // cf. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Parameters
    // 既存のIDとvar_idが一致したらFalseを返す(filter関数にtrue を返した要素は残され、false を返した要素は取り除かれる)
    return existentId == id ? false : true
  }

  if (type == "vars") {
    // Form.varsに対して，var_idがあれば消去，なければスルー
    const formList = formState.vars
    state.forms.entities[parent_id] = formList.includes(id)
      ? { ...formState, vars: formList.filter(outExistentId) }
      : formState
  } else if (type == "opts") {
    // Form.optsに対して，opt_idがあれば消去，なければスルー
    const formList = formState.opts
    state.forms.entities[parent_id] = formList.includes(id)
      ? { ...formState, opts: formList.filter(outExistentId) }
      : formState
  }
}

export const deleteFormChilden = (props: formChildrenProps): void => {
  const { state, list, adaptor } = props
  const [formVariableAdaptor, formOptionAdaptor] = [adaptor.var, adaptor.opt]

  const deleteCandidateIds = Array.from(new Set(list.var.concat(list.opt)))
  for (const id of deleteCandidateIds) {
    formVariableAdaptor.removeOne(state.variables, id)
    formOptionAdaptor.removeOne(state.options, id)
  }
}

const searchUpdates = (state: FormState, atMark: AtMark): SearchUpdateResult => {
  // TODO: update という名前を変える（新規登録にもUPDATEになっていて認識が食い違うため）
  const { var_name, var_elem, opt_name, opt_elem, parent_id } = atMark

  const idList = state.variables.ids

  if (!idList.length) {
    return { var_update: null, opt_update: null }
  }

  for (const id of idList) {
    const varEntity = state.variables.entities[id]
    if (varEntity?.parent_id !== parent_id) {
      // varEntity.parent_id が無い，もしくは parent_id と一致しない場合は次へ (continue)
      continue
    } else {
      // parent_id が存在し一致した場合，次に var_name の有無を検証する
      if (varEntity?.name !== var_name) {
        // var_name が異なっていれば次へ (continue)
        continue
      } else {
        if (opt_name && isFormOptionName(opt_name) && typeof opt_elem === "string") {
          return {
            var_update: { id: id, changes: { name: var_name, elem: var_elem } },
            opt_update: { id: id, changes: { name: opt_name, elem: opt_elem } }
          }
        } else {
          return {
            var_update: { id: id, changes: { name: var_name, elem: var_elem } },
            opt_update: null
          }
        }
      }
    }
  }
  return { var_update: null, opt_update: null }
}

export const upsertAtMarks = (state: FormState, atMarks: Array<AtMark>): FormChildIds => {
  // state と atMarks を引数として, atMarks が既に登録されているか確認し，FormVariable, FormOption を更新・追加し，そのIDリストのペアを返す関数
  // まずは parent_id を持つ FormVariable を探してくる
  // 次に， var_name が一致している物を探す => 一致していれば更新する
  // 次に，・・・

  const formVar_idList: Array<string | number> = []
  const formOpt_idList: Array<string | number> = []

  const updateFormElements = (atMark: AtMark): boolean => {
    // ------ `formVar_idList`, `formOpt_idList` and `state` is **global** object. ---------
    const { var_update, opt_update } = searchUpdates(state, atMark)
    // 呼び出し元で .filter() を使っていることに留意
    if (var_update && opt_update) {
      formOptionAdaptor.upsertOne(state.options, {
        id: opt_update.id,
        at: atMark.at,
        name: opt_update.changes.name,
        elem: opt_update.changes.elem,
        parent_id: atMark.parent_id
      })
      formOpt_idList.push(opt_update.id)
      formVariableAdaptor.updateOne(state.variables, var_update)
      formVar_idList.push(var_update.id)
      // 更新に使われたのでこの atMark は用済みとなり false を返す
      return false
    } else if (var_update && !opt_update) {
      formOptionAdaptor.removeOne(state.options, var_update.id)
      formVariableAdaptor.updateOne(state.variables, var_update)
      formVar_idList.push(var_update.id)
      // 更新に使われたのでこの atMark は用済みとなり false を返す
      return false
    } else {
      // 更新に使われなかったのでこの atMark は次の別の関数に引き渡すために残しておく (true を返す)
      return true
    }
  }

  // parent_id が一致している FormVariable を探し，さらに var_name が一致していれば FormVariable, FormOption を更新する．
  // 更新された場合は false, 何も処理が怒らなかった場合は true を返す (for filtering)
  atMarks
    .filter((atMark) => updateFormElements(atMark))
    // 更新処理がなかった atMark については，新規登録する．
    .map((newAtMark) => {
      const { at, var_name, var_elem, opt_name, opt_elem, parent_id } = newAtMark
      const id = `${Date.now().toString()}${Math.floor(Math.random() * 100)}`
      const base = {
        id: id, // random generated,
        at: at,
        parent_id: parent_id
      }

      if (opt_name && typeof opt_elem === "string") {
        formOptionAdaptor.upsertOne(state.options, { ...base, name: opt_name, elem: opt_elem })
        formOpt_idList.push(id)
        formVariableAdaptor.upsertOne(state.variables, { ...base, name: var_name, elem: var_elem })
        formVar_idList.push(id)
      } else {
        formVariableAdaptor.upsertOne(state.variables, { ...base, name: var_name, elem: var_elem })
        formVar_idList.push(id)
      }
    })

  // 最終的に，1. 更新されたもの 2. 追加されたもの に関する Id のリストが返される．
  return { varIdList: formVar_idList, optIdList: formOpt_idList }
}
