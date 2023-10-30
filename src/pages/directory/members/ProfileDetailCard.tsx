import { Card, CardBody, CardHeader, Text } from '@chakra-ui/react'
import React from 'react'

const ProfileDetailCard = ({
  title,
  detail,
}: {
  title: string
  detail: string
}) => {
  return (
    <Card backgroundColor="blackAlpha.500" marginBottom={2}>
      <CardHeader paddingY={1}>
        <Text fontWeight="bold" color="gray">
          {title.toUpperCase()}
        </Text>
      </CardHeader>
      <CardBody paddingY={2}>
        <Text fontSize="xl">{detail}</Text>
      </CardBody>
    </Card>
  )
}

export default ProfileDetailCard
