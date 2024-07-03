import { useColorModeValue } from '@chakra-ui/react'

const useCustomColors = () => {
  const bg = useColorModeValue('#14213d', '#e6e9ef')
  const brand = useColorModeValue('#fca311', '#fca311')
  return { bg, brand }
}

export default useCustomColors
