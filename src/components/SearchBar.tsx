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
        <InputGroup size="lg" marginY={5}>
          <InputLeftElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              leftIcon={<FaSearch />}
              variant="ghost"
            />
          </InputLeftElement>
          <Input
            borderRadius="50px"
            paddingLeft="4.5rem"
            placeholder="Search"
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
