import { useColorModeValue } from '@chakra-ui/react'

const useCustomColors = () => {
  const bg = useColorModeValue('#e6e9ef', '#2d2e3e')
  const brand = useColorModeValue('#DDB995', '#DDB995')
  return { bg, brand }
}

export default useCustomColors
