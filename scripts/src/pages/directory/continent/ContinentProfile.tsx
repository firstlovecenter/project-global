import { Box, Container, Flex, Text } from '@chakra-ui/react'
import { EditButton } from '@jaedag/admin-portal-react-core'
import LevelProfile from 'components/LevelProfile'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function ContinentProfile() {
  const navigate = useNavigate()

  const data = [
    { number: 2, text: 'Countries' },
    { number: 3, text: 'Councils' },
    { number: 4, text: 'Campuses' },
    { number: 5, text: 'Bishops' },
    { number: 6, text: 'Pastors' },
  ]

  const higherLevelWithSubLevel = [
    {
      level: 'continent',
      subLevel: 'countries',
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
            Africa Summary
          </Text>
        </Box>
        <Box>
          <EditButton onClick={() => navigate('/directory/continent/create')} />
        </Box>
      </Flex>
      <LevelProfile data={data} {...higherLevelWithSubLevel[0]} />
    </Container>
  )
}

export default ContinentProfile
