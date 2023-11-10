import { Text, HStack } from '@chakra-ui/react'
import React from 'react'
import { GiPapers } from 'react-icons/gi'

type ProfileSectionLabelType = {
  label: string
}

const ProfileSectionLabel = (props: ProfileSectionLabelType) => {
  const { label } = props

  return (
    <HStack marginBottom={5}>
      <GiPapers size={25} />
      <Text fontSize="lg" color="brandGold.500">
        {label}
      </Text>
    </HStack>
  )
}

export default ProfileSectionLabel
