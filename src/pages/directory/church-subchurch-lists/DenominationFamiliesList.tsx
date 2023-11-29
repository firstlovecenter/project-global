import { Button, Center, Container, Heading, VStack } from '@chakra-ui/react'
import { ApolloWrapper } from '@jaedag/admin-portal-react-core'
import { useRef } from 'contexts/RefContext'
import { collection, getFirestore, query, where } from 'firebase/firestore'
import { GiEarthAfricaEurope } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { useFirestoreCollectionData } from 'reactfire'

const FamiliesList = () => {
  const { denominationRef, clickCard } = useRef()

  const db = getFirestore()
  const navigate = useNavigate()

  const familiesRef = collection(db, 'families')
  const q = query(familiesRef, where('denominationRef', '==', denominationRef))
  const { status, data, error } = useFirestoreCollectionData(q)
  const families = data

  return (
    <ApolloWrapper data={data} loading={status === 'loading'} error={error}>
      <Container>
        <Heading>Families</Heading>

        <Center marginY={10}>
          <GiEarthAfricaEurope size={120} />
        </Center>

        <VStack spacing={2} align="stretch">
          <Button onClick={() => navigate('/directory/create-family')}>
            Register A Family
          </Button>
          {families?.map((family) => (
            <Button
              key={family.id}
              variant="outline"
              paddingY={7}
              onClick={() => {
                clickCard(family.id, 'family')
                navigate('/trends/family')
              }}
            >
              {family.name}
            </Button>
          ))}
        </VStack>
      </Container>
    </ApolloWrapper>
  )
}

export default FamiliesList
