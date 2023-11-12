import { Card, Text } from '@chakra-ui/react'

const InfoCard = ({
  title,
  value,
}: {
  title: string
  value: string | number
}) => {
  return (
    <Card
      padding={2}
      marginY={2}
      width="20vw"
      height="10vh"
      backgroundColor="whiteAlpha.200"
    >
      <Text as="div" color="brandGold.500" fontWeight="bold">
        {value}
      </Text>
      <Text>{title}</Text>
    </Card>
  )
}

export default InfoCard
