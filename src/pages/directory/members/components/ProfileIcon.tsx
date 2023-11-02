import { IconButton, Text, VStack } from '@chakra-ui/react'
import React from 'react'

type ProfileIconPropsType = {
  icon: React.ReactElement
  label: string
  onClick?: () => void
}

const ProfileIcon = (props: ProfileIconPropsType) => {
  const { icon, label, onClick } = props

  return (
    <VStack onClick={onClick}>
      <IconButton icon={icon} aria-label="message" />
      <Text fontSize="xs">{label}</Text>
    </VStack>
  )
}

export default ProfileIcon
