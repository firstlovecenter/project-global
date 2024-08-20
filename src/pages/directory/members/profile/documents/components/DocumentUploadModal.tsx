import CustomModal from 'components/CustomModal'
import UploadMemberDocuments from '../UploadMemberDocuments'

interface DocumentUploadModal {
  onClose: () => void
  isOpen: boolean
}
const DocumentUploadModal = ({ onClose, isOpen }: DocumentUploadModal) => {
  return (
    <CustomModal onClose={onClose} isOpen={isOpen}>
      <UploadMemberDocuments />
    </CustomModal>
  )
}

export default DocumentUploadModal
