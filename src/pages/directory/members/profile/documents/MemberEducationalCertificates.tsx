import { Box, Container, Heading } from '@chakra-ui/react'
import { RootState } from 'redux-config/store'
import DocumentUpload from './components/DocumentUpload'
import ProfileAvatar from './components/ProfileAvatar'
import { useSelector } from 'react-redux'

const MemberEducationalCertificates = () => {
  const member = useSelector((state: RootState) => state.member.data)
  return (
    <Container>
      <Heading textAlign={'center'} mb={10}>
        Educational Certificates
      </Heading>
      <ProfileAvatar member={member} />
      <Box mt={10}>
        <DocumentUpload title="Bachelor Degree" />
      </Box>
    </Container>
  )
}

export default MemberEducationalCertificates
