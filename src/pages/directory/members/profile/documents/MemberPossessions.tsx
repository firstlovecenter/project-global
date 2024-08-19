import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'redux-config/store'
import ProfileIcon from '../../components/ProfileIcon'
import { FaPhone, FaWhatsapp } from 'react-icons/fa'
import { GiMailbox } from 'react-icons/gi'
import ProfileInfoCard from '../../components/ProfileInfoCard'
import useCustomColors from 'hooks/useCustomColors'
import MemberPossessionsDetails from './components/MemberPossessionsDetails'

const MemberPossessions = () => {
  const member = useSelector((state: RootState) => state.member.data)
  const { yellow } = useCustomColors()
  const navigate = useNavigate()

  console.log('🚀 ~ file: MemberPossessions.tsx:8 ~ member:', member)

  const fields:
    | { key: string; link: string; lastUpdated: string }[]
    | undefined = []

  return (
    <>
      <Container position={'relative'} alignSelf={'center'} padding={8}>
        <Button
          variant={'ghost'}
          position={'absolute'}
          top={5}
          right={5}
          onClick={() => navigate('/member/documents/possessions/edit')}
          p={0}
        >
          Edit
        </Button>
        <Center marginY={10} display={'flex'} gap={4}>
          <Avatar
            src={member?.pictureUrl}
            size="xl"
            padding={1}
            borderWidth={2}
            borderStyle={'solid'}
            borderColor={yellow}
          />
          <Box>
            <Heading margin={0} mb={3} fontSize={'2xl'}>
              {member?.firstName + ' ' + member?.lastName}
            </Heading>
            <Text fontSize="13px" color={yellow}>
              Uk Family Head
            </Text>
            <Text fontSize="13px" color={yellow}>
              London Campus Shepherd
            </Text>
          </Box>
        </Center>

        <Center marginY={5}>
          <HStack spacing={8}>
            <ProfileIcon
              icon={<FaWhatsapp />}
              label="Whatsapp"
              onClick={() =>
                (window.location.href = `https://wa.me/${member?.whatsappNumber}`)
              }
            />
            <ProfileIcon
              icon={<FaPhone />}
              label="Phone"
              onClick={() =>
                (window.location.href = `tel:${member?.phoneNumber}`)
              }
            />
            <ProfileIcon
              icon={<GiMailbox />}
              label="Email"
              onClick={() => (window.location.href = `mailto:${member?.email}`)}
            />
          </HStack>
        </Center>

        <ProfileInfoCard title="Possessions">
          <MemberPossessionsDetails fields={fields} />
        </ProfileInfoCard>
        <Button
          p={6}
          mt={8}
          onClick={() => navigate('/member/documents/possessions/upload')}
          minWidth={'100%'}
        >
          Upload Files
        </Button>
      </Container>
    </>
  )
}

export default MemberPossessions
