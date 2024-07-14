import { Button, Center, Container, Heading, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  PHONE_NUM_REGEX,
} from '@jaedag/admin-portal-react-core'
import { parsePhoneNumber } from '@jaedag/admin-portal-types'
import FormInput from 'components/FormPrimitives/FormInput'
import FormSelect from 'components/FormPrimitives/FormSelect'
import SearchCampus from 'components/forms/SearchCampus'
import ImageUpload from 'components/ImageUpload'
import { useRef } from 'contexts/RefContext'
import { useUser } from 'contexts/UserContext'
import { DIRECTORY_FUNCTION_BASE_URL } from 'firebase/cloudFunctionsConfig'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
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
    employeeStatus: 'non-staff',
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
        /^\+[1-9]\d{1,14}$/,
        `Phone Number must start with + and country code (eg. '+233')`
      ),
    gender: Yup.string().required(),
    maritalStatus: Yup.string().required(),
    occupation: Yup.string().required(),
    employeeStatus: Yup.string().required(),
    dateOfBirth: Yup.date()
      .max(new Date(), "You can't be born after today")
      .required('Date of Birth is a required field'),
    campus: Yup.string().required(),
  })

  const toast = useToast()

  const onSubmit = async (values: typeof initialValues) => {
    values.whatsappNumber = parsePhoneNumber(values.whatsappNumber)
    values.phoneNumber = parsePhoneNumber(values.phoneNumber)

    console.log('🚀 ~ file: RegisterMember.tsx:8 ~ values:', values)

    try {
      const response = await fetch(DIRECTORY_FUNCTION_BASE_URL + '/member', {
        method: 'POST',
        body: JSON.stringify({
          ...values,
          whatsappNumber: values.whatsappNumber,
          parsePhoneNumber: values.phoneNumber,
          dateOfBirth: new Date(values.dateOfBirth),
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

      clickCard(values.email, 'member')

      navigate('/member/profile')
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
    <Container p={10}>
      <Center>
        <Heading>Register Member</Heading>
      </Center>

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
        <FormInput
          name="firstName"
          label="First Name"
          control={control}
          errors={errors}
        />

        <FormInput
          name="middleName"
          label="Middle Name"
          control={control}
          errors={errors}
        />
        <FormInput
          name="lastName"
          label="Last Name"
          control={control}
          errors={errors}
        />
        <FormInput
          name="email"
          label="Email"
          control={control}
          errors={errors}
          type="email"
        />
        <FormInput
          name="dateOfBirth"
          label="Date of Birth"
          control={control}
          errors={errors}
          type="date"
        />
        <FormInput
          name="phoneNumber"
          label="Phone Number"
          control={control}
          errors={errors}
          type="tel"
        />
        <FormInput
          name="whatsappNumber"
          label="WhatsApp Number"
          control={control}
          errors={errors}
          type="tel"
        />

        <FormSelect
          name="gender"
          label="Gender"
          control={control}
          errors={errors}
          options={GENDER_OPTIONS}
        />
        <FormSelect
          name="maritalStatus"
          label="Marital Status"
          control={control}
          errors={errors}
          options={MARITAL_STATUS_OPTIONS}
        />
        <FormInput
          name="occupation"
          label="Occupation"
          control={control}
          errors={errors}
        />
        <FormSelect
          name="employeeStatus"
          label="Employee Status"
          control={control}
          errors={errors}
          options={[
            { key: 'Full Time Staff', value: 'staff' },
            { key: 'Lay/Non Staff', value: 'non-staff' },
          ]}
        />
        <SearchCampus
          name="campus"
          label="Campus"
          control={control}
          errors={errors}
          setValue={setValue}
          placeholder="Search for a campus"
        />

        <Center marginTop={20}>
          <Button type="submit" isLoading={isSubmitting} width="100%">
            Submit
          </Button>
        </Center>
      </form>
    </Container>
  )
}

export default RegisterMember
