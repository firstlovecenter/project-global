import { Box, Container, Heading } from '@chakra-ui/react'
import DocumentUpload from './components/DocumentUpload'
import ProfileAvatar from './components/ProfileAvatar'
import { RootState } from 'redux-config/store'
import { useSelector } from 'react-redux'

const MemberGovDocuments = () => {
  const member = useSelector((state: RootState) => state.member.data)

  return (
    <Container>
      <Heading textAlign={'center'} mb={10}>
        Government Documents
      </Heading>
      <ProfileAvatar member={member} />
      <Box mt={10}>
        <DocumentUpload title="Passport" />
      </Box>
    </Container>
  )
}

export default MemberGovDocuments
