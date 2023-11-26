import { LazyRouteTypes } from 'auth/auth-types'
import { lazy } from 'react'
import { memberRoutes } from './members/memberRoutes'
import { churchesRoutes } from './churchesRoutes'
import { churchInsightsRoutes } from 'pages/trends/trendsRoutes'

const ContinentProfile = lazy(
  () => import('./continent/profile/ContinentProfile')
)

const CountryProfile = lazy(() => import('./country/profile/CountryProfile'))
const CityProfile = lazy(() => import('./city/profile/CityProfile'))
const CouncilProfile = lazy(() => import('./council/CouncilProfile'))
const CouncilCampusList = lazy(() => import('./council/CouncilCampusList'))
const CampusProfile = lazy(() => import('./campus/CampusProfile'))

const CreateCountry = lazy(() => import('./country/profile/CreateCountry'))
const CreateCouncil = lazy(() => import('./council/CreateCouncil'))
const CreateCampus = lazy(() => import('./campus/CreateCampus'))

const DenominationContinentList = lazy(
  () => import('./denomination/DenominationContinentList')
)
const Directory = lazy(() => import('./Directory'))
const DenominationProfile = lazy(
  () => import('./denomination/DenominationProfile')
)

const BishopsList = lazy(() => import('./members/BishopsList'))

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
    path: '/directory/denomination-profile',
    element: DenominationProfile,
    placeholder: true,
    roles: ['all'],
  },
  {
    path: '/directory/denomination/continents',
    element: DenominationContinentList,
    placeholder: true,
    roles: ['all'],
  },

  {
    path: '/directory/continent-profile',
    element: ContinentProfile,
    placeholder: true,
    roles: ['all'],
  },

  {
    path: '/directory/country-profile',
    element: CountryProfile,
    placeholder: true,
    roles: ['all'],
  },

  {
    path: '/directory/country/create',
    element: CreateCountry,
    placeholder: true,
    roles: ['all'],
  },
  {
    path: '/directory/council-profile',
    element: CouncilProfile,
    placeholder: true,
    roles: ['all'],
  },
  {
    path: '/directory/council/campuses',
    element: CouncilCampusList,
    placeholder: true,
    roles: ['all'],
  },
  {
    path: '/directory/council/create',
    element: CreateCouncil,
    placeholder: true,
    roles: ['all'],
  },
  {
    path: '/directory/campus-profile',
    element: CampusProfile,
    placeholder: true,
    roles: ['all'],
  },
  {
    path: '/directory/campus/create',
    element: CreateCampus,
    placeholder: true,
    roles: ['all'],
  },
  {
    path: 'directory/members/bishops',
    element: BishopsList,
    roles: ['all'],
  },
]
