// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/unbound-method */

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'stores'
import type { JSONResponse } from 'types/sparqlQueryResult'

type Result = {
  id: string
  data: JSONResponse
}

const ResultsAdapter = createEntityAdapter<Result>({
  selectId: (result) => result.id,
  sortComparer: (a, b) => a.id.localeCompare(b.id)
})

export const resultSlice = createSlice({
  name: 'result',
  initialState: ResultsAdapter.getInitialState(),
  reducers: {
    update: ResultsAdapter.setOne
  }
})

export const { update } = resultSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const resultSelectors = ResultsAdapter.getSelectors<RootState>((state) => state.result)

export default resultSlice.reducer
