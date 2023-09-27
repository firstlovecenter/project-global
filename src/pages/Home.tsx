import { Container, Text } from '@chakra-ui/layout'
import { useState } from 'react'
import { useAuth } from 'contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  VStack,
  Spacer,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react'
import HomeLogo from 'assets/HomeLogo'

const Home = () => {
  const [error, setError] = useState('')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setError('')

    try {
      await logout()
      navigate('/login')
    } catch (error) {
      setError('Failed to log out')
    }
  }

  const data = [
    {
      ledearName: 'John-Dag',
      roles: [
        {
          levelName: 'First Love Church',
          levelType: 'Denominational',
          role: 'Leader',
        },
        {
          levelName: 'Africa',
          levelType: 'Continent',
          role: 'Leader',
        },
        {
          levelName: 'Ghana',
          levelType: 'Country',
          role: 'Admin',
        },
        {
          levelName: 'Accra',
          levelType: 'Council',
          role: 'Leader',
        },
        {
          levelName: 'Legon',
          levelType: 'Campus',
          role: 'Leader',
        },
      ],
    },
  ]

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
        <Button paddingX={20} size="lg" variant="outline">
          Directory
        </Button>
        <Button paddingX={20} size="lg" variant="outline">
          Churches
        </Button>
        <Button paddingX={20} size="lg" variant="outline">
          Buiding Projects
        </Button>
        <Spacer />
        <Spacer />
        <Spacer />
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Button size="lg" onClick={handleLogout}>
          Logout
        </Button>
      </VStack>
    </Container>
  )
}

export default Home
