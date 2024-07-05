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
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useLocation, useNavigate } from 'react-router-dom'
import SplashLogoImage from '../assets/icons/FL_logo.png'
import SelectCategory from './SelectCategory'
import { FaBible, FaChurch } from 'react-icons/fa'
import { RiBuilding2Line } from 'react-icons/ri'
import { ActionButton } from './ActionButton'
import SearchBar from './SearchBar'
import ProfileHeader from './ProfileHeader'

function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef(null)
  const navigate = useNavigate()

  const routeParam = useLocation().pathname

  console.log(routeParam)

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
        display={{ base: 'flex', md: 'none' }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="#313B50">
          <DrawerCloseButton
            top={4}
            right={6}
            transform={'translateY(7px)'}
            size={'sm'}
            color={'#96A7AF'}
          />
          <DrawerHeader display={'flex'} alignItems={'center'} gap={2}>
            <Box width={'50px'}>
              <img src={SplashLogoImage} alt="Splash Logo" />
            </Box>
            <p style={{ color: '#96A7AF', fontWeight: 400 }}>Global</p>
          </DrawerHeader>

          <DrawerBody>
            <SelectCategory />
            <VStack
              spacing={2}
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
                    navigate('/home')
                    onClose()
                  }}
                  variant={'ghost'}
                  backgroundColor={'#313B50'}
                  subColor="brandGold.500"
                />
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter p={'1rem 0 '}>
            <Container>
              <SearchBar />
              <Box p={'1rem 0'} borderTop={'1px solid #96A7AF'}>
                <ProfileHeader name="John-Dag Addy" email="jaedagy@gmail.com" />
              </Box>
            </Container>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Navigation
