import {
  GeneratedHTMLProps,
  StylingProps
} from "@/components/form/lib/node_modules/@/types/node_modules/~/src/features/form/types"
import { Id } from "@/components/form/lib/node_modules/~/src/common/types"
import { selectFormVarById } from "@/components/form/lib/node_modules/~/src/features/form/formSlice"
import { useAppDispatch } from "@/components/form/lib/node_modules/~/src/store"
import cssesc from "cssesc"
import React from "react"
import { shallowEqual, useSelector } from "react-redux"
import styled from "styled-components"

// import { useInfuseAtMark } from '~/src/features/form/common/InfuseAtMark'
import { jsonParse } from "~/src/features/form/common/equipments"
import { reflectChanges } from "~/src/features/form/common/reflectChange"
import { RootState } from "~/src/store/rootReducer"

const makeAutoComplete = (id: Id, arr: Array<string>): JSX.Element => {
  if (!arr.length) {
    return <></>
  } else {
    return (
      <datalist id={id.toString()}>
        {arr.map((word, index) => {
          if (word) {
            return <option value={word} key={index} />
          } else return
        })}
      </datalist>
    )
  }
}

interface convertOptionProps {
  opt_elem: string | string[]
  varCandList: string[]
  id: Id
}

interface optionConvertedResult {
  optionalProperties: {
    list: Id
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
  autocomplete: JSX.Element
}

const convertOption = (props: convertOptionProps): optionConvertedResult => {
  const { opt_elem, varCandList, id } = props
  // option.elem が配列であれば，そのままオートコンプリートの候補に追加
  // option.elem が文字列であれば，一旦JSONでパースしてみる（エラーが出たら空の連想配列を返す）
  const parsedOptionElem = Array.isArray(opt_elem) ? opt_elem : jsonParse(opt_elem)
  // JSON.parse の結果，配列であれば，そのままオートコンプリートの候補に追加
  // JSON.parse の結果，文字列 / 連想配列だったら？ => JSON.parse は syntax から外れていた場合エラー（Array / Object しか返さない）
  const candidateListInOpt = Array.isArray(parsedOptionElem) ? varCandList.concat(parsedOptionElem) : varCandList
  // -------------------------------------------------------------------------------------------------------------------------------
  // JSON.parse の結果，連想配列であった場合は inputに対する HTML 属性とみなし， htmlProps として注入 ----------------------------------
  return {
    // overwrite with `list`
    // TODO: HTML Form ごとに適用可能な optionalProperties は異なる => フォームごとのバリデータを定義する
    optionalProperties: Array.isArray(parsedOptionElem) ? { list: id } : { ...parsedOptionElem, list: id },
    autocomplete: makeAutoComplete(id, candidateListInOpt)
  }
}

interface styledTextInputProps {
  htmlProps: { [key: string]: any }
  styleProps?: StylingProps
}

const cssEscape = (styleProps: StylingProps | undefined): string => {
  // TODO: "\A " とか言うのが邪魔しているが，それ以外は上手く行ってそう，治す
  if (styleProps && typeof styleProps.textInput === "string") {
    const hoge = styleProps.textInput
      ?.split("\n")
      .map((line) => line.trim())
      .join(" ")
    console.log("[@cssEscape] cssEscape is", cssesc(hoge))
    return cssesc(hoge)
  } else {
    return ""
  }
}

const StyledTextInput = styled.input.attrs((props: styledTextInputProps) => ({
  name: props.htmlProps.name,
  value: props.htmlProps.value,
  onChange: props.htmlProps.onChange,
  ...props.htmlProps
}))`
  ${(props: styledTextInputProps) => cssEscape(props.styleProps)}
`
// /* ${(props) => cssesc(props.styleProps?.textInput)} */

export const TextInputEditable: React.FC<GeneratedHTMLProps> = (props) => {
  // TODO: Autocomplete 候補についても状態として追っておく？var_elem に配列を許容したい
  const { id, at, formVariable, formOption, parent_id, styleProps } = props
  // console.log('[@TextInputEditable] styleProps is', cssesc(styleProps ? styleProps.textInput: ''), {wrap: true})
  const [var_name, var_elem] = [formVariable.name, jsonParse(formVariable.elem)]

  const dispatch = useAppDispatch()

  // textinputのvarに配列が与えられた時，0番目を初期値とし，それ以外を候補として提示する -----------------------------------
  const temp = Array.isArray(var_elem) ? var_elem[0] : var_elem
  const defValue = temp ? temp : ""
  const [textInputValue, setTextInputValue] = React.useState<string>(defValue)

  // for autocomplete -------------------------------------------------------------------------------------------------
  const temporaryId = [defValue, Date.now().toString(), Math.floor(Math.random() * 100)].join("_")
  // variable.elem が配列として与えられていればそれをそのままオートコンプリートの候補に追加
  // variable.elem 単なる文字列として与えられていれば， Array<string> に変換してオートコンプリートの候補に追加
  const candidateListInVar = Array.isArray(var_elem) ? var_elem : [defValue]
  const autocomplete = makeAutoComplete(temporaryId, candidateListInVar)
  // ------------------------------------------------------------------------------------------------------------------

  const baseArgs = {
    id: id,
    at: at,
    dispatch: dispatch,
    parent_id: parent_id
  }

  // formVarState の変更を受け取って， form.LocalState を更新する
  const formVariableElem = useSelector((state: RootState) => {
    const formVarState = selectFormVarById(state.forms, id)
    return formVarState ? formVarState.elem : undefined
  }, shallowEqual)

  React.useEffect(() => {
    if (formVariableElem) {
      const tempElem = jsonParse(formVariableElem)
      const var_elem = Array.isArray(tempElem) ? tempElem[0] : tempElem.value
      // TODO: [object Object] の表示を消す
      setTextInputValue(var_elem)
    }
  }, [formVariableElem])

  // form.LocalState の変更を受け取って， global な FormVariable / FormOption を更新する
  const debounceReflectChanges = React.useCallback(reflectChanges, [])

  const textInputProps = {
    name: var_name,
    value: textInputValue,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value
      setTextInputValue(inputValue)
      debounceReflectChanges({ ...baseArgs, variable: { name: var_name, elem: inputValue } }) // overwrite
    }
  }

  // formOption がない場合 -----------------------------------------------------------------------------------------
  if (!formOption) {
    // シンプルなテキストインプットを返す
    return (
      <>
        <StyledTextInput htmlProps={textInputProps} styleProps={styleProps} />
        {autocomplete}
      </>
    )
  } else {
    // formOption がある場合
    const { optionalProperties, autocomplete } = convertOption({
      opt_elem: formOption.elem,
      varCandList: candidateListInVar,
      id: temporaryId
    })

    // overwrite with `textInputPropsDefault` (default config)
    // cf. サポート HTML 属性の一覧 | React.js (https://ja.reactjs.org/docs/dom-elements.html#all-supported-html-attributes)
    const htmlProps = { ...optionalProperties, ...textInputProps }
    // -------------------------------------------------------------------------------------------------------------------------------
    return (
      <>
        <StyledTextInput htmlProps={htmlProps} styleProps={styleProps} />
        {autocomplete}
      </>
    )
  }
  // ----------------------------------------------------------------------------------------------------------------------------------
}
