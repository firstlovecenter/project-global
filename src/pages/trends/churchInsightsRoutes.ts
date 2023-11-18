import { LazyRouteTypes } from 'auth/auth-types'
import { permitMe } from 'permissions'
import { lazy } from 'react'

const ContinentsList = lazy(() => import('./ContinentsList'))
const ContinentTrends = lazy(() => import('./ContinentTrends'))

export const churchInsightsRoutes: LazyRouteTypes[] = [
  {
    path: '/continents-list',
    element: ContinentsList,
    placeholder: true,
    roles: permitMe('Denomination'),
  },
  {
    path: '/trends/continent',
    element: ContinentTrends,
    roles: permitMe('Continent'),
  },
]
