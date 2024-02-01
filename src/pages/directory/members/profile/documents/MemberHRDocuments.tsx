import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from 'redux-config/store'
import ProfileAvatar from './components/ProfileAvatar'
import FileUpload from './components/FileUpload'
import { useForm } from 'react-hook-form'
import { FaCheckCircle } from 'react-icons/fa'

const MemberHRDocuments = () => {
  const member = useSelector((state: RootState) => state.member.data)

  const fields = [
    {
      key: 'Resident Permit',
      value: member.docResidentPermit,
    },
    {
      key: 'Application To Be Self Sufficient',
      value: member.docSelfSufficient,
    },
    {
      key: 'Confidientiality Agreement',
      value: member.docConfidentialityAgreement,
    },
    {
      key: 'Memorandum of Understanding',
      value: member.docMemorandumOfUnderstanding,
    },
    {
      key: 'Lay Missions Memorandum of Understanding',
      value: member.docLayMissionsMemorandumOfUnderstanding,
    },
    {
      key: 'Missionary Starter Package',
      value: member.docMissionaryStarterPackage,
    },
    {
      key: 'Conflict Management and Resolution',
      value: member.docConflictManagementAndResolution,
    },
    {
      key: 'Missionary Sending Agreement',
      value: member.docMissionarySendingAgreement,
    },
  ]

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      document: '',
    },
  })
  const onSubmit = (values: { document: string }) => {
    console.log('onSubmit values', values)
  }

  return (
    <>
      <Container>
        <Heading>HR Documents</Heading>

        <Box marginY={10}>
          <ProfileAvatar member={member} />
        </Box>

        <Grid gap={3}>
          {fields.map((field) => (
            <GridItem key={field.key}>
              <Card>
                <CardHeader paddingY={2}>
                  <Text fontWeight="bold">{field.key}</Text>
                </CardHeader>
                <CardBody>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FileUpload
                      uploadPreset={'developer-tests'}
                      control={control}
                      errors={errors}
                      setValue={setValue}
                      name="document"
                    />
                  </form>
                  {field.value ? (
                    <FaCheckCircle />
                  ) : (
                    <Text color="gray">Not Uploaded</Text>
                  )}
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default MemberHRDocuments
