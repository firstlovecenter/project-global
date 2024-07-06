import { Box, Flex, Img, Text } from '@chakra-ui/react'

import React from 'react'

function ProfileHeader({
  name,
  email,
}: Readonly<{ name: string; email: string }>) {
  return (
    <Flex
      gap={3}
      bg={'#262A32'}
      p={'0.65rem 0.5rem '}
      alignItems={'center'}
      borderRadius={'10px'}
      width={'100%'}
    >
      <Box borderRadius={'5000px'} p={0} overflow={'hidden'} width={'40px'}>
        <Img src="https://via.placeholder.com/150" />
      </Box>
      <Box>
        <Text fontSize={'14px'} color="#ffffff">
          {name}
        </Text>
        <Text fontSize={'12px'} color={'#7B8488'}>
          {email}
        </Text>
      </Box>
    </Flex>
  )
}

export default ProfileHeader
