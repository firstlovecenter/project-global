import {
  Box,
  Center,
  Container,
  HStack,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ApolloWrapper } from '@jaedag/admin-portal-react-core'
import { useRef } from 'contexts/RefContext'
import { collection, doc } from 'firebase/firestore'
import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
} from 'reactfire'
import { useUser } from 'contexts/UserContext'
import { FaPhone, FaWhatsapp } from 'react-icons/fa'
import { GiMailbox } from 'react-icons/gi'
import ProfileIcon from '../components/ProfileIcon'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from 'redux-config/store'
import DropDownMenu from 'components/DropDownMenu'
import CustomAvatar from 'components/chakra-custom/CustomAvatar'
import useCustomColors from 'hooks/useCustomColors'

const MemberProfile = () => {
  const { memberRef } = useRef()
  const { user } = useUser()
  const { yellow } = useCustomColors()
  const member = useSelector((state: RootState) => state.member?.data)
  const dispatch = useDispatch()

  const memRef = doc(useFirestore(), 'members', memberRef ?? user.id)

  const { status, data, error } = useFirestoreDocData(memRef)

  useEffect(() => {
    dispatch({
      type: 'member/setMemberBio',
      payload: {
        ...data,
        updatedAt: member?.updatedAt?.toDate().toISOString(),
      },
    })
  }, [data, dispatch, member?.updatedAt])

  const roleChurchesRef = collection(
    useFirestore(),
    'members',
    memberRef || user.id,
    'roleChurches'
  )

  const {
    status: roleChurchesStatus,
    data: roleChurchesData,
    error: roleChurchesError,
  } = useFirestoreCollectionData(roleChurchesRef)
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
      link: '/member/documents/gov-documents',
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

  return (
    <ApolloWrapper
      data={data && roleChurchesData}
      loading={status === 'loading' || roleChurchesStatus === 'loading'}
      error={error || roleChurchesError}
    >
      <Container p={8}>
        <VStack>
          <Center marginTop={10}>
            <CustomAvatar
              src={member?.pictureUrl}
              size="2xl"
              padding={1}
              borderWidth={'2px'}
              borderColor={yellow}
            />
          </Center>
          <Heading size="lg" mt={4}>
            {member?.firstName + ' ' + member?.lastName}
          </Heading>
        </VStack>

        <Box textAlign="center" color={yellow}>
          <Text fontSize="13px">Uk Family Head</Text>
          <Text fontSize="13px">London Campus Shepherd</Text>

          <Center marginY={5}>
            <HStack spacing={8}>
              <ProfileIcon
                icon={<FaWhatsapp />}
                label="Whatsapp"
                onClick={() =>
                  (window.location.href = `https://wa.me/${member?.phoneNumber}`)
                }
              />
              <ProfileIcon
                icon={<FaPhone />}
                label="Phone"
                onClick={() =>
                  (window.location.href = `tel:${member?.phoneNumber}`)
                }
              />
              <ProfileIcon
                icon={<GiMailbox />}
                label="Email"
                onClick={() =>
                  (window.location.href = `mailto:${member?.email}`)
                }
              />
            </HStack>
          </Center>
        </Box>

        {/* {!!roleChurches.length && (
          <>
            <ProfileSectionLabel label="Oversight Info" />
            <VStack align="stretch" marginLeft="2rem" marginBottom={10}>
              {roleChurches?.map((role) => (
                <Text key={role.id + role.level + role.role} textAlign="start">
                  {role.name} {role.level} {capitalise(role.role)}
                </Text>
              ))}
            </VStack>
          </>
        )} */}

        <VStack my={10} spacing={8} align="stretch">
          <DropDownMenu label="Personal Documents" options={documents} />
          <DropDownMenu label="Oversight Information" options={oversightInfo} />
          <DropDownMenu label="Construction" />
        </VStack>
      </Container>
    </ApolloWrapper>
  )
}

export default MemberProfile
