import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { ApolloWrapper, capitalise } from '@jaedag/admin-portal-react-core'
import { useRef } from 'contexts/RefContext'
import { collection, doc } from 'firebase/firestore'
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from 'reactfire'
import { RoleChurch } from 'types/types'
import { useUser } from 'contexts/UserContext'
import { FaPhone, FaWhatsapp } from 'react-icons/fa'
import { GiMailbox } from 'react-icons/gi'
import ProfileIcon from '../components/ProfileIcon'
import ProfileSectionLabel from '../components/ProfileSectionLabel'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from 'redux-config/store'
import Select from 'components/FormPrimitives/FormSelect'
import DropDownMenu from 'components/DropDownMenu'
import { link } from 'fs'

const MemberProfile = () => {
  const { memberRef } = useRef()
  const { user } = useUser()
  const navigate = useNavigate()
  const currentColorMode = useColorModeValue('light', 'dark')
  // const member = useSelector((state: RootState) => state.member?.data)
  // const dispatch = useDispatch()

  // const memRef = doc(useFirestore(), 'members', memberRef ?? user.id)

  // const { status, data, error } = useFirestoreDocData(memRef)

  // useEffect(() => {
  //   dispatch({
  //     type: 'member/setMemberBio',
  //     payload: {
  //       ...data,
  //       updatedAt: member?.updatedAt?.toDate().toISOString(),
  //     },
  //   })
  // }, [data, dispatch, member?.updatedAt])

  // const roleChurchesRef = collection(
  //   useFirestore(),
  //   'members',
  //   memberRef || user.id,
  //   'roleChurches'
  // )

  // const {
  //   status: roleChurchesStatus,
  //   data: roleChurchesData,
  //   error: roleChurchesError,
  // } = useFirestoreCollectionData(roleChurchesRef)
  // const roleChurches = (roleChurchesData || []) as RoleChurch[]

  const documents = [
    {
      name: 'Bio Data',
      link: '/member/documents/bio-data',
    },
    {
      name: 'Possessions',
      link: '/member/documents/possessions',
    },
    {
      name: 'HR Documents',
      link: '/member/documents/hr-documents',
    },
    {
      name: 'Government ID and Certificates',
      link: '/member/documents/government-id-and-certificates',
    },
    {
      name: 'Educational Certificates',
      link: '/member/documents/educational-certificates',
    },
    {
      name: "Children's Birth Certificates",
      link: '/member/documents/childrens-birth-certificates',
    },
  ]

  const oversightInfo = [
    {
      name: 'London Campus Head',
      link: '/directory/london-campus-head',
    },
    {
      name: 'UK Country Head',
      link: '/directory/uk-country-head',
    },
    {
      name: 'UK Family Head',
      link: '/directory/uk-family-head',
    },
    {
      name: 'Europe Continent Head',
      link: '/directory/europe-empire-head',
    },
  ]

  const colorGoldViaColorMode =
    currentColorMode === 'light' ? 'brandGold.500' : 'brandGold.300'
  const colorTealViaColorMode =
    currentColorMode === 'light' ? 'brandTeal.500' : 'brandTeal.300'

  return (
    // <ApolloWrapper
    //   data={data && roleChurchesData}
    //   loading={status === 'loading' || roleChurchesStatus === 'loading'}
    //   error={error || roleChurchesError}
    // >
    <Container p={8}>
      <VStack>
        <Center marginTop={10}>
          <Avatar
            // src={member?.pictureUrl}
            // name={member?.firstName + ' ' + member?.lastName}
            size="2xl"
            padding={2}
            border={'4px solid'}
            borderColor={colorGoldViaColorMode}
          />
        </Center>
        <Heading size="lg">Kent Njeru</Heading>
      </VStack>

      <Box textAlign="center">
        <Text fontSize="13px">Uk Family Head</Text>
        <Text fontSize="13px">London Campus Shepherd</Text>

        <Center marginY={5}>
          <HStack spacing={8}>
            <ProfileIcon
              icon={<FaWhatsapp />}
              label="Whatsapp"
              // onClick={
              //   () =>
              //   (window.location.href = `https://wa.me/${member?.phoneNumber}`)
              // }
            />
            <ProfileIcon
              icon={<FaPhone />}
              label="Phone"
              // onClick={
              //   () =>
              //   (window.location.href = `tel:${member?.phoneNumber}`)
              // }
            />
            <ProfileIcon
              icon={<GiMailbox />}
              label="Email"
              // onClick={
              //   () =>
              //   (window.location.href = `mailto:${member?.email}`)
              // }
            />
          </HStack>
        </Center>
      </Box>

      <VStack my={10} spacing={10} align="stretch">
        <DropDownMenu label="Personal Documents" options={documents} />
        <DropDownMenu label="Oversight Information" options={oversightInfo} />
        <DropDownMenu label="Construction" />
      </VStack>
    </Container>
    // </ApolloWrapper>
  )
}

export default MemberProfile
