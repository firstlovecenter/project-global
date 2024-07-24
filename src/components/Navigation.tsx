import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useLocation, useNavigate } from 'react-router-dom'
import SplashLogoImage from '../assets/icons/FL_logo.png'
import SplashLogoImageDark from '../assets/icons/FL_logo_dark.png'
import SelectCategory from './SelectCategory'
import { FaBible, FaChurch } from 'react-icons/fa'
import { RiBuilding2Line } from 'react-icons/ri'
import { ActionButton } from './ActionButton'
import SearchBar from './SearchBar'
import ProfileHeader from './ProfileHeader'
import { ColorModeSwitcher } from './ColorModeSwitcher'

function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef(null)
  const navigate = useNavigate()

  const routeParam = useLocation().pathname

  const currentColorMode = useColorModeValue('light', 'dark')

  const DUMMY_CATEGORIES = [
    {
      name: 'Directory',
      path: '/directory',
      icon: FaBible,
    },
    {
      name: 'Churches',
      path: '/churches',
      icon: FaChurch,
    },
    {
      name: 'Buildings & Projects',
      path: '/buildings',
      icon: RiBuilding2Line,
    },
  ]

  if (routeParam === '/login') {
    return null
  }

  if (routeParam === '/login') {
    return null
  }

  return (
    <>
      <IconButton
        aria-label="Side Navigation Toggle"
        size="lg"
        position="fixed"
        boxShadow="dark-lg"
        bottom={4}
        right={6}
        zIndex={2}
        isRound
        ref={btnRef}
        onClick={onOpen}
        icon={<GiHamburgerMenu />}
        display={{ base: 'flex', lg: 'none' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            top={4}
            right={6}
            transform={'translateY(7px)'}
            size={'sm'}
          />
          <DrawerHeader display={'flex'} alignItems={'center'} gap={2}>
            <Box width={'50px'}>
              <img
                src={
                  currentColorMode === 'light'
                    ? SplashLogoImage
                    : SplashLogoImageDark
                }
                alt="Splash Logo"
              />
            </Box>
            <p style={{ fontWeight: 400 }}>Global</p>
          </DrawerHeader>

          <DrawerBody>
            <SelectCategory />
            <VStack
              spacing={1}
              align="stretch"
              width="100%"
              marginTop={20}
              gap={'1.5rem'}
            >
              {DUMMY_CATEGORIES.map((category, index) => (
                <ActionButton
                  key={`${category.name}-${index}`}
                  icon={category.icon}
                  textAlign="start"
                  title={`${category.name}`}
                  pl={0}
                  subtitle={''}
                  onClick={() => {
                    navigate(category.path)
                    onClose()
                  }}
                  variant={'ghost'}
                />
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter p={'1rem 0 '}>
            <Container>
              <SearchBar />
              <Box p={'1rem 0'} borderTop={'1px solid #96A7AF'}>
                <ProfileHeader />
              </Box>
            </Container>
            <ColorModeSwitcher marginLeft={0} marginRight={2.5} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Navigation
