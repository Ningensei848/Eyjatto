import { selectFormById, selectFormVarById } from "@/components/form/formSlice"
import { RootState } from "@/store/rootReducer"
import { generatedFormProps, SearchFormProps } from "@/types/editor"
import { useSelector } from "react-redux"

const GenerateForm: React.FC<generatedFormProps> = (props) => {
  const { id, styleProps } = props
  const formVarState = useSelector((state: RootState) => selectFormVarById(state.forms, id))
  // どの＠変数であっても，共通してformVariable状態に収める方針
  // formVariable.atでどのフォーム型にするか決定
  if (!formVarState) {
    // Form.vars にはidがあるのに，FormVariable.idがないのは不整合
    // 何らかのエラーを返すべき
    return null
  }

  const type = formVarState.at

  if (type == "param") {
    // param
    return <></>
  } else if (type == "endpoint") {
    // endpoint
    return <></>
  } else if (type == "proxy") {
    // proxy
    return <></>
  } else if (type == "author") {
    // author
    return <></>
  } else {
    // title
    return <></>
  }
}

export const SearchForm: React.FC<SearchFormProps> = (props) => {
  const { id, styleProps } = props
  const formState = useSelector((state: RootState) => selectFormById(state.forms, id))

  const FormVariableIdList = formState ? formState.vars : []

  const forms = FormVariableIdList.map((var_id) => GenerateForm({ id: var_id, styleProps: styleProps }))
  // forms が空ならnullを，そうでなければ生成したフォーム群を返す
  return forms.length ? <>{forms}</> : null
}
