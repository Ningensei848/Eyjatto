import { useMemo } from 'react'
import { useRouter } from 'next/router'
import {
  styled,
  Typography,
  Toolbar,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps
} from '@mui/material'

import { siteName, MDX_PAGE_PATH } from 'consts'
import { useAppSelector } from 'libs/hooks'
import { isDrawerOpen, drawerWidth } from 'stores/drawerSlice'
import Link from 'components/Link'
import DrawerButton from 'components/parts/DrawerButton'

interface AppBarProps extends MuiAppBarProps {
  open: boolean
  width: number
}

const AppBarWithDrawer = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open, width }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${width}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: width
  })
}))

const pattern_sparqlet_path = new RegExp(`/${MDX_PAGE_PATH}/.+`, 'iu')

const AppBar = (): JSX.Element => {
  // useRouter で場所判定して，それによって DrawerButton を出したり引っ込めたり
  const { asPath } = useRouter()
  const open = useAppSelector(isDrawerOpen)
  const width = useAppSelector(drawerWidth)
  const onSparqletPage = useMemo(() => pattern_sparqlet_path.test(asPath), [asPath])

  return (
    <>
      <AppBarWithDrawer open={onSparqletPage && open} width={width}>
        <Toolbar>
          {/* noWrap: 折り返さない */}
          <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ flexGrow: 1 }}>
            <Link href={{ pathname: '/' }} variant='h6' color='inherit' underline='none'>
              {siteName}
            </Link>
          </Typography>
          {onSparqletPage && <DrawerButton />}
        </Toolbar>
      </AppBarWithDrawer>
      {/* ↓ コンテンツ重なり防止のための Toolbar */}
      <Toolbar />
    </>
  )
}

export default AppBar
