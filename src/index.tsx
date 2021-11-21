import { render as ReactDomRender } from 'react-dom'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'

import { store } from './libs/rtk'
import EyjattoForm from './components/Eyjatto'

import type { EyjattoProps } from './types'

// export -----------------------------------------------------------------------------
// cf. https://ja.javascript.info/import-export
export { default as EyjattoForm } from './components/Eyjatto'

export {
    JSONResponseIsValid,
    eyjattoConfigIsValid,
    formElementIsValid,
    sparqletIsValid,
    isValidQuery,
    isValidUrl,
} from './libs/validator'
export {
    JSONResponseParse,
    JSONResponseSerialize,
    eyjattoConfigParse,
    eyjattoConfigSerialize,
    formElementParse,
    formElementSerialize,
    sparqletParse,
    sparqletSerialize,
} from './libs'

export type { JSONResponse, EyjattoConfig, EyjattoProps, FormElement, Sparqlet } from './types'

// ------------------------------------------------------------------------------------
// 1) クラス初期化
// 2) メソッドでRender
export interface RenderProps {
    eyjattoTarget: HTMLElement | null
    eyjattoConfig: EyjattoProps
    // resultTarget?: HTMLElement | null
    // resultConfig?: { [key: string]: any }
}

export class Eyjatto {
    eyjattoTarget!: HTMLElement | null
    eyjattoConfig!: EyjattoProps
    // resultTarget: HTMLElement | null
    constructor(init: Partial<RenderProps>) {
        Object.assign(this, init)
    }
    render() {
        const eyjattoTarget = this.eyjattoTarget
        const eyjattoConfig = this.eyjattoConfig

        console.log(eyjattoTarget)
        console.log(eyjattoConfig)
        // console.log(resultTarget)
        // console.log(resultConfig)

        const eyjatto = (
            <StrictMode>
                <Provider store={store}>
                    <EyjattoForm {...eyjattoConfig} />
                </Provider>
            </StrictMode>
        )

        ReactDomRender(eyjatto, eyjattoTarget)

        // if (resultTarget) {
        //     const Result = (
        //         <StrictMode>
        //             <Provider store={store}>
        //                 <App />
        //             </Provider>
        //         </StrictMode>
        //     )
        //     render(Result, resultTarget)
        // }
    }
}

/*
* それぞれのコンポネントの設定＋HTMLElement を引数に持つ
eyjattoRender({
  eyjattoTarget: document.getElementById("root"),
  eyjattoConfig: {},
  resultTarget: document.getElementById("root2"),
  resultConfig: {},
});
 */
