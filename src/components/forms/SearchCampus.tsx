import { useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import {
  Card,
  Center,
  FormControl,
  FormErrorMessage,
  Input,
  InputProps,
  Spinner,
  useToast,
} from '@chakra-ui/react'
import './react-autosuggest.css'
import { useUser } from 'contexts/UserContext'
import { RoleBasedSearch } from './form-types'
import { initialise } from './forms-utils'
import { SEARCH_FUNCTION_BASE_URL } from 'firebase/cloudFunctionsConfig'
import { Church } from '@jaedag/admin-portal-types'

const SearchCampus = (props: RoleBasedSearch) => {
  const { name, setValue, label, placeholder, initialValue, errors } = props
  const { user } = useUser()
  const [suggestions, setSuggestions] = useState([])
  const [noSearch, setNoSearch] = useState(false)
  const [searchString, setSearchString] = useState(initialValue || '')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const campusSearch = async ({
    uid,
    searchKey,
  }: {
    uid: string
    searchKey: string
  }) => {
    try {
      setLoading(true)
      const fetchUrl = new URL(SEARCH_FUNCTION_BASE_URL + '/campus')
      fetchUrl.searchParams.append('uid', uid)
      fetchUrl.searchParams.append('searchKey', searchKey)

      const response = await fetch(fetchUrl, {
        method: 'GET',
      })

      const data = await response.json()

      setSuggestions(data)
    } catch (error) {
      toast({
        title: 'Error searching for campus',
        description: 'There was an error searching for campus ' + error,
        status: 'error',
        duration: 6000,
        isClosable: true,
      })
    } finally {
      setLoading(false)
    }

    return []
  }

  useEffect(() => {
    setSearchString(initialise(searchString, initialValue))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue])

  useEffect(() => {
    // Function to perform the campus search
    const performCampusSearch = async () => {
      if (!noSearch) {
        await campusSearch({
          uid: user.id,
          searchKey: searchString,
        })
      }
    }

    // Call the function
    performCampusSearch()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString, user.id])

  return (
    <FormControl>
      {label ? <label className="label">{label}</label> : null}

      <Autosuggest
        inputProps={{
          placeholder: placeholder,
          id: name,
          autoComplete: 'off',
          value: searchString,
          name: name,
          onChange: (_event, { newValue }) => {
            setSearchString(newValue)
          },
        }}
        renderInputComponent={(inputProps) => (
          <Input id={name} marginY={2} {...(inputProps as InputProps)} />
        )}
        suggestions={suggestions}
        onSuggestionsFetchRequested={async ({ value }) => {
          if (!value) {
            setSuggestions([])
          }
        }}
        onSuggestionsClearRequested={() => {
          setSuggestions([])
        }}
        onSuggestionSelected={(event, { suggestion, method }) => {
          if (method === 'enter') {
            event.preventDefault()
          }
          setNoSearch(true)
          setSearchString(suggestion.name)
          setValue(name, suggestion.id)
        }}
        getSuggestionValue={(suggestion: Church) => suggestion.name}
        highlightFirstSuggestion={true}
        renderSuggestion={(suggestion, { isHighlighted }) => (
          <Card
            padding={3}
            paddingLeft={4}
            position="absolute"
            zIndex={isHighlighted ? 'popover' : 'base'}
            backgroundColor={isHighlighted ? 'blue.200' : 'gray.700'}
            color={isHighlighted ? 'blue.800' : 'gray.200'}
            width="100%"
          >
            {suggestion.name}
          </Card>
        )}
      />

      {errors[name] && (
        <FormErrorMessage>{errors[name]?.message as string}</FormErrorMessage>
      )}

      {loading && !suggestions.length && (
        <Card
          padding={3}
          zIndex={'popover'}
          backgroundColor={'whiteAlpha.300'}
          color={'gray.200'}
          width="100%"
        >
          <Center>
            <Spinner color="gray.200" />
          </Center>
        </Card>
      )}
    </FormControl>
  )
}

export default SearchCampus
