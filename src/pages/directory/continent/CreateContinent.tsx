import React from 'react'
import CreateUpdateLevel from '../CreateUpdateLevel'
import { Container, Box, Text } from '@chakra-ui/react'

function CreateContinent() {
  return (
    <Container>
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mt={14}>
          Add Continent Form
        </Text>
        <Text fontSize="xl" fontWeight="semi-bold" mb={12}>
          First Love Church
        </Text>
      </Box>
      <CreateUpdateLevel />
    </Container>
  )
}

export default CreateContinent
