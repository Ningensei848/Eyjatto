import { ReactNode } from 'react'
import { styled, Box } from '@mui/material'

import AppBar from './parts/AppBar'
import Footer from './parts/Footer'
import { useAppSelector } from 'libs/hooks'
import { isDrawerOpen, drawerWidth } from 'stores/drawerSlice'

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open: boolean
  width: number
}>(({ theme, open, width }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginRight: 0,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: width
  })
}))

const Layout = ({ children }: { children: ReactNode }) => {
  const open = useAppSelector(isDrawerOpen)
  const width = useAppSelector(drawerWidth)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
        // // // transparent scrollbar -----------------------------------------------
        // overflowY: 'scroll',
        // scrollbarGutter: 'stable'
        // // // ---------------------------------------------------------------------
      }}
    >
      <AppBar />
      <Main open={open} width={width}>
        {children}
      </Main>
      <Footer />
    </Box>
  )
}

export default Layout
