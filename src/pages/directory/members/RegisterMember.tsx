import { Button, Center, Container, Heading, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  GENDER_OPTIONS,
  ImageUpload,
  Input,
  MARITAL_STATUS_OPTIONS,
  PHONE_NUM_REGEX,
  Select,
} from '@jaedag/admin-portal-react-core'
import { parsePhoneNumber } from '@jaedag/admin-portal-types'
import SearchCampus from 'components/forms/SearchCampus'
import { useRef } from 'contexts/RefContext'
import { useUser } from 'contexts/UserContext'
import { httpsCallable } from 'firebase/functions'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useFunctions } from 'reactfire'
import * as Yup from 'yup'

const RegisterMember = () => {
  const { user } = useUser()
  const { clickCard } = useRef()
  const navigate = useNavigate()
  const initialValues = {
    pictureUrl: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    whatsappNumber: '',
    gender: 'Male',
    maritalStatus: 'Single',
    occupation: '',
    dateOfBirth: '',
    campus: '',
  }

  const validationSchema = Yup.object({
    pictureUrl: Yup.string().required('You must upload a picture'),
    firstName: Yup.string().required(),
    middleName: Yup.string(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    phoneNumber: Yup.string()
      .matches(
        PHONE_NUM_REGEX,
        `Phone Number must start with + and country code (eg. '+233')`
      )
      .required('Phone Number is required'),
    whatsappNumber: Yup.string()
      .required('Whatsapp Number is required')
      .matches(
        PHONE_NUM_REGEX,
        `Phone Number must start with + and country code (eg. '+233')`
      ),
    gender: Yup.string().required(),
    maritalStatus: Yup.string().required(),
    occupation: Yup.string().required(),
    dateOfBirth: Yup.date()
      .max(new Date(), "You can't be born after today")
      .required('Date of Birth is a required field'),
    campus: Yup.string().required(),
  })

  const toast = useToast()
  const functions = useFunctions()

  const onSubmit = async (values: typeof initialValues) => {
    values.whatsappNumber = parsePhoneNumber(values.whatsappNumber)
    values.phoneNumber = parsePhoneNumber(values.phoneNumber)

    try {
      const signup = httpsCallable(functions, 'directory/create-user')

      signup({
        ...values,
        whatsappNumber: values.whatsappNumber,
        parsePhoneNumber: values.phoneNumber,
        dateOfBirth: new Date(values.dateOfBirth),
      })

      // await signup(values.email, 'rAnd0MLEtters0')
      // await resetPassword(values.email)
      clickCard(parsePhoneNumber(values.whatsappNumber), 'member')

      navigate('/member/profile')
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast({
          title: 'An error occurred.',
          description: e.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    }
  }

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<typeof initialValues>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  })

  return (
    <Container>
      <Heading>Register Member</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ImageUpload
          user={user}
          cloudinaryAccount="church-insights"
          uploadPreset="developer-tests"
          name="pictureUrl"
          label="Picture"
          setValue={setValue}
          control={control}
          errors={errors}
        />
        <Input
          name="firstName"
          label="First Name"
          control={control}
          errors={errors}
        />
        <Input
          name="middleName"
          label="Middle Name"
          control={control}
          errors={errors}
        />
        <Input
          name="lastName"
          label="Last Name"
          control={control}
          errors={errors}
        />
        <Input
          name="email"
          label="Email"
          control={control}
          errors={errors}
          type="email"
        />
        <Input
          name="phoneNumber"
          label="Phone Number"
          control={control}
          errors={errors}
          type="tel"
        />
        <Input
          name="whatsappNumber"
          label="WhatsApp Number"
          control={control}
          errors={errors}
          type="tel"
        />

        <Select
          name="gender"
          label="Gender"
          control={control}
          errors={errors}
          options={GENDER_OPTIONS}
        />
        <Select
          name="maritalStatus"
          label="Marital Status"
          control={control}
          errors={errors}
          options={MARITAL_STATUS_OPTIONS}
        />
        <Input
          name="occupation"
          label="Occupation"
          control={control}
          errors={errors}
        />
        <Input
          name="dateOfBirth"
          label="Date of Birth"
          control={control}
          errors={errors}
          type="date"
        />
        <SearchCampus
          name="campus"
          label="Campus"
          control={control}
          errors={errors}
          setValue={setValue}
          placeholder="Search for a campus"
        />

        <Center>
          <Button type="submit" marginTop={5} isLoading={isSubmitting}>
            Submit
          </Button>
        </Center>
      </form>
    </Container>
  )
}

export default RegisterMember
