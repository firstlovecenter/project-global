import { Button, Center, Container, Heading, VStack } from '@chakra-ui/react'
import { ApolloWrapper } from '@jaedag/admin-portal-react-core'
import { useRef } from 'contexts/RefContext'
import { collection, doc, getFirestore, query, where } from 'firebase/firestore'
import { GiEarthAfricaEurope } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'

const ContinentsList = () => {
  const { denominationRef, clickCard } = useRef()

  const db = getFirestore()
  const navigate = useNavigate()

  const denRef = doc(useFirestore(), 'denominations', denominationRef)
  const continentsRef = collection(db, 'continents')
  const q = query(continentsRef, where('denomination', '==', denRef))
  const { status, data, error } = useFirestoreCollectionData(q)
  const continents = data

  return (
    <ApolloWrapper data={data} loading={status === 'loading'} error={error}>
      <Container>
        <Heading>Continents</Heading>

        <Center marginY={10}>
          <GiEarthAfricaEurope size={120} />
        </Center>

        <VStack spacing={2} align="stretch">
          <Button onClick={() => navigate('/directory/create-continent')}>
            Register A Continent
          </Button>
          {continents?.map((continent) => (
            <Button
              key={continent.id}
              variant="outline"
              paddingY={7}
              onClick={() => {
                clickCard(continent.id, 'continent')
                navigate('/trends/continent')
              }}
            >
              {continent.name}
            </Button>
          ))}
        </VStack>
      </Container>
    </ApolloWrapper>
  )
}

export default ContinentsList
