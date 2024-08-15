import { Box } from '@chakra-ui/react'
import SelectProfile from './SelectProfile'

const DesktopSelectProfile = () => {
  return (
    <Box
      display={{ base: 'none', lg: 'block' }}
      position={'absolute'}
      top={4}
      right={20}
      minW={'300px'}
    >
      <SelectProfile />
    </Box>
  )
}

export default DesktopSelectProfile
