import { Container } from '@chakra-ui/react'
import ChurchListHeader from 'components/ChurchListHeader'
import DetailCard from 'components/DetailCard'

function ContinentCountryList() {
  const data = [
    {
      leaderName: 'John Doe',
      leaderPicture: 'https://bit.ly/dan-abramov',
      subLevelName: 'Ghana',
      subLevelType: 'Country',
      subLevelWithCount: [
        {
          subLevelType: 'Council',
          count: 5,
        },
        {
          subLevelType: 'Campus',
          count: 7,
        },
      ],
    },
    {
      leaderName: 'Jane Smith',
      leaderPicture: 'https://bit.ly/dan-abramov',
      subLevelName: 'Togo',
      subLevelType: 'Country',
      subLevelWithCount: [
        {
          subLevelType: 'Council',
          count: 8,
        },
        {
          subLevelType: 'Campus',
          count: 12,
        },
      ],
    },
    {
      leaderName: 'Michael Johnson',
      leaderPicture: 'https://bit.ly/dan-abramov',
      subLevelName: 'Benin',
      subLevelType: 'Country',
      subLevelWithCount: [
        {
          subLevelType: 'Council',
          count: 9,
        },
        {
          subLevelType: 'Campus',
          count: 15,
        },
      ],
    },
    {
      leaderName: 'Emily Wilson',
      leaderPicture: 'https://bit.ly/dan-abramov',
      subLevelName: 'Nigeria',
      subLevelType: 'Country',
      subLevelWithCount: [
        {
          subLevelType: 'Council',
          count: 6,
        },
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
        higherLevelName={'Africa'}
        higherLevelType={'Continent'}
        subLevelType={'Country'}
      />

      {data?.map((dat, index) => (
        <DetailCard {...dat} key={index} />
      ))}
    </Container>
  )
}

export default ContinentCountryList
