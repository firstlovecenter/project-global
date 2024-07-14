import React from 'react'
import {
  FormLabel,
  Input,
  FormControl,
  FormErrorMessage,
  InputProps,
  Text,
} from '@chakra-ui/react'
import { ReactHookFormComponentProps } from './react-hook-form-types'
import { Controller } from 'react-hook-form'
import { camelCaseToSentenceCase } from 'globalUtils'

export interface FormInputProps extends ReactHookFormComponentProps {
  type?:
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'password'
    | 'color'
    | 'email'
    | 'number'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
}
type FormInputPropsType = FormInputProps & Omit<InputProps, 'type'>

const FormInput = (props: FormInputPropsType) => {
  const { label, name, control, errors, ...rest } = props

  const ruleName = camelCaseToSentenceCase(label as string)

  return (
    <FormControl isInvalid={!!errors[name]} mb={4}>
      {!!label && (
        <FormLabel htmlFor={name}>
          <Text fontSize={'10px'} colorScheme="brandTeal">
            {label.toLocaleUpperCase()}
          </Text>
        </FormLabel>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            id={name}
            {...field}
            {...rest}
            colorScheme="brandTeal"
            borderRadius={'10px'}
          />
        )}
      />
      {errors && (
        <FormErrorMessage
          fontSize={'10px'}
        >{`${ruleName} is required`}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default FormInput
