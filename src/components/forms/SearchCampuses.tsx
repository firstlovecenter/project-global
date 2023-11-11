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
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import { useFirestore } from 'reactfire'

const SearchFellowship = (props: RoleBasedSearch) => {
  const { name, setValue, label, placeholder, initialValue, errors } = props

  const { user } = useUser()
  const [suggestions, setSuggestions] = useState([])
  const [searchString, setSearchString] = useState(initialValue ?? '')

  const error = ''

  const db = getFirestore()
  const campusCollRef = collection(db, 'campuses')

  const campusSearch = async ({ id, key }: { id: string; key: string }) => {
    const querySnapshot = await getDocs(
      query(campusCollRef, where('name', '==', key))
    )

    const campuses = querySnapshot.docs.map((doc) => ({
      id: doc.ref.id,
      ...doc.data(),
    }))

    return []
  }

  const whichSearch = (searchString: string) => {
    campusSearch({
      id: user.id,
      key: searchString?.trim(),
    })
  }

  useEffect(() => {
    setSearchString(initialise(searchString, initialValue))
  }, [initialValue])

  useEffect(() => {
    const timerId = setTimeout(() => {
      whichSearch(searchString)
    }, DEBOUNCE_TIMER)

    return () => {
      clearTimeout(timerId)
    }
  }, [searchString])

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
        getSuggestionValue={(suggestion: any) => suggestion.name}
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

export default SearchFellowship
