import { configureStore } from '@reduxjs/toolkit'
import resultReducer from './resultSlice'
import queryReducer from './sparqlQuerySlice'
import drawerReducer from './drawerSlice'
import formConfigReducer from './formConfigSlice'

export const store = configureStore({
  reducer: {
    result: resultReducer,
    query: queryReducer,
    drawer: drawerReducer,
    formConfig: formConfigReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
