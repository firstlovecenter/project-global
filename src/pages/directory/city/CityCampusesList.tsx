import { Button, Center, Container, Heading, VStack } from '@chakra-ui/react'
import { ApolloWrapper } from '@jaedag/admin-portal-react-core'
import { useRef } from 'contexts/RefContext'
import { collection, getFirestore, query, where } from 'firebase/firestore'
import { GiEarthAfricaEurope } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { useFirestoreCollectionData } from 'reactfire'

const CitiesList = () => {
  const { countryRef, clickCard } = useRef()

  const db = getFirestore()
  const navigate = useNavigate()

  const citiesRef = collection(db, 'cities')
  const q = query(citiesRef, where('countryRef', '==', countryRef))
  const { status, data, error } = useFirestoreCollectionData(q)
  const cities = data

  return (
    <ApolloWrapper data={data} loading={status === 'loading'} error={error}>
      <Container>
        <Heading>Cities</Heading>

        <Center marginY={10}>
          <GiEarthAfricaEurope size={120} />
        </Center>

        <VStack spacing={2} align="stretch">
          <Button onClick={() => navigate('/directory/create-city')}>
            Register A City
          </Button>
          {cities?.map((city) => (
            <Button
              key={city.id}
              variant="outline"
              paddingY={7}
              onClick={() => {
                clickCard(city.id, 'city')
                navigate('/trends/city')
              }}
            >
              {city.name}
            </Button>
          ))}
        </VStack>
      </Container>
    </ApolloWrapper>
  )
}

export default CitiesList
