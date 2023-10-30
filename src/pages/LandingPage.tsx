import { Container, Text } from '@chakra-ui/layout'
import React, { useState } from 'react'
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
import { MenuButton } from '@jaedag/admin-portal-react-core'
import { FaChurch } from 'react-icons/fa'
import { useUser } from 'contexts/UserContext'
import { collection, getFirestore, query, where } from 'firebase/firestore'
import { useFirestoreCollectionData } from 'reactfire'

const LandingPage = () => {
  const [error, setError] = useState('')
  const { logout } = useAuth()
  const { user } = useUser()
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

  const db = getFirestore()
  const campusCollRef = collection(db, 'campuses')

  const campusQueryRef = query(
    campusCollRef,
    where('id', 'in', user.leadsCampuses)
  )

  const { data: campuses } = useFirestoreCollectionData(campusQueryRef, {
    idField: 'id',
  })

  const leadsCampuses = campuses?.map((campus) => ({
    campusId: campus.id,
    levelName: campus.name,
    levelType: 'Campus',
    role: 'Leader',
  }))

  const data = {
    roles: [...leadsCampuses],
  }

  return (
    <Container centerContent>
      <Text fontSize="3xl" fontWeight="semi-bold" marginTop={14}>
        Welcome {user.firstName} {user.lastName}
      </Text>
      <Text fontSize="xl" fontWeight="semi-bold" marginBottom={12}>
        Choose A Profile
      </Text>

      <VStack spacing={2} align="stretch">
        {data.roles?.map((role, index) => (
          <MenuButton
            key={index}
            icon={FaChurch}
            textAlign="start"
            title={`${role.levelName}`}
            subtitle={` ${role.levelType} ${role.role}`}
            onClick={() => navigate('/home')}
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
    </Container>
  )
}

export default LandingPage
