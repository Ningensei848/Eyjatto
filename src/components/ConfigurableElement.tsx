import InputBase from '@mui/material/InputBase'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import NativeSelect from '@mui/material/NativeSelect'
import ListIcon from '@mui/icons-material/FormatListBulleted'
import { useQueryUpdate } from '~/src/libs'
import type { FormElement } from '~/src/types'
import type { ReactNode } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

const pattern_textinput = /^input|^text(input)?/i
const pattern_selector = /^select([oe]r)?/i
const pattern_autocomplete = /^complete|^auto(complete)?/i

interface ConfigurableFormProps {
    query: string
    config: FormElement
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

const InputForm = (inputProps: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    [key: string]: unknown
}) => (
    <InputBase
        sx={{ ml: 1, flex: 1 }}
        inputProps={inputProps}
        startAdornment={
            <InputAdornment position="start">
                <SearchIcon />
            </InputAdornment>
        }
    />
)

const SelectForm = (props: {
    children: ReactNode
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    [key: string]: unknown
}) => {
    const { value, onChange, children } = props
    return (
        <NativeSelect
            value={value}
            onChange={onChange}
            input={
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    startAdornment={
                        <InputAdornment position="start">
                            <ListIcon />
                        </InputAdornment>
                    }
                />
            }
        >
            {children}
        </NativeSelect>
    )
}

const getOptions = (keywords: Array<string | number>): JSX.Element[] =>
    keywords.map((k, idx) => {
        return (
            <option key={idx} value={k}>
                {k}
            </option>
        )
    })

const ConfigurableElement = (props: ConfigurableFormProps): JSX.Element => {
    const { query, setQuery } = props
    const { element, param } = props.config
    const { name, keywords } = param

    const attributes =
        Object.prototype.hasOwnProperty.call(param, 'attributes') && typeof param.attributes !== 'undefined'
            ? param.attributes
            : {}
    // 埋め込むべき値を取得する <= from keywords
    const keywordList = Array.isArray(keywords) ? keywords : []
    // value が更新されたら遅れて query も更新する
    const initialValue = keywordList.length ? keywordList[0] : ''
    const [value, setValue] = useQueryUpdate({ variable: name, initialValue, query, setQuery })

    // element によって，どのフォームを生成するか分岐
    // 'textInput', 'selector', 'autocomplete' and more
    if (pattern_textinput.test(element)) {
        const inputProps = {
            ...attributes,
            value,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
        }
        return <InputForm {...inputProps} />
    } else if (pattern_selector.test(element)) {
        const selectProps = {
            ...attributes,
            value,
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setValue(e.target.value),
        }
        return <SelectForm {...selectProps}>{getOptions(keywordList)}</SelectForm>
    } else if (pattern_autocomplete.test(element)) {
        const connectionId = `autocomplete-${name}`
        const autoconmpleteProps = {
            ...attributes,
            list: connectionId,
            value,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
        }

        return (
            <>
                <InputForm {...autoconmpleteProps} />
                <datalist id={connectionId}>{getOptions(keywordList)}</datalist>
            </>
        )
    } else {
        // warning
        console.error('Unknown element! errror occured...')
        return <CircularProgress />
    }
}

export default ConfigurableElement
