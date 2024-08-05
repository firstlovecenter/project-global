import { Box, HStack, Text } from '@chakra-ui/react'
import { useRef } from 'contexts/RefContext'
import { useNavigate } from 'react-router-dom'
import { Member } from 'types/types'
import CustomAvatar from './chakra-custom/CustomAvatar'
import useCustomColors from 'hooks/useCustomColors'

type MemberListCardProps = {
  member: Member
  subtitle: string
}

const MemberListCard = (props: MemberListCardProps) => {
  const { member, subtitle } = props
  const navigate = useNavigate()
  const { clickCard } = useRef()
  const { yellow } = useCustomColors()

  return (
    <HStack
      onClick={() => {
        clickCard(member.id, 'member')
        navigate('/member/profile')
      }}
      cursor={'pointer'}
    >
      <CustomAvatar
        size="lg"
        name={member.firstName + '  ' + member.lastName}
        src={member.pictureUrl}
      />
      <Box paddingLeft={5}>
        <Text fontSize="md" color={yellow}>
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
