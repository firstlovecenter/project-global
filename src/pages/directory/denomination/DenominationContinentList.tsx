import { Container } from '@chakra-ui/react'
import ChurchListHeader from 'components/ChurchListHeader'
import DetailCard from 'components/DetailCard'
import { useNavigate } from 'react-router-dom'

const DenominationContinentList = () => {
  const navigate = useNavigate()
  const data = [
    {
      leaderName: 'John Doe',
      leaderPicture: 'https://bit.ly/dan-abramov',
      subLevelName: 'Africa',
      subLevelType: 'Continent',
      subLevelWithCount: [
        {
          subLevelType: 'Country',
          count: 10,
        },
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
      subLevelName: 'Asia',
      subLevelType: 'Continent',
      subLevelWithCount: [
        {
          subLevelType: 'Country',
          count: 15,
        },
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
      subLevelName: 'North America',
      subLevelType: 'Continent',
      subLevelWithCount: [
        {
          subLevelType: 'Country',
          count: 20,
        },
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
      subLevelName: 'Europe',
      subLevelType: 'Continent',
      subLevelWithCount: [
        {
          subLevelType: 'Country',
          count: 18,
        },
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
        higherLevelName={'First Love Church'}
        higherLevelType={''}
        subLevelType={'Continent'}
      />
      {data?.map((dat, index) => (
        <DetailCard {...dat} key={index} />
      ))}
    </Container>
  )
}

export default DenominationContinentList
