import {
  defineStyleConfig,
  extendTheme,
  type ThemeConfig,
} from '@chakra-ui/react'

import '@fontsource/bai-jamjuree/400.css'
import '@fontsource/bai-jamjuree/700.css'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const colors = {
  brandGold: {
    50: '#f9f5f3',
    100: '#f5e3d9',
    200: '#e9c7b3',
    300: '#dca98f',
    400: '#d09b6b',
    500: '#DDB995',
    600: '#c37d47',
    700: '#8c5732',
    800: '#6f4227',
    900: '#522d1c',
  },
  brandTeal: {
    50: '#f5f9fc',
    100: '#eaf3fa',
    200: '#a9c1d1',
    300: '#456b7e',
    400: '#2e596e',
    500: '#17465e',
    600: '#153f55',
    700: '#12384b',
    800: '#103142',
    900: '#0e2a38',
  },
}

const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: '50px',
  },

  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'white',
      color: '#DDB995',
    },
    solid: {
      color: '#17465e',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
    colorScheme: 'brandGold',
  },
})

const Heading = defineStyleConfig({
  baseStyle: {
    color: '#DDB995',
    marginTop: '10',
    textTransform: 'uppercase',
    // textAlign: 'center',
  },
})

const theme = extendTheme({
  config,
  colors,
  components: {
    Button,
    Heading,
  },
  fonts: {
    heading: `'Bai Jamjuree', sans-serif`,
    body: `Bai Jamjuree, sans-serif`,
  },
  styles: {
    global: () => ({
      body: {
        height: '100%',
        paddingBottom: '50px',
        background: 'linear-gradient(to top right, #224157, #34637a)',
      },
    }),
  },
})

export default theme
