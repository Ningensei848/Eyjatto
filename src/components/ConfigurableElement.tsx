import { FormElement } from '~/src/types'
import { useQueryUpdate } from '~/src/libs'

const pattern_textinput = /^input|^text(input)?/i
const pattern_selector = /^select([oe]r)?/i
const pattern_autocomplete = /^complete|^auto(complete)?/i

interface ConfigurableFormProps {
    query: string
    config: FormElement
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

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
        return <input {...inputProps} />
    } else if (pattern_selector.test(element)) {
        const selectProps = {
            ...attributes,
            value,
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setValue(e.target.value),
        }

        const options = keywordList.map((k, idx) => {
            return (
                <option key={idx} value={k}>
                    {k}
                </option>
            )
        })
        return <select {...selectProps}>{options}</select>
    } else if (pattern_autocomplete.test(element)) {
        const connectionId = `autocomplete-${name}`
        const autoconmpleteProps = {
            ...attributes,
            list: connectionId,
            value,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
        }
        const options = keywordList.map((k, idx) => {
            return (
                <option key={idx} value={k}>
                    {k}
                </option>
            )
        })
        return (
            <>
                <input {...autoconmpleteProps} />
                <datalist id={connectionId}>{options}</datalist>
            </>
        )
    } else {
        // warning
        console.error('Unknown element! errror occured...')
        return <p>Unknown error happen</p>
    }
}

export default ConfigurableElement
