import { ParamOnEditableForm } from "@/components/form/edit/param"
import { selectFormVarById } from "@/components/form/formSlice"
import { RootState } from "@/store/rootReducer"
import { createFormProps, EditableFormProps, FormElement, generatedFormProps } from "@/types/form"
import React from "react"
import { shallowEqual, useSelector } from "react-redux"

const createForm: React.FC<createFormProps> = (props) => {
  const { formVarState, styleProps } = props

  if (!formVarState) {
    return null
  }

  const atType = formVarState.at

  // 子コンポネントに渡すpropsを作成
  const args = {
    formVarState: formVarState,
    styleProps: styleProps
  }
  // どの＠変数であっても，共通してformVariable状態に収める方針
  if (atType == "param") {
    return <ParamOnEditableForm {...args} />
  } else if (atType == "endpoint") {
    return null
    // return <EndpointOnEditableForm {...args} />
  } else if (atType == "proxy") {
    return null
    // return <ProxyOnEditableForm {...args} />
  } else if (atType == "author") {
    return null
    // return <AuthorOnEditableForm {...args} />
  } else if (atType == "title") {
    return null
    // return <TitleOnEditableForm {...args} />
  } else {
    // ここまで来れないはずだけどエラー回避のために書き残す
    return null
  }
}

const GenerateForm: React.FC<generatedFormProps> = (props) => {
  const { id, parent_id, styleProps } = props

  // FormVariable が更新されたときにはこのコンポネントも更新
  const formVarState = useSelector((state: RootState) => selectFormVarById(state.forms, id), shallowEqual)

  // useEffect内でローカルの状態を変化させるが，依存しているのはformVarStateなので無限ループは避けられる --------------
  const [generatedForm, setGeneratedForm] = React.useState<FormElement>()

  // formVarState の変化を取ることで無限ループを回避
  React.useEffect(() => {
    setGeneratedForm(createForm({ formVarState: formVarState, styleProps: styleProps }))

    // for debug
    console.log("[@GenerateForm] current formVarState is \n", formVarState)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formVarState]) // formVarState が変化したときだけ作用する

  return generatedForm ? generatedForm : null
}
// ---------------------------------------------------------------------------------------------------------------

// Form を分解して， 子コンポネントごとに生成する ------------------------------------------------------------------
export const EditableForm: React.FC<EditableFormProps> = (props) => {
  // Form.var が持つリストは childVarIdList / childOptIdList
  // FormVariable が持つ ID の一覧は formVarIds (get selected from `selectFormVarIds`)
  const { parent_id, childVarIdList, styleProps } = props

  const forms = childVarIdList.map((var_id, index) => {
    const args = { id: var_id, parent_id: parent_id, styleProps: styleProps }
    return <GenerateForm {...args} key={index} />
  })
  // forms が空ならnullを，そうでなければ生成したフォーム群を返す
  return forms.length ? <>{forms}</> : null
}
// --------------------------------------------------------------------------------------------------------------
