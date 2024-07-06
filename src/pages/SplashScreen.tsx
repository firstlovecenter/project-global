import { Box, Center, Text, useColorModeValue } from '@chakra-ui/react'
import SplashLogo from 'assets/SplashLogo'
import SplashLogoDark from 'assets/SplashLogoDark'
import React from 'react'

const SplashScreen = () => {
  const currentColorMode = useColorModeValue('light', 'dark')

  return (
    <Center height="100vh">
      {currentColorMode === 'light' ? <SplashLogo /> : <SplashLogoDark />}
      <Box position="absolute" bottom={0} paddingY={5}>
        <Text fontSize="10px" color="accent" fontWeight="bold">
          © FIRST LOVE CHURCH
        </Text>
        <Text fontSize="10px" color="accent" fontWeight="bold">
          ALL RIGHTS RESERVED
        </Text>
      </Box>
    </Center>
  )
}

export default SplashScreen
