/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/unbound-method */

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'stores'
// import type { JSONResponse } from 'types'

type Query = {
  id: string
  query: string
}

export const QueryAdapter = createEntityAdapter<Query>({
  selectId: (query) => query.id,
  sortComparer: (a, b) => a.id.localeCompare(b.id)
})

const querySlice = createSlice({
  name: 'query',
  initialState: QueryAdapter.getInitialState(),
  reducers: {
    queryAdded: QueryAdapter.addOne,
    queryUpdated: QueryAdapter.upsertOne
  }
})

export const { queryAdded, queryUpdated } = querySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const querySelectors = QueryAdapter.getSelectors<RootState>((state) => state.query)

export default querySlice.reducer
