import { Box, Flex, Img, Text } from '@chakra-ui/react'

import React from 'react'

function ProfileHeader({
  name,
  email,
}: Readonly<{ name: string; email: string }>) {
  return (
    <Box p={'1rem 0'} borderTop={'1px solid #96A7AF'}>
      <Flex
        gap={3}
        bg={'#262A32'}
        p={'0.65rem 0.5rem '}
        alignItems={'center'}
        borderRadius={'10px'}
      >
        <Box borderRadius={'5000px'} p={0} overflow={'hidden'} width={'40px'}>
          <Img src="https://via.placeholder.com/150" />
        </Box>
        <Box>
          <Text fontSize={'14px'} colorScheme="brandGray">
            {name}
          </Text>
          <Text fontSize={'12px'} color={'#7B8488'}>
            {email}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default ProfileHeader
