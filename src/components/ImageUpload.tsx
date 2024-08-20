import React, { useState, useRef, ChangeEventHandler } from 'react'
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Text,
} from '@chakra-ui/react'
import { BeatLoader } from 'react-spinners'
import { ReactHookFormComponentProps } from '../components/FormPrimitives/react-hook-form-types'
import { UseFormSetValue } from 'react-hook-form'
import useCustomColors from 'hooks/useCustomColors'
import DesktopUploadIcon from './DesktopUploadIcon'

export interface ImageUploadProps extends ReactHookFormComponentProps {
  uploadPreset: string
  tags?: 'facial-recognition'
  initialValue?: string
  loading?: boolean
  cloudinaryAccount: 'church-insights' | 'firstlovecenter'
  user: {
    id: string
    firstName: string
    lastName: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>
}

const ImageUpload = (props: ImageUploadProps) => {
  const {
    label,
    name,
    cloudinaryAccount,
    initialValue,
    uploadPreset,
    placeholder,
    tags,
    user,
    setValue,
    errors,
    ...rest
  } = props
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState('')

  const uploadImage: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files ?? []
    const date = new Date().toISOString().slice(0, 10)
    const username = `${user.firstName.toLowerCase()}-${user.lastName.toLowerCase()}`
    let filename = `${username}-${user.id}/${date}_${files[0].name}`
    filename = filename.replace(/\s/g, '-')
    filename = filename.replace(/~/g, '-')
    filename = filename.replace(/[^a-zA-Z0-9-_]/g, '')

    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', uploadPreset || '')
    data.append('public_id', filename)

    data.append('tags', tags || '')

    setLoading(true)

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryAccount}/image/upload`,
      {
        method: 'POST',
        body: data,
      }
    )
    const file = await res.json()

    setImage(file.secure_url)

    setValue(name, file.secure_url)
    setLoading(false)
  }

  const { yellow, menuBtnBg } = useCustomColors()

  return (
    <FormControl my={{ base: 12, lg: 0 }}>
      <Flex
        padding={0}
        height="190px"
        marginBottom={{ base: 6, lg: 0 }}
        gap={5}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Center height={{ base: '100%', lg: '100px' }}>
          {props.loading || loading ? (
            <BeatLoader data-testid="loading-spinner" color="grey" />
          ) : (
            <Image
              alt={label}
              data-testid="image-loaded"
              src={image || initialValue}
              fallbackSrc="https://res.cloudinary.com/firstlovecenter/image/upload/v1683818433/placeholder350_tt6roc.png"
              rounded="full"
              border={'4px solid'}
              borderColor={yellow}
              width={{ base: '190px', lg: '110px' }}
            />
          )}
        </Center>
        <Card
          maxWidth={'490px'}
          width={'100%'}
          height={'130px'}
          display={{ base: 'none', lg: 'flex' }}
          borderWidth={2}
          borderColor={menuBtnBg}
        >
          <CardBody p={0}>
            <Flex
              alignItems={'center'}
              justifyContent={'center'}
              flexDirection={'column'}
              height={'100%'}
            >
              <Box
                width={'fit-content'}
                borderRadius={'full'}
                p={2}
                borderWidth={4}
                borderColor={menuBtnBg}
              >
                <DesktopUploadIcon />
              </Box>
              <Box textAlign={'center'}>
                <Text fontSize={'0.8rem'}>
                  <Button
                    variant={'ghost'}
                    padding={0}
                    fontSize={'0.8rem'}
                    onClick={handleButtonClick}
                  >
                    Click to upload
                  </Button>{' '}
                  <span style={{ opacity: 0.8 }}>or drag and drop</span>
                </Text>
                <Text fontSize={'0.8rem'} opacity={0.8}>
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </Text>
              </Box>
            </Flex>
          </CardBody>
        </Card>
      </Flex>

      <Container
        padding={0}
        marginBottom={4}
        centerContent
        display={{ base: 'flex', lg: 'none' }}
      >
        <Input
          id={name}
          display="none"
          placeholder={placeholder}
          type="file"
          accept="image/png, image/webp, image/jpg, image/jpeg"
          {...rest}
          onChange={uploadImage}
          ref={fileInputRef}
        />
        <Button onClick={handleButtonClick} width={'100%'}>
          Choose Image
        </Button>
      </Container>

      {errors[name] && (
        <FormErrorMessage>{errors[name]?.message as string}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default ImageUpload
