import { Avatar, Center, Container, Heading } from '@chakra-ui/react'
import { ApolloWrapper } from '@jaedag/admin-portal-react-core'
import { useRef } from 'contexts/RefContext'
import { doc } from 'firebase/firestore'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import ProfileDetailCard from './ProfileDetailCard'
import { Member } from 'types/types'
import { useUser } from 'contexts/UserContext'

const MemberProfile = () => {
  const { memberRef } = useRef()
  const { user } = useUser()

  const memRef = doc(useFirestore(), 'members', memberRef?.id ?? user.uid)

  const { status, data, error } = useFirestoreDocData(memRef)
  const member = data as unknown as Member
  const details = []
  details.push({
    title: 'First Name',
    detail: member.firstName,
  })
  member.middleName
    ? details.push({
        title: 'Middle Name',
        detail: member.middleName,
      })
    : null
  details.push({
    title: 'Last Name',
    detail: member.lastName,
  })
  details.push({
    title: 'Email',
    detail: member.email,
  })
  details.push({
    title: 'Phone Number',
    detail: member.phoneNumber,
  })
  details.push({
    title: 'Whatsapp Number',
    detail: member.whatsappNumber,
  })
  details.push({
    title: 'Date of Birth',
    detail: data.dateOfBirth.toDate().toLocaleString('en-gb', {
      month: 'long',
      day: 'numeric',
    }),
  })
  details.push({
    title: 'Gender',
    detail: member.gender,
  })
  details.push({
    title: 'Marital Status',
    detail: member.maritalStatus,
  })
  details.push({
    title: 'Occupation',
    detail: member.occupation,
  })

  return (
    <ApolloWrapper data={data} loading={status === 'loading'} error={error}>
      <Container>
        <Heading size="lg">Member Profile</Heading>
        <Center marginY={10}>
          <Avatar
            src={data.pictureUrl}
            name={data.firstName + ' ' + data.lastName}
            size="2xl"
          />
        </Center>

        {details.map((detail) => (
          <ProfileDetailCard title={detail.title} detail={detail.detail} />
        ))}
      </Container>
    </ApolloWrapper>
  )
}

export default MemberProfile
