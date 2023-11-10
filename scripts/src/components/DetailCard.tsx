import { Box, Flex, Image, Divider, Text } from '@chakra-ui/react'
import { plural } from 'global-utils'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type SubLevelWithCount = {
  subLevelType: string
  count: number
}

type DetailCardProps = {
  leaderName: string
  leaderPicture: string
  subLevelName: string
  subLevelType: string
  subLevelWithCount: SubLevelWithCount[] | null
}

const DetailCard = ({
  leaderName,
  leaderPicture,
  subLevelName,
  subLevelWithCount,
  subLevelType,
}: DetailCardProps) => {
  const navigate = useNavigate()
  return (
    <Box
      maxHeight="48"
      p={4}
      mb={'8'}
      borderRadius="md"
      boxShadow="lg"
      bgColor={'whiteAlpha.200'}
      onClick={() => {
        navigate(`/directory/${subLevelType.toLowerCase()}-profile`)
      }}
    >
      <Flex alignItems="center">
        <Image
          src={leaderPicture}
          alt="Image Placeholder"
          boxSize="70px"
          mr={4}
          borderRadius="full"
          border="1px"
        />
        <div>
          <Text fontSize="sm" fontWeight="bold">
            {leaderName}
          </Text>
          <Text fontSize="sm">{subLevelName}</Text>
        </div>
      </Flex>
      {subLevelWithCount && (
        <>
          <Divider my={4} />
          <Flex>
            {subLevelWithCount?.map((subLevel, index) => (
              <>
                <Box flex={'1'} textAlign={'center'}>
                  <Text textAlign="center" fontWeight="bold">
                    {subLevel.count}
                  </Text>
                  <Text textAlign="center">
                    {plural(subLevel.subLevelType)}
                  </Text>
                </Box>
                {index !== subLevelWithCount.length - 1 && (
                  <Divider orientation="vertical" height={'14'} />
                )}
              </>
            ))}
          </Flex>
        </>
      )}
    </Box>
  )
}

export default DetailCard
