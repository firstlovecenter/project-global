import { LazyExoticComponent } from 'react'
import { Role } from 'types/types'

export interface LazyRouteTypes {
  path: string
  element: LazyExoticComponent<() => JSX.Element>
  placeholder?: boolean
  roles: Role[]
}
