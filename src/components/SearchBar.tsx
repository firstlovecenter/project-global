import { Button, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { Input } from '@jaedag/admin-portal-react-core'
import { useForm } from 'react-hook-form'
import { FaSearch } from 'react-icons/fa'

const SearchBar = () => {
  const initialValues = {
    searchKey: '',
  }

  const onSubmit = async (values: typeof initialValues) => {
    console.log('🚀 ~ file: SearchBar.tsx:8 ~ values:', values)
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<typeof initialValues>({
    defaultValues: initialValues,
  })

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup size="lg" marginY={5} marginBottom={'1rem'}>
          <InputLeftElement width="3.5rem">
            <Button
              h="1.5rem"
              size="md"
              leftIcon={<FaSearch />}
              variant="ghost"
              color="#ffffff"
              _hover={{ bg: 'transparent' }}
            />
          </InputLeftElement>
          <Input
            borderRadius="10px"
            bg={'#262E40'}
            paddingLeft="3rem"
            placeholder="Search for anything"
            color="#ffffff"
            _placeholder={{
              color: 'brandGray.500',
              fontWeight: '300',
              fontSize: '0.875rem',
            }}
            name="searchKey"
            control={control}
            errors={errors}
          />
        </InputGroup>
      </form>
    </div>
  )
}

export default SearchBar
