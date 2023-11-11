/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactHookFormComponentProps } from '@jaedag/admin-portal-react-core'
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form'

export interface RoleBasedSearch extends ReactHookFormComponentProps {
  roleBased?: boolean
  initialValue?: string
  setValue: UseFormSetValue<any>
  trigger?: UseFormTrigger<any>
}
