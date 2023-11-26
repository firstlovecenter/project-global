import { Button, Center, Container, Heading, useToast } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '@jaedag/admin-portal-react-core'
import SearchMember from 'components/forms/SearchMember'
import { useRef } from 'contexts/RefContext'
import { DIRECTORY_FUNCTION_BASE_URL } from 'firebase/cloudFunctionsConfig'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

const CreateCountry = () => {
  const { clickCard, continentRef } = useRef()
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
      const countryRef = values.name.toLowerCase().replace(' ', '-')
      const response = await fetch(
        DIRECTORY_FUNCTION_BASE_URL + '/church/country',
        {
          method: 'POST',
          body: JSON.stringify({
            ...values,
            id: countryRef,
            continentRef,
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

      clickCard(countryRef, 'country')

      navigate('/country/profile')
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast({
          title: 'An error occurred creating country',
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
      <Heading>Create A Country</Heading>

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

        <Center>
          <Button type="submit" marginTop={5} isLoading={isSubmitting}>
            Submit
          </Button>
        </Center>
      </form>
    </Container>
  )
}

export default CreateCountry
