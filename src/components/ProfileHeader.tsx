import { Box, Flex, Img, Text } from '@chakra-ui/react'
import { useUser } from 'contexts/UserContext'

import React from 'react'

function ProfileHeader() {
  const { user } = useUser()

  return (
    <Flex
      gap={3}
      bg={'#262A32'}
      p={'0.65rem 0.5rem '}
      alignItems={'center'}
      borderRadius={'10px'}
      width={'100%'}
    >
      <Box
        borderRadius={'5000px'}
        p={0}
        overflow={'hidden'}
        width={'40px'}
        height={'40px'}
      >
        <Img src={user.pictureUrl} />
      </Box>
      <Box>
        <Text fontSize={'14px'} color="#ffffff">
          {user.firstName + ' ' + user.lastName}
        </Text>
        <Text fontSize={'12px'} color={'#7B8488'}>
          {user.email}
        </Text>
      </Box>
    </Flex>
  )
}

export default ProfileHeader
