import { Container, Text } from '@chakra-ui/layout'
import { useEffect, useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  VStack,
  Flex,
  Spacer,
  Box,
  Img,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { FaChurch, FaBible } from 'react-icons/fa'
import { RiBuilding2Line } from 'react-icons/ri'

import { useUser } from 'contexts/UserContext'
import { collection } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { RoleChurch } from 'types/types'
import { useDispatch } from 'react-redux'
import { ActionButton } from 'components/ActionButton'
import ProfileHeader from 'components/ProfileHeader'
import SelectCategory from 'components/SelectCategory'
import { ApolloWrapper } from '@jaedag/admin-portal-react-core'

const LandingPage = () => {
  const [error, setError] = useState('')
  const { user } = useUser()

  const navigate = useNavigate()

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
    dispatch({
      type: 'user/setUser',
      payload: {
        ...user,
        updatedAt: user?.updatedAt.toString(),
        roleChurches: roleChurches?.length >= 1 ? roleChurches : [],
      },
    })
    setError('')
  }, [data, dispatch, roleChurches, user])

  const DUMMY_CATEGORIES = [
    {
      name: 'Directory',
      subtitle: 'Leaders of the church and their details',
      path: '/directory',
      icon: FaBible,
    },
    {
      name: 'Churches',
      subtitle: 'The churches of the UO-FLC 190',
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
    <ApolloWrapper data={data} loading={status === 'loading'} error={memError}>
      <Container
        maxWidth={'100vw'}
        minHeight={'100dvh'}
        minWidth={'310px'}
        alignItems={'center'}
        justifyContent={'center'}
        position={'relative'}
        padding={0}
        margin={0}
      >
        <Box
          width={{ base: '100%', lg: 'min(50%, 70vw)' }}
          alignSelf={'center'}
          height={{ base: '100%', lg: '100vh' }}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box
            width={'310px'}
            height={{ base: '100vh', lg: '100%' }}
            alignSelf={'center'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Box
              width={'310px'}
              mt={{ base: 0, lg: 10 }}
              display={{ base: 'none', lg: 'block' }}
            >
              <SelectCategory />
            </Box>
            <Text
              fontSize="3xl"
              fontWeight="700"
              marginTop={{ base: 0, lg: 14 }}
              alignSelf={'flex-start'}
            >
              UO-FLC 190
            </Text>

            <VStack
              spacing={2}
              align="center"
              width="100%"
              marginTop={{ base: 1, lg: 5 }}
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
                    navigate(category.path)
                  }}
                  variant={'ghost'}
                  backgroundColor={'#14213D'}
                  minWidth={'310px'}
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
          </Box>
          <Box
            position={'absolute'}
            bottom={0}
            right={0}
            top={0}
            left={0}
            zIndex={-3}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'flex-end'}
          >
            <Flex
              alignSelf={'flex-end'}
              display={{ base: 'none', lg: 'flex' }}
              position={'absolute'}
              top={3}
              right={5}
              zIndex={3}
              width={'310px'}
            >
              <ProfileHeader />
            </Flex>
            <Img
              src="src\assets\landing_page_bg(Desktop).png"
              objectFit={'cover'}
              height={'100%'}
              width={{ base: '100%', lg: 'min(50%, 70vw)' }}
              filter={'brightness(45%) saturate(1.1) contrast(2)'}
              opacity={0.4}
            />
          </Box>
        </Box>
      </Container>
    </ApolloWrapper>
  )
}

export default LandingPage
