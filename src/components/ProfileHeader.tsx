import { Box, Button, HStack, Text } from '@chakra-ui/react'
import { useUser } from 'contexts/UserContext'
import useCustomColors from 'hooks/useCustomColors'
import CustomAvatar from './chakra-custom/CustomAvatar'

function ProfileHeader() {
  const { user } = useUser()
  const { textPrimary, textSecondary, themeAlpha } = useCustomColors()

  return (
    <Button
      colorScheme={themeAlpha.normal}
      textAlign="start"
      justifyContent="flex-start"
      fontWeight="normal"
      width="100%"
      paddingY={8}
    >
      <HStack>
        <CustomAvatar
          size="sm"
          name={user.firstName + ' ' + user.lastName}
          src={user.pictureUrl}
        />

        <Box paddingLeft={3}>
          <Text color={textPrimary}>
            {user.firstName + ' ' + user.lastName}
          </Text>
          <Text color={textSecondary} fontSize="small">
            {user.email}
          </Text>
        </Box>
      </HStack>
    </Button>
  )
}

export default ProfileHeader
