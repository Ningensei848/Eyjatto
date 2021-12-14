import { useState, useEffect, useMemo } from 'react'
// codemirror6 sample => https://codesandbox.io/s/fptvu
import ReactCodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'

import { CodeMirrorTheme } from 'libs/codemirror'
import { useAppDispatch, useAppSelector } from 'libs/hooks'
import { formConfigSelectors, formConfigUpdated } from 'stores/formConfigSlice'
import { eyjattoConfigIsValid as isValid, eyjattoConfigParse as parse } from 'libs/validator'

const delay = 1000
const whitespace = ' '

const FormConfigEditable = (props: { id: string }): JSX.Element => {
  const { id } = props
  const dispatch = useAppDispatch()
  const formConfigState = useAppSelector((state) => formConfigSelectors.selectById(state, id))
  const config = formConfigState ? formConfigState.config : ''

  const [value, setValue] = useState(config && JSON.stringify(config, null, whitespace.repeat(4)))

  // debounce update
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formConfigState) {
        const newConfig = parse(value)
        if (isValid(newConfig)) dispatch(formConfigUpdated({ id, config: newConfig }))
      }
    }, delay)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const CodeMirror = useMemo(
    // TODO: show message on panel | cf. https://codemirror.net/6/examples/panel/
    () => (
      <ReactCodeMirror
        value={JSON.stringify(config, null, whitespace.repeat(4))}
        height='60vh'
        theme='light' // or dark
        extensions={[CodeMirrorTheme, json()]}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onChange={(txt, _viewUpdate) => setValue(txt)}
      />
    ),
    [config]
  )

  return <>{CodeMirror}</>
}

export default FormConfigEditable
