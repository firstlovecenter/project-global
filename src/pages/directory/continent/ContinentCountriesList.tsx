import { Button, Center, Container, Heading, VStack } from '@chakra-ui/react'
import { ApolloWrapper } from '@jaedag/admin-portal-react-core'
import { useRef } from 'contexts/RefContext'
import { collection, getFirestore, query, where } from 'firebase/firestore'
import { GiEarthAfricaEurope } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { useFirestoreCollectionData } from 'reactfire'

const CountriesList = () => {
  const { continentRef, clickCard } = useRef()

  const db = getFirestore()
  const navigate = useNavigate()

  const countriesRef = collection(db, 'countries')
  const q = query(countriesRef, where('continentRef', '==', continentRef))
  const { status, data, error } = useFirestoreCollectionData(q)
  const countries = data

  return (
    <ApolloWrapper data={data} loading={status === 'loading'} error={error}>
      <Container>
        <Heading>Countries</Heading>

        <Center marginY={10}>
          <GiEarthAfricaEurope size={120} />
        </Center>

        <VStack spacing={2} align="stretch">
          <Button onClick={() => navigate('/directory/create-country')}>
            Register A Country
          </Button>
          {countries?.map((country) => (
            <Button
              key={country.id}
              variant="outline"
              paddingY={7}
              onClick={() => {
                clickCard(country.id, 'country')
                navigate('/trends/country')
              }}
            >
              {country.name}
            </Button>
          ))}
        </VStack>
      </Container>
    </ApolloWrapper>
  )
}

export default CountriesList
