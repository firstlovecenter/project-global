import { Box, Container, Divider, Heading } from '@chakra-ui/react'
import { ApolloWrapper } from '@jaedag/admin-portal-react-core'
import MemberListCard from 'components/MemberListCard'
import SearchBar from 'components/SearchBar'
import { useUser } from 'contexts/UserContext'
import { collection, query, where } from 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import { Member } from 'types/types'

const MemberList = () => {
  const { user } = useUser()
  const { selectedProfile } = user

  const memberCollRef = collection(useFirestore(), 'members')
  const memberQueryRef = query(
    memberCollRef,
    where('campus', '==', selectedProfile.id)
  )
  const { status, data, error } = useFirestoreCollectionData(memberQueryRef, {
    idField: 'id',
  })

  const members = data as Member[]

  const church = { name: 'Africa West', typename: 'Family' }

  return (
    <ApolloWrapper data={data} loading={status === 'loading'} error={error}>
      <Container>
        <Heading marginBottom={5}>Members Directory</Heading>

        <SearchBar />

        {members?.map((member) => (
          <Box marginTop={5} key={member.id}>
            <MemberListCard
              member={member}
              subtitle={church.name + ' ' + church.typename}
            />
            <Divider marginTop={2} />
          </Box>
        ))}
      </Container>
    </ApolloWrapper>
  )
}

export default MemberList
