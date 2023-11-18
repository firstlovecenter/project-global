import {
  Button,
  Center,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import DirectoryBook from 'assets/icons/DirectoryBook'
import { useUser } from 'contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const Directory = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  const directoryMenuItems = [
    {
      title: 'Members',
      onClick: () => navigate('/directory/members'),
      roles: ['all'],
    },
    {
      title: 'Bishops',
      onClick: () => navigate('/directory/members/bishops'),
      roles: ['all'],
    },
    {
      title: 'Apostles',
      onClick: () => navigate('/directory/members/apostles'),
      roles: ['all'],
    },
    {
      title: 'Missionaries',
      onClick: () => navigate('/directory/members/missionaries'),
      roles: ['all'],
    },
    {
      title: 'Assisting Missionaries',
      onClick: () => navigate('/directory/members/assisting-missionaries'),
      roles: ['all'],
    },
    {
      title: 'Campus Shepherds',
      onClick: () => navigate('/directory/members/campus-shepherds'),
      roles: ['all'],
    },
    {
      title: 'Associate Pastors',
      onClick: () => navigate('/directory/members/associate-pastors'),
      roles: ['all'],
    },
    {
      title: 'Full Time Staff',
      onClick: () => navigate('/directory/members/full-time-staff'),
      roles: ['all'],
    },
  ]

  return (
    <Container>
      <Heading>DIRECTORY</Heading>
      <Text fontSize="xl" fontWeight="semi-bold">
        {user.selectedProfile.name} {user.selectedProfile.level}
      </Text>
      <Text fontSize="xl" fontWeight="semi-bold" mb={12}>
        {user.selectedProfile.level} {user.selectedProfile.role}
      </Text>
      <VStack marginTop={10} spacing={4} align="stretch">
        <Center>
          <DirectoryBook />
        </Center>
        <Button size="lg" onClick={() => navigate('/member/register')}>
          Register A Member
        </Button>

        {directoryMenuItems.map((item) => (
          <Button
            key={item.title}
            paddingY="25px"
            size="lg"
            variant="outline"
            onClick={item.onClick}
          >
            {item.title}
          </Button>
        ))}
      </VStack>
    </Container>
  )
}

export default Directory
