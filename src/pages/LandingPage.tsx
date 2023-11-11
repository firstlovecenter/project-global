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
import { ApolloWrapper, MenuButton } from '@jaedag/admin-portal-react-core'
import { FaChurch } from 'react-icons/fa'
import { useUser } from 'contexts/UserContext'
import { collection, query, where } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { useRef } from 'contexts/RefContext'
import { RoleChurch } from 'types/types'

const LandingPage = () => {
  const [error, setError] = useState('')
  const { logout, setUser } = useAuth()
  const { user } = useUser()
  const { clickCard } = useRef()
  const navigate = useNavigate()

  const url = new URL(
    'http://127.0.0.1:5001/project-global-aa5ea/europe-west1/search/campus'
  )
  url.searchParams.append('searchKey', 'acc')
  url.searchParams.append('uid', user.uid)

  fetch(url, {
    method: 'GET',
  })
    .then(console.log)
    .catch(console.error)

  const handleLogout = async () => {
    setError('')

    try {
      await logout()
      navigate('/login')
    } catch (error) {
      setError('Failed to log out')
    }
  }

  const campusCollRef = collection(useFirestore(), 'campuses')

  const campusQueryRef = query(
    campusCollRef,
    where('id', 'in', user?.leadsCampuses ?? [])
  )

  const {
    status,
    data: campuses,
    error: campusError,
  } = useFirestoreCollectionData(campusQueryRef, {
    idField: 'id',
  })

  const leadsCampuses: RoleChurch[] =
    campuses?.map((campus) => ({
      id: campus.id,
      name: campus.name,
      level: 'Campus',
      role: 'Leader',
    })) ?? []

  const data = {
    roles: [...leadsCampuses],
  }

  return (
    <ApolloWrapper
      loading={status === 'loading'}
      data={campuses}
      error={campusError}
    >
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
      </Container>
    </ApolloWrapper>
  )
}

export default LandingPage
