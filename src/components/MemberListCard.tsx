import { Avatar, Box, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { useRef } from 'contexts/RefContext'
import { useNavigate } from 'react-router-dom'
import { Member } from 'types/types'

type MemberListCardProps = {
  member: Member
  subtitle: string
}

const MemberListCard = (props: MemberListCardProps) => {
  const { member, subtitle } = props
  const navigate = useNavigate()
  const { clickCard } = useRef()
  const currentColorMode = useColorModeValue('light', 'dark')

  const colorGoldViaColorMode =
    currentColorMode === 'light' ? 'brandGold.500' : 'brandGold.200'

  return (
    <HStack
      onClick={() => {
        clickCard(member.id, 'member')
        navigate('/member/profile')
      }}
      cursor={'pointer'}
    >
      <Avatar
        size="lg"
        name={member.firstName + '  ' + member.lastName}
        src={member.pictureUrl}
      />
      <Box paddingLeft={5}>
        <Text fontSize="md" color={colorGoldViaColorMode}>
          {member.firstName} {member.lastName}
        </Text>
        <Text fontSize={'sm'} fontWeight={300}>
          {subtitle}
        </Text>
      </Box>
    </HStack>
  )
}

export default MemberListCard
