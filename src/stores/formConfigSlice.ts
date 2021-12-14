// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/unbound-method */

import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'stores'
import type { EyjattoConfig } from 'types/eyjatto'

type FormConfig = {
  id: string
  config: EyjattoConfig
}

export const FormConfigAdapter = createEntityAdapter<FormConfig>({
  selectId: (config) => config.id,
  sortComparer: (a, b) => a.id.localeCompare(b.id)
})

const formConfigSlice = createSlice({
  name: 'formConfig',
  initialState: FormConfigAdapter.getInitialState(),
  reducers: {
    formConfigAdded: FormConfigAdapter.addOne,
    formConfigUpdated: FormConfigAdapter.upsertOne
  }
})

export const { formConfigAdded, formConfigUpdated } = formConfigSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const formConfigSelectors = FormConfigAdapter.getSelectors<RootState>(
  (state) => state.formConfig
)

export default formConfigSlice.reducer
