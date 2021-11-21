import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import resultReducer from './slice'

// export -------------------------------------------------------------
export { useAppDispatch, useAppSelector } from './hook'

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
