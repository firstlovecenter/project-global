import { Box, Card } from '@chakra-ui/react'
import FileUpload from './FileUpload'
import { useForm } from 'react-hook-form'

const DocumentUpload = ({ title }: { title: string }) => {
  const { control } = useForm()

  return (
    <Card>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', marginTop: '1rem' }}>
        {' '}
        {title}
      </p>
      <Box mt={'auto'} width={'100%'} mb={10}>
        <FileUpload
          name={title}
          uploadPreset="possession-upload"
          //eslint-disable-next-line @typescript-eslint/no-empty-function
          setValue={() => {}}
          control={control}
          errors={{}}
        />
      </Box>
    </Card>
  )
}

export default DocumentUpload
