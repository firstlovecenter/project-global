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

const MemberProfile = () => {
  const { memberRef } = useRef()
  const { user } = useUser()
  const navigate = useNavigate()
  const member = useSelector((state: RootState) => state.member?.data)
  const dispatch = useDispatch()

  const memRef = doc(useFirestore(), 'members', memberRef ?? user.id)

  const { status, data, error } = useFirestoreDocData(memRef)

  useEffect(() => {
    dispatch({
      type: 'member/setMemberBio',
      payload: {
        ...data,
        dateOfBirth: new Date(data?.dateOfBirth).toDateString(),
        createdAt: new Date(data?.createdAt.toMillis()).toDateString(),
      },
    })
  }, [data, dispatch])

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
  const roleChurches = (roleChurchesData || []) as RoleChurch[]

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
      name: 'Pastoral Certificates',
      link: '/member/documents/pastoral-certificates',
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

  return (
    <ApolloWrapper
      data={data && roleChurchesData}
      loading={status === 'loading' || roleChurchesStatus === 'loading'}
      error={error || roleChurchesError}
    >
      <Container>
        <Heading size="lg">Member Profile</Heading>
        <Center marginTop={10}>
          <Avatar
            src={member?.pictureUrl}
            name={member?.firstName + ' ' + member?.lastName}
            size="2xl"
          />
        </Center>
        <Box textAlign="center">
          <Text color="brandGold.500" fontWeight="bold" fontSize="xl">
            {member?.firstName + ' ' + member?.lastName}
          </Text>
          <Text>Active Roles</Text>

          <Center marginY={2}>
            <HStack spacing={10}>
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

          <Divider />
        </Box>

        <ProfileSectionLabel label="Personal Documents" />
        <VStack align="stretch" marginLeft="2rem" marginBottom={10}>
          {documents.map((doc) => (
            <Button key={doc.name} onClick={() => navigate(doc.link)}>
              {doc.name}
            </Button>
          ))}
        </VStack>

        {!!roleChurches.length && (
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
        )}

        <Button width="100%" variant="outline">
          Construction:
        </Button>
      </Container>
    </ApolloWrapper>
  )
}

export default MemberProfile
