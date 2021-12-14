import { CircularProgress } from '@mui/material'

import { hasOwnProps } from 'libs/common'
import { useQueryUpdate } from 'libs/hooks'

import InputForm from './parts/Input'
import SelectForm from './parts/Select'

import type { FormElement } from 'types/eyjatto'
import { useEffect, useMemo } from 'react'

const pattern_textinput = /^input|^text(input)?/i
const pattern_selector = /^select([oe]r)?/i
const pattern_autocomplete = /^complete|^auto(complete)?/i

const getInitialValue = (keywords: Record<string, string> | string[]) => {
  if (Array.isArray(keywords)) {
    return keywords.length ? keywords[0] : ''
  } else {
    const keys = Object.keys(keywords)
    return keys.length ? keywords[keys[0]] : ''
  }
}

const getOptions = (keywords: Record<string, string> | string[]): JSX.Element[] => {
  if (Array.isArray(keywords)) {
    return keywords.map((k, idx) => (
      <option key={idx} value={k}>
        {k}
      </option>
    ))
  } else {
    const keys = Object.keys(keywords)
    return keys.map((k, idx) => (
      <option key={idx} value={keywords[k]}>
        {k}
      </option>
    ))
  }
}

const ConfigurableElement = (props: { id: string; config: FormElement }): JSX.Element => {
  const { id, config } = props
  const { element, param } = config
  const { name, keywords } = param

  // 変数に対して useMemo を使うことで，コンポネントの読み込みのたびに再計算されるのを防ぐ
  const initialValue = useMemo(() => getInitialValue(keywords), [keywords])
  const options = useMemo(() => getOptions(keywords), [keywords])
  const attributes = useMemo(
    () =>
      hasOwnProps(param, 'attributes') && typeof param.attributes !== 'undefined'
        ? param.attributes
        : {},
    [param]
  )
  // value が更新されたら遅れて query も更新する
  const [value, setValue] = useQueryUpdate({ id, name })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setValue(initialValue), [])

  // element によって，どのフォームを生成するか分岐
  // 'textInput', 'selector', 'autocomplete' and more
  if (pattern_textinput.test(element)) {
    const inputProps = {
      ...attributes,
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    }
    return <InputForm {...inputProps} />
  } else if (pattern_selector.test(element)) {
    const selectProps = {
      ...attributes,
      value,
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setValue(e.target.value)
    }
    return <SelectForm {...selectProps}>{options}</SelectForm>
  } else if (pattern_autocomplete.test(element)) {
    const connectionId = `autocomplete-${name}`
    const autoconmpleteProps = {
      ...attributes,
      list: connectionId,
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
    }

    return (
      <>
        <InputForm {...autoconmpleteProps} />
        <datalist id={connectionId}>{options}</datalist>
      </>
    )
  } else {
    // warning
    console.error('Unknown element! errror occured...')
    return <CircularProgress />
  }
}

export default ConfigurableElement
