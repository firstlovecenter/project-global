import { Box, Container, Flex, Text } from '@chakra-ui/react'
import LevelProfile from 'components/LevelProfile'
import { useNavigate } from 'react-router-dom'

const DenominationProfile = () => {
  const data = [
    { number: 1, text: 'Continents' },
    { number: 2, text: 'Countries' },
    { number: 3, text: 'Councils' },
    { number: 4, text: 'Campuses' },
    { number: 5, text: 'Bishops' },
    { number: 6, text: 'Pastors' },
  ]

  const higherLevelWithSubLevel = [
    {
      level: 'denomination',
      subLevel: 'continents',
    },
    {
      level: 'continent',
      subLevel: 'Countries',
    },
    {
      level: 'country',
      subLevel: 'councils',
    },
    {
      level: 'council',
      subLevel: 'campuses',
    },
  ]

  return (
    <Container>
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontSize="xl" fontWeight="semi-bold" mt={14}>
            First Love Church
          </Text>
          <Text fontSize="xl" fontWeight="semi-bold" mb={12}>
            Denominational Summary
          </Text>
        </Box>
        {/* <Box>
          <EditButton onClick={() => navigate('#')} />
        </Box> */}
      </Flex>
      <LevelProfile data={data} {...higherLevelWithSubLevel[0]} />
    </Container>
  )
}

export default DenominationProfile
