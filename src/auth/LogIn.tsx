import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Container,
  Heading,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from '@chakra-ui/react'
import { useAuth } from 'contexts/AuthContext'
import * as Yup from 'yup'
import { useState } from 'react'
import { Input } from '@jaedag/admin-portal-react-core'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import SplashLogo from 'assets/SplashLogo'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const LogIn = () => {
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const handleClick = () => setShow(!show)
  const { login } = useAuth()
  const navigate = useNavigate()

  const initialValues = {
    email: '',
    password: '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
  })

  const onSubmit = async (values: typeof initialValues) => {
    try {
      await login(values.email, values.password)
      navigate('/')
    } catch (error) {
      setError('Failed to log in')
    }
  }

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<typeof initialValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  })

  return (
    <Container
      padding={'0 1.5rem'}
      justifyContent={'center'}
      marginTop={{ base: '1rem', md: '3rem' }}
    >
      <Center>
        <Container padding={'0px'}>
          <Box height="80vh">
            <Center>
              <SplashLogo />
            </Center>

            {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                alignItems={'center'}
                height={'50vh'}
              >
                <Container
                  padding={'0px'}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  gap={5}
                >
                  <InputGroup size="lg" marginY={5} maxWidth={'340px'}>
                    <Input
                      name="email"
                      placeholder="username"
                      size="lg"
                      padding="20px"
                      height={'4.375rem'}
                      fontSize={'1.25rem'}
                      color={'brandGray.200'}
                      backgroundColor={'#313B50'}
                      borderRadius={'1rem'}
                      maxWidth={'340px'}
                      control={control}
                      errors={errors}
                    />
                  </InputGroup>
                  <InputGroup size="lg" marginY={5} maxWidth={'340px'}>
                    <Input
                      name="password"
                      type={show ? 'text' : 'password'}
                      placeholder="password"
                      padding="20px"
                      color={'brandGray.200'}
                      backgroundColor={'#313B50'}
                      borderRadius={'1rem'}
                      height={'4.375rem'}
                      fontSize={'1.25rem'}
                      control={control}
                      errors={errors}
                    />

                    <InputRightElement width="4.5rem" top={'20%'}>
                      <Button
                        h="1.75rem"
                        size="sm"
                        marginRight="1rem"
                        onClick={handleClick}
                        variant="ghost"
                        color={'brandGold.500'}
                      >
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Container marginTop={1}>
                    <Text
                      textAlign="center"
                      color="#ffffff"
                      fontWeight={'300'}
                      onClick={() => navigate('/forgot-password')}
                    >
                      forgot password?
                    </Text>
                  </Container>
                </Container>
                <Button
                  width="100%"
                  type="submit"
                  size="lg"
                  marginTop={7}
                  isLoading={isSubmitting}
                >
                  Sign in
                </Button>
              </Box>
            </form>
          </Box>
        </Container>
      </Center>
    </Container>
  )
}

export default LogIn
