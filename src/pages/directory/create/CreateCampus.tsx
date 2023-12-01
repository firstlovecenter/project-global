import { Button, Center, Container, Heading, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@jaedag/admin-portal-react-core'
import SearchCity from 'components/forms/SearchCity'
import SearchCouncil from 'components/forms/SearchCouncil'
import SearchMember from 'components/forms/SearchMember'
import { useRef } from 'contexts/RefContext'
import { DIRECTORY_FUNCTION_BASE_URL } from 'firebase/cloudFunctionsConfig'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const CreateCampus = () => {
  const { clickCard } = useRef()
  const navigate = useNavigate()
  const initialValues = {
    name: '',
    leaderRef: '',
  }

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    leaderRef: Yup.string().required(),
  })

  const toast = useToast()

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const campusRef = values.name.toLowerCase().replace(' ', '-')
      const response = await fetch(
        DIRECTORY_FUNCTION_BASE_URL + '/church/campus',
        {
          method: 'POST',
          body: JSON.stringify({
            ...values,
            id: campusRef,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        const errorMessage = await response.text()
        console.error(response.statusText)
        throw new Error(errorMessage)
      }

      clickCard(campusRef, 'campus')

      navigate('/directory/campus-profile')
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast({
          title: 'An error occurred creating campus',
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
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  })

  return (
    <Container>
      <Heading>Create A Campus</Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="name" label="Name" control={control} errors={errors} />

        <SearchMember
          name="leaderRef"
          label="Choose a leader"
          control={control}
          errors={errors}
          setValue={setValue}
          placeholder="Search for a leader"
        />

        <SearchCouncil
          name="councilRef"
          label="Choose a council"
          control={control}
          errors={errors}
          setValue={setValue}
          placeholder="Search for a council"
        />

        <SearchCity
          name="cityRef"
          label="Choose a city"
          control={control}
          errors={errors}
          setValue={setValue}
          placeholder="Search for a city"
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

export default CreateCampus
