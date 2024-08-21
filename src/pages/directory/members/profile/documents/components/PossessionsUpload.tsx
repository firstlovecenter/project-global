import { Box, useDisclosure } from '@chakra-ui/react'
import DesktopUploadButton from 'components/DesktopUploadButton'
import DocumentUploadModal from './DocumentUploadModal'

const PossessionsUpload = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box width="fit-content" float={'right'} mt={8}>
      <DesktopUploadButton onClick={onOpen} />
      <DocumentUploadModal isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export default PossessionsUpload
