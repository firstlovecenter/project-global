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
import useCustomColors from 'hooks/useCustomColors'

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
  const { label, name, placeholder, control, errors, ...rest } = props

  const { oppAlpha } = useCustomColors()

  const ruleName = camelCaseToSentenceCase(label as string)

  return (
    <FormControl isInvalid={!!errors[name]} mb={4}>
      {!!label && (
        <FormLabel htmlFor={name}>
          <Text fontSize={'10px'} color={oppAlpha[600]}>
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
            placeholder={placeholder}
            {...field}
            {...rest}
            colorScheme="brandBlue"
            borderRadius={'10px'}
            height={'40px'}
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
