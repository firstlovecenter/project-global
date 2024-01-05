import {
  Avatar,
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
import { ApolloWrapper } from '@jaedag/admin-portal-react-core'
import { getHumanReadableDate } from '@jaedag/admin-portal-types'
import { useRef } from 'contexts/RefContext'
import { doc } from 'firebase/firestore'
import { useFirestore, useFirestoreDocData } from 'reactfire'
import { Member } from 'types/types'

const MemberBioData = () => {
  const { memberRef } = useRef()
  const memRef = doc(useFirestore(), 'members', memberRef)

  const { status, data, error } = useFirestoreDocData(memRef)
  const member = data as unknown as Member

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
      value: getHumanReadableDate(member.dateOfBirth.toDate().toString()),
    },
  ]

  return (
    <ApolloWrapper data={data} loading={status === 'loading'} error={error}>
      <Container>
        <Heading>Bio Data</Heading>

        <Box marginY={10}>
          <Center>
            <Avatar
              name={member.firstName + ' ' + member.lastName}
              src={member.pictureUrl}
              size="2xl"
            />
          </Center>
          <Center marginTop={5}>
            <Button size="sm">Edit Bio Details</Button>
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
    </ApolloWrapper>
  )
}

export default MemberBioData
