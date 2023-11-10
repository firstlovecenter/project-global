import { Container, Box, Text } from '@chakra-ui/react'
import React from 'react'
import CreateUpdateLevel from '../CreateUpdateLevel'

function CreateCountry() {
  return (
    <Container>
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mt={14}>
          Add Country Form
        </Text>
        <Text fontSize="xl" fontWeight="semi-bold" mb={12}>
          First Love Church - Africa
        </Text>
      </Box>
      <CreateUpdateLevel />
    </Container>
  )
}

export default CreateCountry
