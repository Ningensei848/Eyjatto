// Creating the Initial State Slices cf. https://redux-toolkit.js.org/tutorials/advanced-tutorial#creating-the-initial-state-slices

import { ResultSolution, ResultSolutionState } from "@/types/resultSolution"
import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit"

export const resultAdaptor = createEntityAdapter<ResultSolution>({
  // Keep the "all IDs" array sorted based on id characters
  sortComparer: (alpha, beta) => {
    const [idAlpha, idBeta] = [alpha.id.toString(), beta.id.toString()]
    return idAlpha.localeCompare(idBeta)
  }
})

// --------------------------------------------
const initialState: ResultSolutionState = {
  result: resultAdaptor.getInitialState()
}

const resultSolutionSlice = createSlice({
  name: "resultSolution",
  initialState,
  reducers: {
    setResult(state, action: PayloadAction<ResultSolution>) {
      resultAdaptor.upsertOne(state.result, action.payload) // non-serializable なオブジェクトには使えない
    }
  }
})

export const { setResult } = resultSolutionSlice.actions

// cf. https://redux-toolkit.js.org/usage/usage-guide#using-selectors-with-createentityadapter
// Rename the exports for readability in component usage
export const {
  selectById: selectResultById,
  selectIds: selectResultIds,
  selectEntities: selectResultEntities,
  selectAll: selectAllResults,
  selectTotal: selectTotalResults
} = resultAdaptor.getSelectors<ResultSolutionState>((state: ResultSolutionState) => state.result)

export default resultSolutionSlice.reducer
