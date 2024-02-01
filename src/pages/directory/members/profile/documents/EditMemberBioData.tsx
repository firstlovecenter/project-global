import { Button, Center, Container, Heading, useToast } from '@chakra-ui/react'
import {
  GENDER_OPTIONS,
  ImageUpload,
  Input,
  MARITAL_STATUS_OPTIONS,
  Select,
} from '@jaedag/admin-portal-react-core'
import { parsePhoneNumber } from '@jaedag/admin-portal-types'
import { useRef } from 'contexts/RefContext'
import { useUser } from 'contexts/UserContext'
import { DIRECTORY_FUNCTION_BASE_URL } from 'firebase/cloudFunctionsConfig'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'redux-config/store'

const EditMemberBioData = () => {
  const { user } = useUser()
  const { clickCard } = useRef()
  const member = useSelector((state: RootState) => state.member.data)
  const navigate = useNavigate()
  const toast = useToast()
  const dispatch = useDispatch()

  const initialValues = {
    firstName: member.firstName,
    middleName: member.middleName,
    lastName: member.lastName,
    email: member.email,
    phoneNumber: member.phoneNumber,
    whatsappNumber: member.phoneNumber,
    gender: member.gender,
    maritalStatus: member.maritalStatus,
    pictureUrl: member.pictureUrl,
    occupation: member.occupation,
    employeeStatus: member.employeeStatus,
    dateOfBirth: member.dateOfBirth,
  }

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const response = await fetch(DIRECTORY_FUNCTION_BASE_URL + '/member', {
        method: 'PUT',
        body: JSON.stringify({
          ...member,
          ...values,
          whatsappNumber: parsePhoneNumber(values.whatsappNumber),
          parsePhoneNumber: parsePhoneNumber(values.phoneNumber),
          dateOfBirth: new Date(values.dateOfBirth as unknown as string),
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

      dispatch({
        type: 'member/setMemberBio',
        payload: {
          ...member,
          ...values,
        },
      })
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
    defaultValues: initialValues,
  })

  return (
    <Container>
      <Heading size="md">Edit Member Bio Data</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <ImageUpload
          user={user}
          cloudinaryAccount="firstlovecenter"
          uploadPreset="developer-tests"
          name="pictureUrl"
          initialValue={member.pictureUrl}
          label="Your Profile Picture Here"
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

        <Center>
          <Button type="submit" marginY={10} isLoading={isSubmitting}>
            Submit
          </Button>
        </Center>
      </form>
    </Container>
  )
}

export default EditMemberBioData
