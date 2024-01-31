import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'redux-config/store'
import ProfileAvatar from './components/ProfileAvatar'

const MemberPossessions = () => {
  const member = useSelector((state: RootState) => state.member.data)
  const navigate = useNavigate()

  const fields = [
    {
      key: 'Houses Owned',
      value: member.housesOwned,
    },
    {
      key: 'Cars Owned',
      value: member.carsOwned,
    },
  ]

  return (
    <>
      <Container>
        <Heading>Possessions Data</Heading>

        <Box marginY={10}>
          <ProfileAvatar member={member} />
          <Center marginTop={5}>
            <Button
              size="sm"
              onClick={() => navigate('/member/documents/possessions/edit')}
            >
              Edit Data
            </Button>
          </Center>
        </Box>

        <Table variant="unstyled" size="sm">
          <Tbody>
            {fields.map((field) => (
              <Tr key={field.key}>
                <Td color="whiteAlpha.700">{field.key}</Td>
                <Td>{field.value ?? 0}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </>
  )
}

export default MemberPossessions
