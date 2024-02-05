import { useState, useRef, ChangeEventHandler } from 'react'
import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react'
import { BeatLoader } from 'react-spinners'
import { UseFormSetValue } from 'react-hook-form'
import { ReactHookFormComponentProps } from '@jaedag/admin-portal-react-core'
import { FaFileUpload } from 'react-icons/fa'
import { useUser } from 'contexts/UserContext'

export interface FileUploadProps extends ReactHookFormComponentProps {
  uploadPreset: string
  tags?: 'facial-recognition'
  loading?: boolean
  value?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>
}

const FileUpload = (props: FileUploadProps) => {
  const { user } = useUser()
  const { label, name, uploadPreset, tags, setValue, value, errors, ...rest } =
    props
  const fileInputRef = useRef<HTMLInputElement>(null)
  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState('')

  const uploadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
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
      'https://api.cloudinary.com/v1_1/firstlovecenter/image/upload',
      {
        method: 'POST',
        body: data,
      }
    )
    const file = await res.json()

    setFile(file.secure_url)

    setValue(name, file.secure_url)
    setLoading(false)
  }

  return (
    <FormControl>
      {label ? (
        <FormLabel textAlign="center" htmlFor={name}>
          {label}
        </FormLabel>
      ) : null}

      <Container padding={0} marginBottom={4}>
        <Center height="100%">
          {props.loading || loading ? (
            <BeatLoader data-testid="loading-spinner" color="grey" />
          ) : file || value ? (
            <FaFileUpload />
          ) : (
            <Text color="GrayText">Not Uploaded</Text>
          )}
        </Center>
      </Container>

      <Container padding={0} marginBottom={4} centerContent>
        <Input
          id={name}
          display="none"
          type="file"
          accept="file/png, file/webp, file/jpg, file/jpeg file/pdf"
          {...rest}
          onChange={uploadFile}
          ref={fileInputRef}
        />
        <Button colorScheme="blue" size="xs" onClick={handleButtonClick}>
          Upload File
        </Button>
      </Container>

      {errors[name] && (
        <FormErrorMessage>{errors[name]?.message as string}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default FileUpload
