import { Container, Flex, Box, Text } from '@chakra-ui/react'
import { EditButton, MenuButton } from '@jaedag/admin-portal-react-core'
import LevelProfile from 'components/LevelProfile'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function CouncilProfile() {
  const navigate = useNavigate()
  const higherLevelWithSubLevel = [
    {
      level: 'council',
      subLevel: 'campuses',
    },
  ]

  const data = [
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
            BJosh Council Summary
          </Text>
        </Box>
        <Box>
          <EditButton onClick={() => navigate('/directory/council/create')} />
        </Box>
      </Flex>
      <LevelProfile data={data} {...higherLevelWithSubLevel[0]} />
    </Container>
  )
}

export default CouncilProfile
