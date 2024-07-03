import { Container, Text } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import { useAuth } from 'contexts/AuthContext'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  VStack,
  Spacer,
  Box,
  Img,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { ApolloWrapper, MenuButton } from '@jaedag/admin-portal-react-core'
import { FaChurch, FaBible } from 'react-icons/fa'
import { RiBuilding2Line } from 'react-icons/ri'

import { useUser } from 'contexts/UserContext'
import { useRef } from 'contexts/RefContext'
import { collection } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { RoleChurch } from 'types/types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux-config/store'
import { ActionButton } from 'components/ActionButton'

const LandingPage = () => {
  const [error, setError] = useState('')
  const { logout, setUser } = useAuth()
  const { user } = useUser()

  const { clickCard } = useRef()
  const navigate = useNavigate()

  // const handleLogout = async () => {
  //   setError('')

  //   try {
  //     await logout()
  //     navigate('/login')
  //   } catch (error) {
  //     setError('Failed to log out')
  //   }
  // }

  // query subcollection at /members/rg9GCItdAdRRhctbd6DX/roleChurches
  const roleChurchesRef = collection(
    useFirestore(),
    'members',
    user.id,
    'roleChurches'
  )

  const {
    status,
    data,
    error: memError,
  } = useFirestoreCollectionData(roleChurchesRef)
  const roleChurches = data as RoleChurch[]

  const dispatch = useDispatch()

  useEffect(() => {
    if (roleChurches?.length >= 1) {
      dispatch({
        type: 'user/setUser',
        payload: {
          ...user,
          updatedAt: user?.updatedAt.toDate().toISOString(),
          roleChurches,
        },
      })
    }
  }, [data, dispatch, roleChurches, user])

  const userFromStore = useSelector((state: RootState) => state.user.data)

  const DUMMY_CATEGORIES = [
    {
      name: 'Directory',
      subtitle: 'Leaders of the church and their details',
      path: '/directory',
      icon: FaBible,
    },
    {
      name: 'Churches',
      subtitle: 'THe churhces of the UO-FLC 190',
      path: '/churches',
      icon: FaChurch,
    },
    {
      name: 'Buildings & Projects',
      subtitle: 'All the different buildings & projects',
      path: '/buildings',
      icon: RiBuilding2Line,
    },
  ]

  return (
    <Container
      centerContent
      width={'100vw'}
      maxWidth={'100vw'}
      minWidth={'310px'}
      height={'100%'}
      alignItems={'center'}
      position={'relative'}
      padding={0}
      margin={0}
    >
      <Box
        marginTop={20}
        width={{ base: '100%', md: 'min(50%, 70vw)' }}
        alignSelf={{ base: 'center', md: 'flex-start' }}
        padding={{ base: 0, md: 10 }}
        background={{ base: 'none', md: '#262E40' }}
      >
        <Text
          fontSize="3xl"
          fontWeight="700"
          marginTop={14}
          alignSelf={'flex-start'}
        >
          UO-FLC 190
        </Text>

        <VStack
          spacing={2}
          align="center"
          width="100%"
          marginTop={10}
          gap={'1.5rem'}
        >
          {DUMMY_CATEGORIES.map((category, index) => (
            <ActionButton
              key={`${category.name}-${index}`}
              icon={category.icon}
              textAlign="start"
              title={`${category.name}`}
              subtitle={category.subtitle}
              onClick={() => {
                navigate('/home')
              }}
              variant={'ghost'}
              backgroundColor={'#454D62'}
              // color={"white"}
              subColor="brandGold.500"
            />
          ))}

          <Spacer />
          <Spacer />
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </VStack>
        <Box
          position={'absolute'}
          bottom={0}
          right={0}
          top={0}
          zIndex={-2}
          height={'100vh'}
          overflow={'hidden'}
        >
          <Img
            src="src\assets\landing_page_bg(Desktop).png"
            objectFit={'cover'}
            height={'100%'}
            filter={'brightness(45%) saturate(1.1) contrast(2)'}
            opacity={0.4}
          />
        </Box>
      </Box>
    </Container>
  )
}

export default LandingPage
