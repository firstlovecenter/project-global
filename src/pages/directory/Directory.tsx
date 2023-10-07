import {
  Button,
  Center,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import DirectoryBook from 'assets/icons/DirectoryBook'
import { useNavigate } from 'react-router-dom'

const Directory = () => {
  const navigate = useNavigate()

  const directoryMenuItems = [
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
      title: 'Assisting Missioaries',
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
        First Love Church
      </Text>
      <Text fontSize="xl" fontWeight="semi-bold" mb={12}>
        Denominational Admin
      </Text>
      <VStack marginTop={10} spacing={4} align="stretch">
        <Center>
          <DirectoryBook />
        </Center>
        {directoryMenuItems.map((item) => (
          <Button
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
