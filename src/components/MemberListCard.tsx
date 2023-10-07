import { Avatar, Box, HStack, Text } from '@chakra-ui/react'

type MemberListCardProps = {
  member: {
    firstName: string
    lastName: string
    picture: string
  }
  subtitle: string
}

const MemberListCard = (props: MemberListCardProps) => {
  const { member, subtitle } = props

  return (
    <HStack>
      <Avatar size="lg" name="Dan Abramov" src="https://bit.ly/dan-abramov" />
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
