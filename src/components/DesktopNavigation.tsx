import React, { FC } from 'react'
import {
  Box,
  Container,
  IconButton,
  Img,
  Portal,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import SplashLogo from 'assets/icons/FL_logo.png'
import SplashLogoDark from 'assets/icons/FL_logo_dark.png'
import { FaHome, FaSearch, FaBible, FaChurch } from 'react-icons/fa'
import { RiBuilding2Line, RiLogoutBoxRLine } from 'react-icons/ri'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/AuthContext'
import { ColorModeSwitcher } from './ColorModeSwitcher'

const DesktopNavigation: FC = () => {
  const [error, setError] = React.useState('')

  const currentColorMode = useColorModeValue('light', 'dark')
  const route = useLocation().pathname
  const { logout, setUser } = useAuth()

  const navigate = useNavigate()

  const handleLogout = async () => {
    setError('')

    try {
      await logout()
      navigate('/login')
    } catch (error) {
      setError('Failed to log out')
    }
  }

  return (
    <Portal>
      <Container
        position="absolute"
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
          <Link to={'/home'}>
            <FaHome size={20} fill={route === '/' ? '#DDB995' : 'white'} />
          </Link>
          <Link to={'/directory'}>
            <FaBible size={20} />
          </Link>
          <Link to={'/churches'}>
            <FaChurch size={20} />
          </Link>
          <Link to={'/buildings'}>
            <RiBuilding2Line size={20} />
          </Link>
        </VStack>
        <VStack justifySelf={'flex-end'} mt={'auto'} gap={6}>
          <Box borderRadius={'5000px'} p={0} overflow={'hidden'} width={'40px'}>
            <Img src="https://via.placeholder.com/150" />
          </Box>
          <IconButton
            bg={'transparent'}
            onClick={handleLogout}
            aria-label="Logout"
            icon={<RiLogoutBoxRLine size={25} />}
            variant={'ghost'}
          />
          <ColorModeSwitcher ml={0} />
        </VStack>
      </Container>
    </Portal>
  )
}

export default DesktopNavigation
