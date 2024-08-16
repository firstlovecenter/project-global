import {
  Box,
  Card,
  Container,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { Member } from 'types/types'
import CustomAvatar from 'components/chakra-custom/CustomAvatar'
import useCustomColors from 'hooks/useCustomColors'

interface DesktopMemberProfileProps {
  member: Member
  fields: {
    key: string
    value: string
  }[]
}
const DesktopMemberProfile = ({
  member,
  fields,
}: DesktopMemberProfileProps) => {
  const { yellow } = useCustomColors()

  return (
    <Container display={{ base: 'none', lg: 'block' }} maxWidth={'90%'}>
      <Flex width={'min-content'} mt={5} mb={10}>
        <Heading mt={2}>Directory</Heading>
      </Flex>
      <Card mt={'5rem'}>
        <HStack gap={'5rem'} p={10}>
          <HStack spacing={10} alignItems={'center'} alignSelf={'flex-start'}>
            <CustomAvatar
              src={member?.pictureUrl}
              size="2xl"
              padding={1}
              borderWidth={'2px'}
              borderColor={yellow}
            />
            <Box>
              <Heading mt={0} mb={4} fontSize={'3xl'} color={yellow}>
                {member?.firstName + ' ' + member?.lastName}
              </Heading>
              <Text>UK & Europe Family Head</Text>
              <Text>London Campus</Text>
              <Text>Shepherd</Text>
              <Text>UK Country Head</Text>
            </Box>
          </HStack>

          <SimpleGrid minChildWidth={'150px'} spacing={5} flex={1}>
            {fields.map(({ key, value }) => {
              return (
                <Box key={key}>
                  <Text opacity={0.6}>{key}</Text>
                  <Text>{value}</Text>
                </Box>
              )
            })}
          </SimpleGrid>
        </HStack>
      </Card>
    </Container>
  )
}

export default DesktopMemberProfile
