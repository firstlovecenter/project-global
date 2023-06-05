import { Container, Flex, Button, Text } from '@chakra-ui/react'
import ChurchListHeader from 'components/ChurchListHeader'
import DetailCard from 'components/DetailCard'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function CouncilCampusList() {
  const navigate = useNavigate()
  const data = [
    {
      leaderName: 'John Doe',
      leaderPicture: 'https://bit.ly/dan-abramov',
      subLevelName: 'Campus 1',
      subLevelType: 'Campus',
      subLevelWithCount: null,
    },
    {
      leaderName: 'Jane Smith',
      leaderPicture: 'https://bit.ly/dan-abramov',
      subLevelName: 'Campus 2',
      subLevelType: 'Campus',
      subLevelWithCount: null,
    },
    {
      leaderName: 'Michael Johnson',
      leaderPicture: 'https://bit.ly/dan-abramov',
      subLevelName: 'Campus 3',
      subLevelType: 'Campus',
      subLevelWithCount: null,
    },
    {
      leaderName: 'Emily Wilson',
      leaderPicture: 'https://bit.ly/dan-abramov',
      subLevelName: 'Campus 4',
      subLevelType: 'Campus',
      subLevelWithCount: null,
    },
  ]
  return (
    <Container>
      <ChurchListHeader
        higherLevelName={'BJosh'}
        higherLevelType={'Council'}
        subLevelType={'Campus'}
      />

      {data?.map((dat, index) => (
        <DetailCard {...dat} key={index} />
      ))}
    </Container>
  )
}

export default CouncilCampusList
