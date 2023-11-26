import { LazyRouteTypes } from 'auth/auth-types'
import { permitAdmin } from 'permissions'
import { lazy } from 'react'

const Churches = lazy(() => import('../trends/SelectedProfileTrends'))
const CreateContinent = lazy(
  () => import('./continent/profile/CreateContinent')
)
const CreateCountry = lazy(() => import('./country/profile/CreateCountry'))
const CreateCity = lazy(() => import('./city/profile/CreateCity'))

export const churchesRoutes: LazyRouteTypes[] = [
  { path: '/churches', element: Churches, roles: ['all'] },
  {
    path: '/directory/create-continent',
    element: CreateContinent,
    roles: permitAdmin('denomination'),
  },
  {
    path: '/directory/create-country',
    element: CreateCountry,
    roles: permitAdmin('continent'),
  },
  {
    path: '/directory/create-city',
    element: CreateCity,
    roles: permitAdmin('country'),
  },
]
