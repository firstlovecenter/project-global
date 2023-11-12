import { LazyRouteTypes } from 'auth/auth-types'
import { lazy } from 'react'

const Churches = lazy(() => import('../churches-insights/Churches'))

export const churchesRoutes: LazyRouteTypes[] = [
  { path: '/churches', element: Churches, roles: ['all'] },
]
