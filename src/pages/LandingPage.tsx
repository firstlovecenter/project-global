import { Container, Text } from '@chakra-ui/layout'
import { useState } from 'react'
import { useAuth } from 'contexts/AuthContext'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  VStack,
  Spacer,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { ApolloWrapper, MenuButton } from '@jaedag/admin-portal-react-core'
import { FaChurch } from 'react-icons/fa'
import { useUser } from 'contexts/UserContext'
import { useRef } from 'contexts/RefContext'
import { collection } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'

const LandingPage = () => {
  const [error, setError] = useState('')
  const { logout, setUser } = useAuth()
  const { user } = useUser()
  const { memberRef, clickCard } = useRef()
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

  // query subcollection at /members/rg9GCItdAdRRhctbd6DX/roleChurches
  const roleChurchesRef = collection(
    useFirestore(),
    'members',
    memberRef || user.id,
    'roleChurches'
  )

  const {
    status,
    data,
    error: memError,
  } = useFirestoreCollectionData(roleChurchesRef)

  return (
    <Container centerContent>
      <Text fontSize="3xl" fontWeight="semi-bold" marginTop={14}>
        Welcome {user.firstName} {user.lastName}
      </Text>
      <Text fontSize="xl" fontWeight="semi-bold" marginBottom={12}>
        Choose A Profile
      </Text>

      <ApolloWrapper
        data={data}
        loading={status === 'loading'}
        error={memError}
      >
        <VStack spacing={2} align="stretch" width="80%">
          {user.roleChurches?.map((role, index) => (
            <MenuButton
              key={index}
              icon={FaChurch}
              textAlign="start"
              title={`${role.name}`}
              subtitle={` ${role.level} ${role.role}`}
              onClick={() => {
                setUser({
                  ...user,
                  selectedProfile: role,
                })
                clickCard(role.id, role.level)
                navigate('/home')
              }}
              color="brandGold.500"
              subColor="white"
            />
          ))}
          <Button size="lg" onClick={() => navigate('/member/register')}>
            Register A Member
          </Button>
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
      </ApolloWrapper>
    </Container>
  )
}

export default LandingPage
