import { Box, Button, Flex, Text } from '@chakra-ui/react'
import useCustomColors from 'hooks/useCustomColors'

interface Fields {
  fields?: {
    key: string
    link: string
    lastUpdated: string
  }[]
}
const MemberPossessionsDetails = ({ fields }: Fields) => {
  const { yellow, menuBtnBg, tabBg } = useCustomColors()

  return (
    <Flex
      bgColor={tabBg}
      p={'0 32px'}
      borderRadius={10}
      minHeight={350}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={2}
    >
      {fields && fields.length > 0 ? (
        fields.map((field) => (
          <Button
            key={field.key}
            alignItems={'center'}
            justifyContent={'flex-start'}
            gap={4}
            height={'auto'}
            p={'6px'}
            variant={'ghost'}
            minWidth={'100%'}
            borderRadius={'none'}
            borderBottom={'1px solid'}
            borderColor={'whiteAlpha.300'}
          >
            <Box
              width={50}
              height={50}
              borderRadius={'10px'}
              bg={menuBtnBg}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              fontSize={'2xl'}
              color={yellow}
            >
              AB
            </Box>
            <Box textAlign={'left'}>
              <Text pl={0} pr={0}>
                {field.key}
              </Text>
              <Text pl={0} pr={0} fontSize={'13px'}>
                {field.lastUpdated}
              </Text>
            </Box>
          </Button>
        ))
      ) : (
        <Text color={yellow} fontSize={'0.875rem'}>
          You have no possession documents
        </Text>
      )}
    </Flex>
  )
}

export default MemberPossessionsDetails
