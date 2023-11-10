import { Box, Badge, Divider, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type CardDetailsProps = {
  number: number
  text: string
}

type LevelProfileProps = {
  level?: string
  subLevel?: string
  data: CardDetailsProps[]
}

const LevelProfile = ({ level, subLevel, data }: LevelProfileProps) => {
  const navigate = useNavigate()

  return (
    <Box
      p={4}
      border="1px solid #DBDBDB"
      borderRadius={'lg'}
      bgColor={'whiteAlpha.200'}
    >
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <Box
            key={index}
            display="flex"
            alignItems="center"
            onClick={() => {
              index === 0 &&
                level &&
                subLevel &&
                navigate(`/directory/${level}/${subLevel}`)
            }}
          >
            <Badge
              boxSize={'16'}
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg="#E6E6E6"
              color="blue.500"
              fontSize={'2xl'}
              mr={'8'}
            >
              {item.number}
            </Badge>
            <Text fontSize="lg" px={0} mr={4}>
              {item.text}
            </Text>
            {index === 0 && data[0].text !== 'Bishops' && (
              <Box flex={1}>
                <Text
                  fontSize={'2xl'}
                  mr={2}
                  color="blue.500"
                  display={'flex'}
                  justifyContent={'flex-end'}
                >
                  {' > '}
                </Text>
              </Box>
            )}
          </Box>
          {index !== data.length - 1 && <Divider my={4} />}
        </React.Fragment>
      ))}
    </Box>
  )
}

export default LevelProfile
