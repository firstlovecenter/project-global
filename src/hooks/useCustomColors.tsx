import { useColorModeValue } from '@chakra-ui/react'

const useCustomColors = () => {
  const darkButtonBg = useColorModeValue('#fca311', '#12203B')
  const textPrimary = useColorModeValue('black', 'white')
  const textSecondary = useColorModeValue('brandGray1.500', 'brandGray1.200')
  const yellow = useColorModeValue('brandYellow.500', 'brandYellow.200')
  const gray = useColorModeValue('brandGray1.500', 'brandGray1.200')

  return { darkButtonBg, yellow, gray, textPrimary, textSecondary }
}

export default useCustomColors
