import { EditableForm } from "@/components/form/edit"
import { selectFormById } from "@/components/form/formSlice"
import { RootState } from "@/store/rootReducer"
import { FormMode, GeneratedFormProps } from "@/types/form"
import { isFormMode } from "@/util/validation"
import React from "react"
import { shallowEqual, useSelector } from "react-redux"

// FormState に依存して フォームコンポネントをつくる
// FormState 自体は，Editor の globalState に依存している
export const GeneratedForm: React.FC<GeneratedFormProps> = (props) => {
  // TODO: まだ@param しか処理ができていないので，少なくともendpointについても処理を書く
  // TODO: className についても活用する
  const { parent_id, mode, styleProps } = props
  const formMode: FormMode = isFormMode(mode) ? mode : "search" // default mode is `search`
  // FormVariable / FormOption が追加・削除されたとき，あるいは FormState が削除されたときに更新される
  const formState = useSelector((state: RootState) => selectFormById(state.forms, parent_id), shallowEqual)

  // formState が存在していないときは何も表示しない ------------------------------------------------------------
  if (!formState) {
    console.log("[@Forms.initialize] formState is `undefined`.")
    return null
  }
  // for debug
  console.log("[@Forms] current formState is \n", formState)
  // --------------------------------------------------------------------------------------------------------
  // formMode によって出力するコンポネントを切り替える ----------------------------------------------------------
  if (formMode == "edit") {
    // 編集用
    const args = {
      parent_id: parent_id,
      childVarIdList: formState.vars, // childVarIdList is "Superset" of childOptIdList
      styleProps: styleProps
    }
    return <EditableForm {...args} />
  } else if (formMode == "search") {
    // 検索GUI用
    return null
    // return <SearchForm id={props.parent_id} className={props.className} /> //query={editorValue}
  } else {
    // ここには来れないはずだけど，型ガードが甘いのでエラーが出る．それを回避するために記述しておく．
    return null
  }
}
