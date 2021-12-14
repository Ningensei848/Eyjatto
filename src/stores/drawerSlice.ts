import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'stores'

const initialState = {
  open: false,
  width: 0 // default drawer width
}

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    handleDrawerOpen: (state) => {
      state.open = true
    },
    handleDrawerClose: (state) => {
      state.open = false
    },
    setDrawerWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload
    }
  }
})

export const { handleDrawerOpen, handleDrawerClose, setDrawerWidth } = drawerSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const isDrawerOpen = (state: RootState) => state.drawer.open
export const drawerWidth = (state: RootState) => state.drawer.width

export default drawerSlice.reducer
