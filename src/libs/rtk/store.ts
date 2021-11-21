import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import resultReducer from './slice'

// export -------------------------------------------------------------
export * from './hook'
export { update } from './slice'

export const store = configureStore({
    reducer: {
        result: resultReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
// --------------------------------------------------------------------
