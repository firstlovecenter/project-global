import { LazyRouteTypes } from 'auth/auth-types'
import { lazy } from 'react'
import { memberRoutes } from './members/memberRoutes'
import { churchesRoutes } from './churchesRoutes'
import { churchInsightsRoutes } from 'pages/trends/trendsRoutes'
import { permitMe } from 'permissions'

const Directory = lazy(() => import('./Directory'))

const ContinentProfile = lazy(
  () => import('../directory/profile/ContinentProfile')
)
const CountryProfile = lazy(() => import('../directory/profile/CountryProfile'))
const CityProfile = lazy(() => import('../directory/profile/CityProfile'))
const CampusProfile = lazy(() => import('../directory/profile/CampusProfile'))
const FamilyProfile = lazy(() => import('../directory/profile/FamilyProfile'))

export const directoryRoutes: LazyRouteTypes[] = [
  ...memberRoutes,
  ...churchesRoutes,
  ...churchInsightsRoutes,
  {
    path: '/directory',
    element: Directory,
    placeholder: true,
    roles: ['all'],
  },
  {
    path: '/directory/continent-profile',
    element: ContinentProfile,
    placeholder: true,
    roles: permitMe('continent'),
  },
  {
    path: '/directory/country-profile',
    element: CountryProfile,
    placeholder: true,
    roles: permitMe('country'),
  },
  {
    path: '/directory/city-profile',
    element: CityProfile,
    placeholder: true,
    roles: permitMe('city'),
  },
  {
    path: '/directory/campus-profile',
    element: CampusProfile,
    placeholder: true,
    roles: permitMe('campus'),
  },
  {
    path: '/directory/family-profile',
    element: FamilyProfile,
    placeholder: true,
    roles: permitMe('family'),
  },
]
