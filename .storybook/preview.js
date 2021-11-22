export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}

// ------------------------------------------------------------------------------------------------
// cf. https://mui.com/guides/migration-v4/#storybook-emotion-with-v5
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming'

const defaultTheme = createTheme() // or your custom theme

const withThemeProvider = (Story, context) => {
    return (
        <Emotion10ThemeProvider theme={defaultTheme}>
            <ThemeProvider theme={defaultTheme}>
                <Story {...context} />
            </ThemeProvider>
        </Emotion10ThemeProvider>
    )
}

export const decorators = [withThemeProvider]
// ------------------------------------------------------------------------------------------------
