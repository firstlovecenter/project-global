import { LazyRouteTypes } from 'auth/auth-types'
import { lazy } from 'react'

const Churches = lazy(() => import('./Churches'))

export const churchesRoutes: LazyRouteTypes[] = [
  { path: '/churches', element: Churches, roles: ['all'] },
]
