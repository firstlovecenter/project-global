import { useColorModeValue } from '@chakra-ui/react'

const useCustomColors = () => {
  const darkButtonBg = useColorModeValue('whiteAlpha', 'blackAlpha')
  const textPrimary = useColorModeValue('black', 'white')
  const menuBtnBg = useColorModeValue('#262E40', '#454D62')
  const textSecondary = useColorModeValue('brandGray1.500', 'brandGray1.200')
  const yellow = useColorModeValue('brandYellow.500', 'brandYellow.200')
  const gray = useColorModeValue('brandGray1.500', 'brandGray1.200')
  const oppAlpha = {
    normal: useColorModeValue('blackAlpha', 'whiteAlpha'),
    50: useColorModeValue('blackAlpha.50', 'whiteAlpha.50'),
    100: useColorModeValue('blackAlpha.100', 'whiteAlpha.100'),
    200: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
    300: useColorModeValue('blackAlpha.300', 'whiteAlpha.300'),
    400: useColorModeValue('blackAlpha.400', 'whiteAlpha.400'),
    500: useColorModeValue('blackAlpha.500', 'whiteAlpha.500'),
    600: useColorModeValue('blackAlpha.600', 'whiteAlpha.600'),
    700: useColorModeValue('blackAlpha.700', 'whiteAlpha.700'),
    800: useColorModeValue('blackAlpha.800', 'whiteAlpha.800'),
    900: useColorModeValue('blackAlpha.900', 'whiteAlpha.900'),
  }

  const themeAlpha = {
    normal: useColorModeValue('whiteAlpha', 'blackAlpha'),
    50: useColorModeValue('whiteAlpha.50', 'blackAlpha.50'),
    100: useColorModeValue('whiteAlpha.100', 'blackAlpha.100'),
    200: useColorModeValue('whiteAlpha.200', 'blackAlpha.200'),
    300: useColorModeValue('whiteAlpha.300', 'blackAlpha.300'),
    400: useColorModeValue('whiteAlpha.400', 'blackAlpha.400'),
    500: useColorModeValue('whiteAlpha.500', 'blackAlpha.500'),
    600: useColorModeValue('whiteAlpha.600', 'blackAlpha.600'),
    700: useColorModeValue('whiteAlpha.700', 'blackAlpha.700'),
    800: useColorModeValue('whiteAlpha.800', 'blackAlpha.800'),
    900: useColorModeValue('whiteAlpha.900', 'blackAlpha.900'),
  }

  return {
    darkButtonBg,
    menuBtnBg,
    yellow,
    gray,
    oppAlpha,
    themeAlpha,
    textPrimary,
    textSecondary,
  }
}

export default useCustomColors
