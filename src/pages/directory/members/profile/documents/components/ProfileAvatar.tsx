import { Avatar, Center, Text } from '@chakra-ui/react'
import React from 'react'
import { Member } from 'types/types'

const ProfileAvatar = ({ member }: { member: Member }) => {
  return (
    <>
      <Center>
        <Avatar
          name={member.firstName + ' ' + member.lastName}
          src={member.pictureUrl}
          size="2xl"
        />
      </Center>
      <Text textAlign="center">{member.firstName + ' ' + member.lastName}</Text>
    </>
  )
}

export default ProfileAvatar
