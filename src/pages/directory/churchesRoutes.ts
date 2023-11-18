import { LazyRouteTypes } from 'auth/auth-types'
import { lazy } from 'react'

const Churches = lazy(() => import('../trends/SelectedProfileTrends'))

export const churchesRoutes: LazyRouteTypes[] = [
  { path: '/churches', element: Churches, roles: ['all'] },
]
