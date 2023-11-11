import { Flex, Button, Text } from '@chakra-ui/react'
import { pluralize } from 'globalUtils'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type ChurchListHeader = {
  higherLevelName: string
  higherLevelType: string
  subLevelType: string
}

function ChurchListHeader({
  higherLevelName,
  higherLevelType,
  subLevelType,
}: ChurchListHeader) {
  const navigate = useNavigate()
  return (
    <div>
      <Text fontSize="xl" fontWeight="semi-bold" mt={14}>
        {higherLevelName} {higherLevelType}
      </Text>
      <Text fontSize="xl" fontWeight="bold">
        {pluralize(subLevelType, 2)}
      </Text>
      <Flex justify={'flex-end'}>
        <Button
          colorScheme="teal"
          variant="outline"
          mt={4}
          mb={8}
          size={'lg'}
          onClick={() =>
            navigate(`/directory/${subLevelType.toLowerCase()}/create`)
          }
        >
          Add New {subLevelType}
        </Button>
      </Flex>
    </div>
  )
}

export default ChurchListHeader
