import React, { useState, useRef, ChangeEventHandler } from 'react'
import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  useColorModeValue,
} from '@chakra-ui/react'
import { BeatLoader } from 'react-spinners'
import { ReactHookFormComponentProps } from '../components/FormPrimitives/react-hook-form-types'
import { UseFormSetValue } from 'react-hook-form'

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
    control,
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

  const currentColorMode = useColorModeValue('light', 'dark')
  const borderColor =
    currentColorMode === 'light' ? 'brandGold.500' : 'brandGold.300'

  return (
    <FormControl my={12}>
      <Container padding={0} width="190px" height="190px" marginBottom={6}>
        <Center height="100%">
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
              borderColor={borderColor}
            />
          )}
        </Center>
      </Container>

      <Container padding={0} marginBottom={4} centerContent>
        <Input
          id={name}
          display="none"
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
