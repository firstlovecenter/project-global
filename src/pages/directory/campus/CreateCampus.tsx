import { Container, Text, Box } from '@chakra-ui/react'
import React from 'react'
import CreateUpdateLevel from '../CreateUpdateLevel'

function CreateCampus() {
  return (
    <Container>
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mt={14}>
          Add Campus Form
        </Text>
        <Text fontSize="xl" fontWeight="semi-bold" mb={12}>
          First Love Church, Ghana - Council 1
        </Text>
      </Box>
      <CreateUpdateLevel />
    </Container>
  )
}

export default CreateCampus
