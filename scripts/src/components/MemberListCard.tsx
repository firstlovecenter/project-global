import { Avatar, Box, HStack, Text } from '@chakra-ui/react'
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

  return (
    <HStack
      onClick={() => {
        clickCard(member.id, 'Member')
        navigate('/member/profile')
      }}
    >
      <Avatar
        size="lg"
        name={member.firstName + '  ' + member.lastName}
        src="https://bit.ly/dan-abramov"
      />
      <Box paddingLeft={5}>
        <Text fontSize="xl" color="brandGold.500" fontWeight="bold">
          {member.firstName} {member.lastName}
        </Text>
        <Text>{subtitle}</Text>
      </Box>
    </HStack>
  )
}

export default MemberListCard
