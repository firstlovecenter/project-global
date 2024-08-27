import React from 'react'
import {
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import SearchBar from './SearchBar'
import ProfileHeader from './ProfileHeader'
import DesktopNavigationBar from './DesktopNavigationBar'
import { useNavigate } from 'react-router-dom'

interface DesktopNavigationExtendedProps {
  isOpen: boolean
  onClose: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  btnRef: any
  categories: {
    name: string
    path: string
  }[]
  onOpen: () => void
}

const DesktopNavigationExtended = (props: DesktopNavigationExtendedProps) => {
  const navigate = useNavigate()

  const { isOpen, onClose, btnRef, categories, onOpen } = props

  console.log('categories', categories)

  return (
    <>
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
            transform={'translateY(5px)'}
            size={'sm'}
            mt={5}
          />
          <DrawerHeader
            display={'flex'}
            alignItems={'center'}
            gap={2}
            my={1}
            mt={5}
          >
            <p style={{ fontWeight: 400, marginLeft: '3rem' }}>Global</p>
          </DrawerHeader>
          <DrawerBody>
            <VStack
              spacing={1}
              align="stretch"
              width="100%"
              marginTop={4}
              pl={12}
            >
              <DesktopNavigationBar onOpen={onOpen} />

              <SearchBar isOpen={isOpen} />

              <VStack align="stretch" gap={'1.7rem'} mt={1}>
                {categories.map(({ name, path }) => (
                  <Text
                    onClick={() => {
                      navigate(path)
                      onClose()
                    }}
                    cursor={'pointer'}
                    key={name}
                    fontSize={'xl'}
                    mb={'0.2rem'}
                  >
                    {name}
                  </Text>
                ))}
              </VStack>
            </VStack>
          </DrawerBody>

          <DrawerFooter p={'1rem 0 '}>
            <Container pl={'3rem'} mb={'7.4rem'} width={'16rem'}>
              <ProfileHeader isOpen={isOpen} />
            </Container>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default DesktopNavigationExtended
