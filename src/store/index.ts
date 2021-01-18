// cf. https://redux-toolkit.js.org/tutorials/advanced-tutorial#setting-up-the-redux-store
import rootReducer from "@/store/rootReducer"
import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

const store = configureStore({
  reducer: rootReducer
})

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept(
    "@/store/rootReducer",
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async () => {
      const newRootReducer = await import("@/store/rootReducer")
      store.replaceReducer(newRootReducer.default)
    }
  )
}

export type AppDispatch = typeof store.dispatch
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store
