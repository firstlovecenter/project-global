import { Container, Flex, Box, Text } from '@chakra-ui/react'
import { EditButton, MenuButton } from '@jaedag/admin-portal-react-core'
import LevelProfile from 'components/LevelProfile'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function CampusProfile() {
  const navigate = useNavigate()
  const data = [
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
            Accra Campus Summary
          </Text>
        </Box>
        <Box>
          <EditButton onClick={() => navigate('/directory/campus/create')} />
        </Box>
      </Flex>
      <LevelProfile data={data} />
    </Container>
  )
}

export default CampusProfile
