import ProfileAvatar from './components/ProfileAvatar'
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
import { getHumanReadableDate } from '@jaedag/admin-portal-types'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'redux-config/store'

const MemberBioData = () => {
  const member = useSelector((state: RootState) => state.member.data)
  const navigate = useNavigate()

  const fields = [
    {
      key: 'First Name',
      value: member.firstName,
    },
    {
      key: 'Middle Name',
      value: member.middleName,
    },
    {
      key: 'Last Name',
      value: member.lastName,
    },
    {
      key: 'Email',
      value: member.email,
    },
    {
      key: 'Phone Number',
      value: member.phoneNumber,
    },
    {
      key: 'WhatsApp Number',
      value: member.whatsappNumber,
    },
    {
      key: 'Gender',
      value: member.gender,
    },
    {
      key: 'Marital Status',
      value: member.maritalStatus,
    },
    {
      key: 'Occupation',
      value: member.occupation,
    },
    {
      key: 'Employee Status',
      value: member.employeeStatus,
    },
    {
      key: 'Date of Birth',
      value: getHumanReadableDate(member.dateOfBirth),
    },
  ]

  return (
    <>
      <Container>
        <Heading>Bio Data</Heading>

        <Box marginY={10}>
          <ProfileAvatar member={member} />
          <Center marginTop={5}>
            <Button
              size="sm"
              onClick={() => navigate('/member/documents/bio-data/edit')}
            >
              Edit Bio Details
            </Button>
          </Center>
        </Box>

        <Table variant="unstyled" size="sm">
          <Tbody>
            {fields.map((field) => (
              <Tr key={field.key}>
                <Td color="whiteAlpha.700">{field.key}</Td>
                <Td>{field.value}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </>
  )
}

export default MemberBioData
