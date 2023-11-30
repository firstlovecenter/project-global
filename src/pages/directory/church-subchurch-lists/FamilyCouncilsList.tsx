import { Button, Center, Container, Heading, VStack } from '@chakra-ui/react'
import { ApolloWrapper } from '@jaedag/admin-portal-react-core'
import { useRef } from 'contexts/RefContext'
import { collection, getFirestore, query, where } from 'firebase/firestore'
import { GiEarthAfricaEurope } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { useFirestoreCollectionData } from 'reactfire'

const CouncilsList = () => {
  const { familyRef, clickCard } = useRef()

  const db = getFirestore()
  const navigate = useNavigate()

  const councilsRef = collection(db, 'councils')
  const q = query(councilsRef, where('familyRef', '==', familyRef))
  const { status, data, error } = useFirestoreCollectionData(q)
  const councils = data

  return (
    <ApolloWrapper data={data} loading={status === 'loading'} error={error}>
      <Container>
        <Heading>Councils</Heading>

        <Center marginY={10}>
          <GiEarthAfricaEurope size={120} />
        </Center>

        <VStack spacing={2} align="stretch">
          <Button onClick={() => navigate('/directory/create-council')}>
            Register A Council
          </Button>
          {councils?.map((council) => (
            <Button
              key={council.id}
              variant="outline"
              paddingY={7}
              onClick={() => {
                clickCard(council.id, 'council')
                navigate('/trends/council')
              }}
            >
              {council.name}
            </Button>
          ))}
        </VStack>
      </Container>
    </ApolloWrapper>
  )
}

export default CouncilsList
