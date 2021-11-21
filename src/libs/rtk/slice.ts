import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '~/src/libs/rtk'
import { JSONResponse } from '~/src/types'

/**
 * SPARQL 1.1 Query Results JSON Format cf. https://www.w3.org/TR/2013/REC-sparql11-results-json-20130321/#json-result-object
 * ja-JP: cf. http://www.asahi-net.or.jp/~ax2s-kmtn/internet/rdf/REC-sparql11-results-json-20130321.html#json-result-object
 */
const initialState: JSONResponse = {
    head: {},
    boolean: false,
}

export const resultSlice = createSlice({
    name: 'result',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        update: (state, action: PayloadAction<JSONResponse>) => {
            state = action.payload
        },
    },
})

export const { update } = resultSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectResult = (state: RootState) => state.result

export default resultSlice.reducer
