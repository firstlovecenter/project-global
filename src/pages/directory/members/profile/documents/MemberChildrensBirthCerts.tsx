import { Box, Container, Heading } from '@chakra-ui/react'
import ProfileAvatar from './components/ProfileAvatar'
import DocumentUpload from './components/DocumentUpload'
import { useSelector } from 'react-redux'
import { RootState } from 'redux-config/store'

const MemberChildrensBirthCerts = () => {
  const member = useSelector((state: RootState) => state.member.data)

  return (
    <Container>
      <Heading textAlign={'center'} mb={10}>
        Children's Birth Certificates
      </Heading>
      <ProfileAvatar member={member} />
      <Box mt={10} alignItems={'center'} justifyContent={'center'}>
        <DocumentUpload title="Birth Certificate" />
      </Box>
    </Container>
  )
}

export default MemberChildrensBirthCerts
