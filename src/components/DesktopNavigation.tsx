import React, { FC } from 'react'
import { Portal, useDisclosure } from '@chakra-ui/react'
import DesktopNavigationBar from './DesktopNavigationBar'
import DesktopNavigationExtended from './DesktopNavigationExtended'
import { DUMMY_CATEGORIES } from '../constants'

const DesktopNavigation: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const btnRef = React.useRef(null)

  const categories = DUMMY_CATEGORIES.map((category) => {
    return { name: category.name, path: category.path }
  })

  categories.unshift({ name: 'Home', path: '/' })

  return (
    <Portal>
      <DesktopNavigationBar onOpen={onOpen} />
      <DesktopNavigationExtended
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        categories={categories}
        onOpen={onOpen}
      />
    </Portal>
  )
}

export default DesktopNavigation
