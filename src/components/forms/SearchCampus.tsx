import { useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import {
  Card,
  FormControl,
  FormErrorMessage,
  Input,
  InputProps,
} from '@chakra-ui/react'
import './react-autosuggest.css'
import { useUser } from 'contexts/UserContext'
import { RoleBasedSearch } from './form-types'
import { DEBOUNCE_TIMER, initialise } from './forms-utils'
import { SEARCH_FUNCTION_BASE_URL } from 'global-utils'
import { Church } from '@jaedag/admin-portal-types'

const SearchCampus = (props: RoleBasedSearch) => {
  const { name, setValue, label, placeholder, initialValue, errors } = props

  const { user } = useUser()
  const [suggestions, setSuggestions] = useState([])
  const [searchString, setSearchString] = useState(initialValue || '')

  const campusSearch = async ({
    uid,
    searchKey,
  }: {
    uid: string
    searchKey: string
  }) => {
    try {
      const fetchUrl = new URL(SEARCH_FUNCTION_BASE_URL + '/campus')
      fetchUrl.searchParams.append('uid', uid)
      fetchUrl.searchParams.append('searchKey', searchKey)

      const response = await fetch(fetchUrl, {
        method: 'GET',
      })

      const data = await response.json()

      setSuggestions(data)
    } catch (error) {
      console.log(error)
    }

    return []
  }

  useEffect(() => {
    setSearchString(initialise(searchString, initialValue))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue])

  useEffect(() => {
    const timerId = setTimeout(() => {
      campusSearch({
        uid: user.id,
        searchKey: searchString?.trim(),
      })
    }, DEBOUNCE_TIMER)

    return () => {
      clearTimeout(timerId)
    }
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
          setSearchString(suggestion.name)
          setValue(name, suggestion)
        }}
        getSuggestionValue={(suggestion: Church) => suggestion.name}
        highlightFirstSuggestion={true}
        renderSuggestion={(suggestion, { isHighlighted }) => (
          <Card
            padding={3}
            paddingLeft={4}
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
    </FormControl>
  )
}

export default SearchCampus
