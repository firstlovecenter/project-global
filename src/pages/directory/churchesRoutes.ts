import { LazyRouteTypes } from 'auth/auth-types'
import { permitAdmin } from 'permissions'
import { lazy } from 'react'

const Churches = lazy(() => import('./profile/SelectedProfile'))
const CreateContinent = lazy(() => import('./create/CreateContinent'))
const CreateCountry = lazy(() => import('./create/CreateCountry'))
const CreateCity = lazy(() => import('./create/CreateCity'))
const CreateCampus = lazy(() => import('./create/CreateCampus'))
const CreateFamily = lazy(() => import('./create/CreateFamily'))
const CreateCouncil = lazy(() => import('./create/CreateCouncil'))

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
  {
    path: '/directory/create-campus',
    element: CreateCampus,
    roles: permitAdmin('city'),
  },
  {
    path: '/directory/create-family',
    element: CreateFamily,
    roles: permitAdmin('denomination'),
  },
  {
    path: '/directory/create-council',
    element: CreateCouncil,
    roles: permitAdmin('family'),
  },
]
