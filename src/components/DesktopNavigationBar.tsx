import {
  Box,
  Container,
  IconButton,
  Img,
  VStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import SplashLogo from 'assets/icons/FL_logo.png'
import SplashLogoDark from 'assets/icons/FL_logo_dark.png'
import { FaSearch } from 'react-icons/fa'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { useUser } from 'contexts/UserContext'
import CustomAvatar from './chakra-custom/CustomAvatar'
import HomeIcon from 'assets/icons/HomeIcon'
import DirectoryIcon from 'assets/icons/DirectoryIcon'
import ChurchIcon from 'assets/icons/ChurchIcon'
import BuildingIcon from 'assets/icons/BuildingIcon'

interface DesktopNavigationBarProps {
  onOpen: () => void
}

const DesktopNavigationBar = (props: DesktopNavigationBarProps) => {
  const { onOpen } = props
  const { logout, setUser } = useAuth()
  const { user } = useUser()
  const navigate = useNavigate()
  const currentColorMode = useColorModeValue('light', 'dark')
  const toast = useToast()

  const handleLogout = async () => {
    toast({
      title: 'Logged out',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    try {
      await logout()
      setUser(user)
      navigate('/login')
    } catch (error) {
      toast({
        title: 'Failed to log out',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Container
      position="fixed"
      top={0}
      left={0}
      bottom={0}
      width={'60px'}
      display={{ base: 'none', lg: 'flex' }}
      py={4}
      px={2}
      flexDirection={'column'}
      color={'white'}
      bg={'#14213D'}
      zIndex={2}
    >
      <Box mt={4}>
        <Img src={currentColorMode === 'light' ? SplashLogo : SplashLogoDark} />
      </Box>
      <VStack mt={20} gap={9}>
        <FaSearch size={20} onClick={onOpen} cursor={'pointer'} />
        <HomeIcon />
        <DirectoryIcon />
        <ChurchIcon />
        <BuildingIcon />
      </VStack>
      <VStack justifySelf={'flex-end'} mt={'auto'} gap={6}>
        <CustomAvatar
          name={user.firstName + ' ' + user.lastName}
          src={user.pictureUrl}
        />

        <IconButton
          bg={'transparent'}
          onClick={handleLogout}
          aria-label="Logout"
          icon={<RiLogoutBoxRLine size={25} />}
          variant={'ghost'}
          colorScheme="black"
        />
        <ColorModeSwitcher ml={0} />
      </VStack>
    </Container>
  )
}

export default DesktopNavigationBar
