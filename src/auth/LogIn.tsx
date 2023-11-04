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
  const { login, user } = useAuth()
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
    <Container>
      <Center height="80vh">
        <Container>
          <Box>
            <Heading textAlign={'center'} marginBottom={4}>
              <Center>
                <SplashLogo />
              </Center>
            </Heading>
            {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Text>{JSON.stringify(user?.email)}</Text>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                name="email"
                label="Email Address"
                placeholder="Enter Email Address"
                size="lg"
                borderRadius="50px"
                control={control}
                errors={errors}
              />
              <InputGroup size="lg" marginY={5}>
                <Input
                  name="password"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                  borderRadius="50px"
                  control={control}
                  errors={errors}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    marginRight="1rem"
                    onClick={handleClick}
                  >
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Button
                width="100%"
                type="submit"
                size="lg"
                marginTop={5}
                isLoading={isSubmitting}
              >
                LOGIN
              </Button>
            </form>

            <Container marginTop={3}>
              <Text
                textAlign="center"
                color="blue.500"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </Text>
            </Container>
          </Box>
          <Center width={'100%'} marginTop={2}>
            <Text>
              Need an account?{' '}
              <Link as={RouterLink} to="/signup">
                Sign Up
              </Link>
            </Text>
          </Center>
        </Container>
      </Center>
    </Container>
  )
}

export default LogIn
