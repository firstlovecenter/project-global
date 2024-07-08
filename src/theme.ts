import {
  defineStyleConfig,
  extendTheme,
  type ThemeConfig,
} from '@chakra-ui/react'

import '@fontsource/signika/300.css'
import '@fontsource/signika/400.css'
import '@fontsource/signika/500.css'
import '@fontsource/signika/700.css'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const breakpoints = {
  base: '0px',
  sm: '320px',
  md: '700px',
  lg: '960px',
  xl: '1200px',
}

const colors = {
  brandGold: {
    50: '#ffffff',
    100: '#ffecd2',
    200: '#ffdaa6',
    300: '#ffc87a',
    400: '#ffb64c',
    500: '#f9a501',
    600: '#d28c0e',
    700: '#ac7313',
    800: '#885b14',
    900: '#654414',
  },
  brandTeal: {
    50: '#f0f7fe',
    100: '#bec8d4',
    200: '#8e9aac',
    300: '#626f85',
    400: '#3a4660',
    500: '#14213d',
    600: '#131d35',
    700: '#121a2d',
    800: '#111625',
    900: '#0f121e',
  },

  brandGray: {
    50: '#f7f7f7',
    100: '#EDEDED',
    200: 'E4E4E4',
    300: '#C8C8C8',
    400: '#ADADAD',
    500: '#999999',
    600: '#888888',
    700: '#7B7B7B',
    800: '#676767',
    900: '#545454',
    950: '#363636',
  },
}

const Button = defineStyleConfig({
  baseStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: '9px',
    padding: '2rem 1.5rem',
    maxWidth: '315px',
  },
  variants: {
    filter: {
      border: '2px solid ',
      // borderRadius: "10000px",
    },
    outline: {
      border: '2px solid',
      colorScheme: 'brandGold',
    },
    solid: {
      // color: '#000000',
      // bg: 'brandGold.500',
      // _hover: {
      //   bg: 'brandGold.600',
      // },
      // _disabled: {
      //   bg: '#5B5B5B',
      //   color: 'gray.300',
      // },
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
    colorScheme: 'brandGray',
    marginTop: '10',
    textTransform: 'capitalize',
  },
})

const Text = defineStyleConfig({
  baseStyle: {
    colorScheme: 'brandGray',
  },
})

const Input = defineStyleConfig({
  baseStyle: {
    field: {
      borderRadius: '16px',
      border: '2px solid',
      borderColor: 'white',
      color: 'brandGray.200',
    },
  },

  defaultProps: {
    size: 'lg',
    variant: 'outline',
    colorScheme: 'brandTeal',
  },
})

const theme = extendTheme({
  config,
  colors,
  breakpoints,
  components: {
    Button,
    Heading,
    Input,
    Text,
  },
  fonts: {
    heading: `'Signika', sans-serif`,
    body: `Signika, sans-serif`,
  },
  styles: {
    global: () => ({
      body: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        // paddingBottom: '3rem',
        minHeight: '100vh',
        // background: 'linear-gradient(to top right, #39405a, #14213d)',
        // background: '#262E40',
      },
    }),
  },
})

export default theme
