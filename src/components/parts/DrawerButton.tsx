import { IconButton } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material'

import { useAppSelector, useAppDispatch } from 'libs/hooks'
import { isDrawerOpen, handleDrawerOpen } from 'stores/drawerSlice'

const DrawerButton = () => {
  const open = useAppSelector(isDrawerOpen)
  const dispatch = useAppDispatch()

  return (
    <IconButton
      color='inherit'
      aria-label='open drawer'
      edge='end'
      onClick={() => dispatch(handleDrawerOpen())}
      sx={{ ...(open && { display: 'none' }) }}
    >
      <MenuIcon />
    </IconButton>
  )
}

export default DrawerButton
