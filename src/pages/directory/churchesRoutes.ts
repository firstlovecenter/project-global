import { LazyRouteTypes } from 'auth/auth-types'
import { permitAdmin } from 'permissions'
import { lazy } from 'react'

const Churches = lazy(() => import('../trends/SelectedProfileTrends'))
const CreateContinent = lazy(
  () => import('./continent/profile/CreateContinent')
)

export const churchesRoutes: LazyRouteTypes[] = [
  { path: '/churches', element: Churches, roles: ['all'] },
  {
    path: '/directory/create-continent',
    element: CreateContinent,
    roles: permitAdmin('denomination'),
  },
]
