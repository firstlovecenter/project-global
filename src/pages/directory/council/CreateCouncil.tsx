import { Container, Box, Text } from '@chakra-ui/react'
import React from 'react'

function CreateCouncil() {
  return (
    <Container>
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mt={14}>
          Add Council Form
        </Text>
        <Text fontSize="xl" fontWeight="semi-bold" mb={12}>
          First Love Church, Ghana
        </Text>
      </Box>
    </Container>
  )
}

export default CreateCouncil
