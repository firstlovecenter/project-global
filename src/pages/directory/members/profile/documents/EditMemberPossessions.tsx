import { Button, Center, Container, Heading, useToast } from '@chakra-ui/react'
import { DIRECTORY_FUNCTION_BASE_URL } from 'firebase/cloudFunctionsConfig'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'redux-config/store'

const EditMemberPossessions = () => {
  const member = useSelector((state: RootState) => state.member.data)
  const navigate = useNavigate()
  const toast = useToast()
  const dispatch = useDispatch()

  const initialValues = [
    // housesOwned: member.housesOwned,
    // carsOwned: member.carsOwned,
    {
      key: 'Car Title Document',
      link: '/',
      // value: member.housesOwned,
      lastUpdated: 'unknown',
    },
    {
      key: 'Residence Picture',
      // lastUpdated: member.carsOwned,
      link: '/',
      lastUpdated: 'unknown',
    },
    {
      key: 'Residence Document',
      link: '/',
      lastUpdated: 'unknown',
    },
    {
      key: 'Car Picture',
      link: '/',
      lastUpdated: 'unknown',
    },
  ]

  const onSubmit = async (values: typeof initialValues) => {
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
      navigate('/member/documents/possessions')
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast({
          title: 'An error occurred updating member data',
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
    formState: { isSubmitting },
  } = useForm<typeof initialValues>({
    defaultValues: initialValues,
  })

  return (
    <Container>
      <Heading size="md" textAlign={'center'}>
        Edit Member Possessions
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <Input
          name="housesOwned"
          label="Houses Owned"
          control={control}
          errors={errors}
        />
        <Input
          name="carsOwned"
          label="Cars Owned"
          control={control}
          errors={errors}
        /> */}

        <Center>
          <Button type="submit" marginY={10} isLoading={isSubmitting}>
            Submit
          </Button>
        </Center>
      </form>
    </Container>
  )
}

export default EditMemberPossessions
