import React, { FC } from 'react'
import {
  Container,
  IconButton,
  Img,
  Portal,
  VStack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react'
import SplashLogo from 'assets/icons/FL_logo.png'
import SplashLogoDark from 'assets/icons/FL_logo_dark.png'
import { FaHome, FaSearch, FaBible, FaChurch } from 'react-icons/fa'
import { RiBuilding2Line, RiLogoutBoxRLine } from 'react-icons/ri'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { useUser } from 'contexts/UserContext'
import CustomAvatar from './chakra-custom/CustomAvatar'

const DesktopNavigation: FC = () => {
  const toast = useToast()

  const currentColorMode = useColorModeValue('light', 'dark')
  const route = useLocation().pathname
  const { logout, setUser } = useAuth()
  const { user } = useUser()

  const navigate = useNavigate()

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
    <Portal>
      <Container
        position="fixed"
        top={0}
        left={0}
        bottom={0}
        width={'60px'}
        display={{ base: 'none', md: 'flex' }}
        py={4}
        px={2}
        flexDirection={'column'}
        color={'white'}
        bg={'#14213D'}
      >
        <Img src={currentColorMode === 'light' ? SplashLogo : SplashLogoDark} />
        <VStack mt={20} gap={6}>
          <FaSearch size={20} />

          <IconButton
            onClick={() => navigate('/')}
            colorScheme={route === '/' ? 'yellow' : 'white'}
            variant="outline"
            aria-label="home button"
            border="none"
            icon={<FaHome size={20} />}
          />

          <IconButton
            onClick={() => navigate('/directory')}
            colorScheme={route === '/directory' ? 'yellow' : 'white'}
            variant="outline"
            aria-label="directory button"
            border="none"
            icon={<FaBible size={20} />}
          />

          <IconButton
            onClick={() => navigate('/churches')}
            colorScheme={route === '/churches' ? 'yellow' : 'white'}
            variant="outline"
            aria-label="churches button"
            border="none"
            icon={<FaChurch size={20} />}
          />

          <IconButton
            onClick={() => navigate('/buildings')}
            colorScheme={route === '/buildings' ? 'yellow' : 'white'}
            variant="outline"
            aria-label="buildings button"
            border="none"
            icon={<RiBuilding2Line size={20} />}
          />
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
    </Portal>
  )
}

export default DesktopNavigation
