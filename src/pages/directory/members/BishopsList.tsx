import { Container, Divider, Heading } from '@chakra-ui/react'
import SearchBar from 'components/SearchBar'

const BishopsList = () => {
  const array = [1, 2, 3, 4, 5]

  return (
    <Container>
      <Heading>Bishop Directory</Heading>

      <SearchBar />

      {array.map(() => (
        <>
          <Divider marginTop={5} />
        </>
      ))}
    </Container>
  )
}

export default BishopsList
