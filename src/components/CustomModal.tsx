import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react'

interface CustomModalProps {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
  onClose: () => void
  isOpen: boolean
}

const CustomModal = ({ onClose, isOpen, children }: CustomModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent height={'70vh'}>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CustomModal
