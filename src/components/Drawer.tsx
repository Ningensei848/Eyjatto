import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { styled, Divider, IconButton, Drawer as MuiDrawer } from '@mui/material'
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material'

import { theme } from 'styles/theme'
import { MOBILE_WIDTH } from 'consts'
import { useAppSelector, useAppDispatch, useWindowSize } from 'libs/hooks'
import {
  isDrawerOpen,
  drawerWidth,
  setDrawerWidth,
  handleDrawerOpen,
  handleDrawerClose
} from 'stores/drawerSlice'

const getWidthInCase = (viewportWidth: number): number => {
  // MUI Default breakpoints:
  // cf. https://mui.com/customization/breakpoints/#default-breakpoints
  if (viewportWidth < MOBILE_WIDTH) {
    return viewportWidth * 0.9 // persistant から temporary に切り替える
  } else if (viewportWidth < 900) {
    return viewportWidth * 0.4
  } else if (viewportWidth < 1200) {
    return viewportWidth * 0.35
  } else if (viewportWidth < 1536) {
    return viewportWidth * 0.3
  } else {
    return 600
  }
}

// debounce for viewportWidth
const useDrawer = (): {
  open: boolean
  width: number
  viewportWidth: number
} => {
  const { events } = useRouter()
  const dispatch = useAppDispatch()
  const open = useAppSelector(isDrawerOpen)

  // ページ読み込み時に Drawer を開ける / ページ遷移時に Drawer を閉じる
  useEffect(() => {
    // cf. https://nextjs.org/docs/api-reference/next/router#routerevents
    dispatch(handleDrawerOpen())
    events.on('routeChangeStart', () => dispatch(handleDrawerClose()))
    return () => {
      events.off('routeChangeStart', () => dispatch(handleDrawerClose()))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { width: viewportWidth } = useWindowSize()
  const width = useAppSelector(drawerWidth)

  useEffect(() => {
    const newWidth = getWidthInCase(viewportWidth)
    dispatch(setDrawerWidth(newWidth))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewportWidth])

  return { open, width, viewportWidth }
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start'
}))

const Drawer = ({ children }: { children: ReactNode }): JSX.Element => {
  const dispatch = useAppDispatch()
  const { open, width, viewportWidth } = useDrawer()

  // TODO: Swipable
  // https://mui.com/components/drawers/#swipeable
  return (
    <MuiDrawer
      sx={{
        width,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width }
      }}
      variant={viewportWidth < MOBILE_WIDTH ? 'temporary' : 'persistent'}
      anchor='right'
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={() => dispatch(handleDrawerClose())}>
          {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      {children}
    </MuiDrawer>
  )
}

export default Drawer
