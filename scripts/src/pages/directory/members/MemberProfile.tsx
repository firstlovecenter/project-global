import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ApolloWrapper } from '@jaedag/admin-portal-react-core'
import { useRef } from 'contexts/RefContext'
import { doc } from 'firebase/firestore'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import { Member } from 'types/types'
import { useUser } from 'contexts/UserContext'
import { FaPhone, FaWhatsapp } from 'react-icons/fa'
import { GiMailbox } from 'react-icons/gi'
import ProfileIcon from './components/ProfileIcon'
import ProfileSectionLabel from './components/ProfileSectionLabel'

const MemberProfile = () => {
  const { memberRef } = useRef()
  const { user } = useUser()

  const memRef = doc(useFirestore(), 'members', memberRef ?? user.id)

  const { status, data, error } = useFirestoreDocData(memRef)
  const member = data as unknown as Member

  return (
    <ApolloWrapper data={data} loading={status === 'loading'} error={error}>
      <Container>
        <Heading size="lg">Member Profile</Heading>
        <Center marginTop={10}>
          <Avatar
            src={member?.pictureUrl}
            name={member?.firstName + ' ' + member?.lastName}
            size="2xl"
          />
        </Center>
        <Box textAlign="center">
          <Text color="brandGold.500" fontWeight="bold" fontSize="xl">
            {member?.firstName + ' ' + member?.lastName}
          </Text>
          <Text>Active Roles</Text>

          <Center marginY={2}>
            <HStack spacing={10}>
              <ProfileIcon
                icon={<FaWhatsapp />}
                label="Whatsapp"
                onClick={() =>
                  (window.location.href = `https://wa.me/${member?.phoneNumber}`)
                }
              />
              <ProfileIcon
                icon={<FaPhone />}
                label="Phone"
                onClick={() =>
                  (window.location.href = `tel:${member.phoneNumber}`)
                }
              />
              <ProfileIcon
                icon={<GiMailbox />}
                label="Email"
                onClick={() =>
                  (window.location.href = `mailto:${member.email}`)
                }
              />
            </HStack>
          </Center>

          <Divider />
        </Box>

        <ProfileSectionLabel label="Personal Documents" />
        <VStack align="stretch" marginLeft="2rem" marginBottom={10}>
          <Button textAlign="start">Passport Bio Page</Button>
          <Button>Immigration Docuemnts</Button>
          <Button>Drivers License</Button>
          <Button>Birth Certificate</Button>
          <Button>Educational Certificates</Button>
        </VStack>

        <ProfileSectionLabel label="Oversight Info" />
        <VStack align="stretch" marginLeft="2rem" marginBottom={10}>
          <Text>Accra Campus Bishop</Text>
        </VStack>

        <Button width="100%" variant="outline">
          Construction:
        </Button>
      </Container>
    </ApolloWrapper>
  )
}

export default MemberProfile
