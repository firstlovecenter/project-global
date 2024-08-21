import { Avatar, Center, Text } from '@chakra-ui/react'
import useCustomColors from 'hooks/useCustomColors'
import React from 'react'
import { Member } from 'types/types'

const ProfileAvatar = ({ member }: { member: Member }) => {
  const { yellow } = useCustomColors()
  if (!member) return null
  return (
    <>
      <Center>
        <Avatar
          name={member.firstName + ' ' + member.lastName}
          src={member.pictureUrl}
          size="2xl"
          padding={1}
          borderWidth={2}
          borderColor={yellow}
        />
      </Center>
      <Text mt={2} textAlign="center">
        {member.firstName + ' ' + member.lastName}
      </Text>
    </>
  )
}

export default ProfileAvatar
