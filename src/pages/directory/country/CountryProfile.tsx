import { Container, Flex, Box, Text } from '@chakra-ui/react'
import { EditButton, MenuButton } from '@jaedag/admin-portal-react-core'
import LevelProfile from 'components/LevelProfile'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function CountryProfile() {
  const navigate = useNavigate()

  const higherLevelWithSubLevel = [
    {
      level: 'country',
      subLevel: 'councils',
    },
    {
      level: 'council',
      subLevel: 'campuses',
    },
  ]

  const data = [
    { number: 3, text: 'Councils' },
    { number: 4, text: 'Campuses' },
    { number: 5, text: 'Bishops' },
    { number: 6, text: 'Pastors' },
  ]

  return (
    <Container>
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontSize="xl" fontWeight="semi-bold" mt={14}>
            First Love Church
          </Text>
          <Text fontSize="xl" fontWeight="semi-bold" mb={12}>
            Ghana Summary
          </Text>
        </Box>
        <Box>
          <EditButton onClick={() => navigate('/directory/country/create')} />
        </Box>
      </Flex>
      <LevelProfile data={data} {...higherLevelWithSubLevel[0]} />
    </Container>
  )
}

export default CountryProfile
