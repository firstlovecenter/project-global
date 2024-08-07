import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'redux-config/store'
import ProfileAvatar from './components/ProfileAvatar'
import FileUpload from './components/FileUpload'
import { useForm, useFormState } from 'react-hook-form'
import { FaCheckCircle } from 'react-icons/fa'
import { DIRECTORY_FUNCTION_BASE_URL } from 'firebase/cloudFunctionsConfig'
import { useRef } from 'react'

type Field = {
  key: string
  value: string | undefined
  variable:
    | 'docResidentPermit'
    | 'docSelfSufficient'
    | 'docConfidentialityAgreement'
    | 'docMemorandumOfUnderstanding'
    | 'docLayMissionsMemorandumOfUnderstanding'
    | 'docMissionaryStarterPackage'
    | 'docConflictManagementAndResolution'
    | 'docMissionarySendingAgreement'
}

const MemberHRDocuments = () => {
  const member = useSelector((state: RootState) => state.member.data)
  const dispatch = useDispatch()
  const toast = useToast()

  const fields: Field[] = [
    {
      key: 'Resident Permit',
      value: member?.docResidentPermit,
      variable: 'docResidentPermit',
    },
    {
      key: 'Application To Be Self Sufficient',
      value: member?.docSelfSufficient,
      variable: 'docSelfSufficient',
    },
    {
      key: 'Confidientiality Agreement',
      value: member?.docConfidentialityAgreement,
      variable: 'docConfidentialityAgreement',
    },
    {
      key: 'Memorandum of Understanding',
      value: member?.docMemorandumOfUnderstanding,
      variable: 'docMemorandumOfUnderstanding',
    },
    {
      key: 'Lay Missions Memorandum of Understanding',
      value: member?.docLayMissionsMemorandumOfUnderstanding,
      variable: 'docLayMissionsMemorandumOfUnderstanding',
    },
    {
      key: 'Missionary Starter Package',
      value: member?.docMissionaryStarterPackage,
      variable: 'docMissionaryStarterPackage',
    },
    {
      key: 'Conflict Management and Resolution',
      value: member?.docConflictManagementAndResolution,
      variable: 'docConflictManagementAndResolution',
    },
    {
      key: 'Missionary Sending Agreement',
      value: member?.docMissionarySendingAgreement,
      variable: 'docMissionarySendingAgreement',
    },
  ]

  const saveChangeRef = useRef<HTMLButtonElement>(null)

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      docResidentPermit: member?.docResidentPermit,
      docSelfSufficient: member?.docSelfSufficient,
      docConfidentialityAgreement: member?.docConfidentialityAgreement,
      docMemorandumOfUnderstanding: member?.docMemorandumOfUnderstanding,
      docLayMissionsMemorandumOfUnderstanding:
        member?.docLayMissionsMemorandumOfUnderstanding,
      docMissionaryStarterPackage: member?.docMissionaryStarterPackage,
      docConflictManagementAndResolution:
        member?.docConflictManagementAndResolution,
      docMissionarySendingAgreement: member?.docMissionarySendingAgreement,
    },
  })

  const { defaultValues } = useFormState({ control })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (values: any) => {
    try {
      const response = await fetch(DIRECTORY_FUNCTION_BASE_URL + '/member', {
        method: 'PUT',
        body: JSON.stringify({
          ...member,
          ...values,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorMessage = await response.text()
        console.error(response.statusText)
        throw new Error(errorMessage)
      }

      dispatch({
        type: 'member/setMemberBio',
        payload: {
          ...member,
          ...values,
        },
      })

      toast({
        title: 'Changes Saved!',
        description: 'Member updated successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        render: () => (
          <Box color="white" p={3} bg="green.500">
            <Flex>
              <FaCheckCircle />
              <Text paddingLeft={3}>Saved Successfully!</Text>
            </Flex>
          </Box>
        ),
      })
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast({
          title: 'An error occurred creating member',
          description: e.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    }
  }

  return (
    <>
      <Container>
        <Heading textAlign={'center'}>HR Documents</Heading>

        <Box marginY={10}>
          <ProfileAvatar member={member} />
        </Box>

        <Grid gap={3}>
          {fields.map((field) => (
            <GridItem key={field.key}>
              <Card>
                <CardHeader paddingY={2}>
                  <Text fontWeight="bold" textAlign={'center'}>
                    {field.key}
                  </Text>
                </CardHeader>
                <CardBody>
                  {field.value && (
                    <Center marginY={5}>
                      <Button
                        onClick={() => {
                          window.open(field.value, '_blank')
                        }}
                      >
                        View
                      </Button>
                    </Center>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FileUpload
                      uploadPreset={'developer-tests'}
                      control={control}
                      errors={errors}
                      value={field.value}
                      setValue={setValue}
                      name={field.variable}
                    />

                    {defaultValues &&
                      defaultValues[field.variable] !==
                        watch(field.variable) && (
                        <Center>
                          <Button
                            type="submit"
                            colorScheme="green"
                            size="sm"
                            disabled={!isValid}
                            marginY={10}
                            isLoading={isSubmitting}
                            ref={saveChangeRef}
                            // display="none"
                          >
                            Save Changes
                          </Button>
                        </Center>
                      )}
                  </form>
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
