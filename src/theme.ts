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
  brandYellow: {
    50: '#FFFBEA',
    100: '#FFF4C5',
    200: '#FFE787',
    300: '#FFD548',
    400: '#FFC01E',
    500: '#FCA311',
    600: '#DF7500',
    700: '#B95104',
    800: '#963E0A',
    900: '#7B330C',
    950: '#471901',
  },
  brandBlue: {
    50: '#F0F7FE',
    100: '#DDEDFC',
    200: '#c3E0FA',
    300: '#99CDF7',
    400: '#69B2F1',
    500: '#4594EC',
    600: '#3076E0',
    700: '#2762CE',
    800: '#264FA7',
    900: '#244584',
    950: '#14213D',
  },
  brandNavy: '#12203B',
  brandGray1: {
    50: '#F6F6F6',
    100: '#E7E7E7',
    200: '#D1D1D1',
    300: '#B0B0B0',
    400: '#888888',
    500: '#6D6D6D',
    600: '#5D5D5D',
    700: '#4F4F4F',
    800: '#454545',
    900: '#3D3D3D',
    950: '#000000',
  },
  brandGray2: {
    50: '#FFFFFF',
    100: '#EFEFEF',
    200: '#DCDCDC',
    300: '#BDBDBD',
    400: '989898',
    500: '#7C7C7C',
    600: '#656565',
    700: '#525252',
    800: '#464646',
    900: '#3D3D3D',
    950: '#292929',
  },
  brandGray3: {
    50: '#F7F7F7',
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
    padding: '1rem 0.5rem',
    maxWidth: '315px',
  },
  variants: {
    filter: {
      border: '2px solid ',
    },
    outline: {
      border: '2px solid',
      colorScheme: 'brandYellow',
    },
    solid: {},
  },
  defaultProps: {
    variant: 'solid',
    colorScheme: 'brandYellow',
  },
})

const Heading = defineStyleConfig({
  baseStyle: {
    colorScheme: 'black',
    marginTop: '10',
    textTransform: 'capitalize',
    fontWeight: '400',
  },
})

const Input = defineStyleConfig({
  baseStyle: {
    field: {
      borderRadius: '16px',
      border: '2px solid',
      borderColor: 'white',
    },
  },

  defaultProps: {
    size: 'lg',
    variant: 'outline',
    colorScheme: 'brandBlue',
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
        minHeight: '100vh',
        overflowY: 'auto',
      },
      '#root': {
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        overflowY: 'auto',
        minHeight: '100vh',
      },
    }),
  },
})

export default theme
