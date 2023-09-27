import { Container, Text } from '@chakra-ui/react'
import { MenuButton } from '@jaedag/admin-portal-react-core'
import { FaQuestion } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Directory = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Text fontSize="xl" fontWeight="semi-bold" mt={14}>
        First Love Church
      </Text>
      <Text fontSize="xl" fontWeight="semi-bold" mb={12}>
        Denominational Admin
      </Text>
      {[1].map(() => (
        <MenuButton
          icon={FaQuestion}
          color="white"
          title="Directory"
          onClick={() => navigate('/directory/denomination-profile')}
        />
      ))}
    </Container>
  )
}

export default Directory
