// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors = {
  brand: {
    light: '#2ad5dc',
    dark: '#2ad5dc',
  },
  accent: { light: '#DDB995', dark: '#DDB995' },
}

// 3. extend the theme

const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: `'Heading Font Name', sans-serif`,
    body: `'Bal Jamjuree', sans-serif`,
  },
  styles: {
    global: () => ({
      html: {
        height: '100%',
      },
      body: {
        height: '100%',
        background: 'linear-gradient(to top right, #224157, #34637a)',
      },
    }),
  },
})

export default theme
