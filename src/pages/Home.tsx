import { Container, Text } from '@chakra-ui/layout'
import { useAuth } from 'contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button, VStack } from '@chakra-ui/react'
import HomeLogo from 'assets/HomeLogo'

const Home = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <Container centerContent>
      <Text fontSize="3xl" fontWeight="semi-bold" marginTop={14}>
        Welcome {user.displayName}
      </Text>
      <Text
        fontSize="xl"
        color="brandGold.500"
        fontWeight="bold"
        marginBottom={12}
      >
        HOME
      </Text>

      <HomeLogo />

      <VStack marginTop={10} spacing={4} align="stretch">
        <Button
          size="lg"
          variant="outline"
          onClick={() => navigate('/directory')}
        >
          Directory
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => navigate('/churches')}
        >
          Churches
        </Button>
        <Button size="lg" variant="outline">
          Buiding Projects
        </Button>
      </VStack>
    </Container>
  )
}

export default Home
