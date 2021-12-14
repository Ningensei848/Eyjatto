import { colors, createTheme } from '@mui/material'
import createCache from '@emotion/cache'
// import type { } from '@mui/lab/themeAugmentation';

export const createEmotionCache = () => {
  return createCache({ key: 'css' })
}

// Create a theme instance.
export const theme = createTheme({
  // // for @mui/lab expansion ----------------------------------------------------
  // // cf. https://mui.com/components/about-the-lab/#typescript
  // components: {},
  // // ---------------------------------------------------------------------------
  palette: {
    primary: {
      main: '#448844'
    },
    secondary: {
      main: '#7CD1B8'
    },
    error: {
      main: colors.red.A400
    }
  }
})
