import { Container } from '@chakra-ui/react'
import ChurchListHeader from 'components/ChurchListHeader'
import DetailCard from 'components/DetailCard'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function CountryCouncilList() {
  const navigate = useNavigate()
  const data = [
    {
      leaderName: 'John Doe',
      leaderPicture: 'https://bit.ly/dan-abramov',
      subLevelName: 'Council 1',
      subLevelType: 'Council',
      subLevelWithCount: [
        {
          subLevelType: 'Campus',
          count: 7,
        },
      ],
    },
    {
      leaderName: 'Jane Smith',
      leaderPicture: 'https://bit.ly/dan-abramov',
      subLevelName: 'Council 2',
      subLevelType: 'Council',
      subLevelWithCount: [
        {
          subLevelType: 'Campus',
          count: 12,
        },
      ],
    },
    {
      leaderName: 'Michael Johnson',
      leaderPicture: 'https://bit.ly/dan-abramov',
      subLevelName: 'Council 3',
      subLevelType: 'Council',
      subLevelWithCount: [
        {
          subLevelType: 'Campus',
          count: 15,
        },
      ],
    },
    {
      leaderName: 'Emily Wilson',
      leaderPicture: 'https://bit.ly/dan-abramov',
      subLevelName: 'Council 4',
      subLevelType: 'Council',
      subLevelWithCount: [
        {
          subLevelType: 'Campus',
          count: 11,
        },
      ],
    },
  ]
  return (
    <Container>
      <ChurchListHeader
        higherLevelName={'Ghana'}
        higherLevelType={'Country'}
        subLevelType={'Council'}
      />
      {data?.map((dat, index) => (
        <DetailCard {...dat} key={index} />
      ))}
    </Container>
  )
}

export default CountryCouncilList
