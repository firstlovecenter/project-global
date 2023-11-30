import { Button, Center, Container, Heading, VStack } from '@chakra-ui/react'
import { ApolloWrapper } from '@jaedag/admin-portal-react-core'
import { useRef } from 'contexts/RefContext'
import { collection, getFirestore, query, where } from 'firebase/firestore'
import { GiEarthAfricaEurope } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { useFirestoreCollectionData } from 'reactfire'

const CampusesList = () => {
  const { councilRef, clickCard } = useRef()

  const db = getFirestore()
  const navigate = useNavigate()

  const campusesRef = collection(db, 'campuses')
  const q = query(campusesRef, where('councilRef', '==', councilRef))
  const { status, data, error } = useFirestoreCollectionData(q)
  const campuses = data

  return (
    <ApolloWrapper data={data} loading={status === 'loading'} error={error}>
      <Container>
        <Heading>Campuses</Heading>

        <Center marginY={10}>
          <GiEarthAfricaEurope size={120} />
        </Center>

        <VStack spacing={2} align="stretch">
          <Button onClick={() => navigate('/directory/create-campus')}>
            Register A Campus
          </Button>
          {campuses?.map((campus) => (
            <Button
              key={campus.id}
              variant="outline"
              paddingY={7}
              onClick={() => {
                clickCard(campus.id, 'campus')
                navigate('/trends/campus')
              }}
            >
              {campus.name}
            </Button>
          ))}
        </VStack>
      </Container>
    </ApolloWrapper>
  )
}

export default CampusesList
