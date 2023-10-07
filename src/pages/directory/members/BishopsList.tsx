import {
  Avatar,
  Box,
  Container,
  Divider,
  HStack,
  Heading,
  Text,
} from '@chakra-ui/react'
import MemberListCard from 'components/MemberListCard'
import SearchBar from 'components/SearchBar'
import React from 'react'

const BishopsList = () => {
  const member = {
    firstName: 'Isaac',
    lastName: 'Agyeman',
    picture: 'https://bit.ly/dan-abramov',
  }
  const church = { name: 'Africa West', typename: 'Family' }
  const array = [1, 2, 3, 4, 5]

  return (
    <Container>
      <Heading>Bishop Directory</Heading>

      <SearchBar />

      {array.map(() => (
        <>
          <MemberListCard
            member={member}
            subtitle={church.name + ' ' + church.typename}
          />
          <Divider marginTop={5} />
        </>
      ))}
    </Container>
  )
}

export default BishopsList
