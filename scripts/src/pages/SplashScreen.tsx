import { Box, Center, Text } from '@chakra-ui/react'
import SplashLogo from 'assets/SplashLogo'
import React from 'react'

const SplashScreen = () => {
  return (
    <Center height="100vh">
      <SplashLogo />
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
