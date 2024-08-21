import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react'
import FormInput from 'components/FormPrimitives/FormInput'
import FormSelect from 'components/FormPrimitives/FormSelect'
import SearchCampus from 'components/forms/SearchCampus'
import { ReactHookFormComponentProps } from 'components/FormPrimitives/react-hook-form-types'
import ImageUpload from 'components/ImageUpload'
import useCustomColors from 'hooks/useCustomColors'
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormSetValue,
} from 'react-hook-form'
import { Member } from 'types/types'
import {
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
} from '@jaedag/admin-portal-react-core'

interface DesktopRegisterMemberProps extends ReactHookFormComponentProps {
  user: Member
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  errors: FieldErrors
  name: string
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: UseFormHandleSubmit<any>
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: {
    pictureUrl: string
    firstName: string
    middleName: string
    lastName: string
    email: string
    phoneNumber: string
    whatsappNumber: string
    gender: string
    maritalStatus: string
    occupation: string
    employeeStatus: string
    dateOfBirth: string
    campus: string
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) => Promise<any>
}
const DesktopRegisterMember = ({
  user,
  setValue,
  handleSubmit,
  onSubmit,
  control,
  errors,
}: DesktopRegisterMemberProps) => {
  const { oppAlpha } = useCustomColors()
  return (
    <Container display={{ base: 'none', lg: 'block' }} minWidth={'90%'}>
      <Heading mt={7}>Register Member</Heading>
      <Flex
        justifyContent={'space-between'}
        mt={10}
        gap={5}
        borderBottom={'1px solid '}
        borderBottomColor={oppAlpha[400]}
      >
        <Box pt={5}>
          <Text fontSize={'lg'}>Photo</Text>
          <Text fontSize={'xs'} opacity={0.8}>
            This will be displayed on profile
          </Text>
        </Box>
        <Box width={'100%'} maxWidth={'700px'}>
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
        </Box>
      </Flex>
      <Flex
        justifyContent={'space-between'}
        mt={10}
        gap={5}
        borderBottom={'1px solid '}
        borderBottomColor={oppAlpha[400]}
      >
        <Box pt={5}>
          <Text fontSize={'lg'}>Name</Text>
        </Box>
        <Flex width={'100%'} maxWidth={'700px'} gap={5}>
          <FormInput
            name="firstName"
            label="First Name"
            placeholder="Jane"
            control={control}
            errors={errors}
          />

          <FormInput
            name="middleName"
            label="Middle Name"
            placeholder="Mary"
            control={control}
            errors={errors}
          />

          <FormInput
            name="lastName"
            label="Last Name"
            placeholder="Doe"
            control={control}
            errors={errors}
          />
        </Flex>
      </Flex>
      <Flex
        justifyContent={'space-between'}
        mt={10}
        gap={5}
        borderBottom={'1px solid '}
        borderBottomColor={oppAlpha[400]}
      >
        <Box pt={5}>
          <Text fontSize={'lg'}>Contact Information</Text>
        </Box>
        <Flex width={'100%'} maxWidth={'700px'} gap={5}>
          <FormInput
            name="email"
            label="Email"
            placeholder="jdoe@example.com"
            control={control}
            errors={errors}
          />

          <FormInput
            name="phoneNumber"
            label="Phone Number"
            placeholder="+447 255 568 926"
            control={control}
            errors={errors}
            type="tel"
          />
          <FormInput
            name="whatsappNumber"
            label="WhatsApp Number"
            placeholder="+447 255 568 926"
            control={control}
            errors={errors}
            type="tel"
          />
        </Flex>
      </Flex>
      <Flex
        justifyContent={'space-between'}
        mt={10}
        gap={5}
        borderBottom={'1px solid '}
        borderBottomColor={oppAlpha[400]}
      >
        <Box pt={5}>
          <Text fontSize={'lg'}>Other details</Text>
        </Box>
        <Box width={'100%'} maxWidth={'700px'}>
          <Flex gap={5} alignItems={'center'} mb={2}>
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
              placeholder="Student"
              control={control}
              errors={errors}
              margin={0}
            />
          </Flex>
          <Flex gap={5} alignItems={'center'}>
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
          </Flex>
        </Box>
      </Flex>
      <Flex gap={3} mt={10} float={'right'}>
        <Button variant={'ghost'}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
      </Flex>
    </Container>
  )
}

export default DesktopRegisterMember
