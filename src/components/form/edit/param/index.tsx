import { replaceEditor } from "@/components/editor/editorSlice"
import { TextInputEditable } from "@/components/form/edit/param/textInput"
import { selectFormOptById } from "@/components/form/formSlice"
import { useAppDispatch } from "@/store"
import { RootState } from "@/store/rootReducer"
import { createFormElemProps, FormElement, paramEditableProps } from "@/types/form"
import React from "react"
import { shallowEqual, useSelector } from "react-redux"

const createFormElement: React.FC<createFormElemProps> = (props) => {
  // 状態： formVarState, formOptState を上位コンポネントから継承
  const { formVarState, formOptState, styleProps } = props
  const { id, at, name, elem, parent_id } = formVarState

  const baseArgs = {
    id: id,
    at: at,
    formVariable: { name: name, elem: elem },
    parent_id: parent_id,
    styleProps: styleProps
  }

  if (!formOptState) {
    // formOption が存在しない場合 => textinput を返して終了
    return <TextInputEditable {...baseArgs} />
  } else {
    // formOption が存在する場合 => 中身を見て分岐
    const opt_name = formOptState.name
    const opt_elem = formOptState.elem
    const args = { ...baseArgs, formOption: { name: formOptState.name, elem: opt_elem } }
    if (opt_name == "textinput") {
      return <TextInputEditable {...args} />
    } // and more ...
  }
  // ここには来れないはずだけど，型ガードが甘いのでエラーが出る．それを回避するために記述しておく．
  return null
}

export const ParamOnEditableForm: React.FC<paramEditableProps> = (props) => {
  // 状態：formVarState を上位から継承，formOptState を作成，localState として formElement も作成
  const { formVarState, styleProps } = props
  const { id, parent_id } = formVarState

  const dispatch = useAppDispatch()

  const formOptState = useSelector((state: RootState) => selectFormOptById(state.forms, id), shallowEqual)

  // global な formOptState が変化したら，それを formOptState.Local に反映する
  // local への反映と同時に再度このコンポネントが読み込まれるが，useEffect 内の処理は発火しない (無限ループの回避)

  // formOptState.Local の初期値は null ----------------------------------------------------------------------
  const [formElement, setFormElement] = React.useState<FormElement>()
  React.useEffect(() => {
    const args = {
      formVarState: formVarState,
      formOptState: formOptState,
      styleProps: styleProps
    }
    setFormElement(createFormElement(args))

    if (!formOptState) {
      dispatch(replaceEditor({ id: parent_id, formVariable: formVarState }))
    } else {
      dispatch(replaceEditor({ id: parent_id, formVariable: formVarState, formOption: formOptState }))
    }

    // for debug
    console.log("[@ParamOnEditableForm] current formOptState is \n", formOptState)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formOptState, formVarState])

  return formElement ? formElement : null
}
// ----------------------------------------------------------------------------------------------------------
