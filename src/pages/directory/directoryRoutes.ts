import { LazyRouteTypes } from 'auth/auth-types'
import { lazy } from 'react'

const ContinentProfile = lazy(() => import('./continent/ContinentProfile'))
const ContinentCountryList = lazy(
  () => import('./continent/ContinentCountryList')
)
const CountryProfile = lazy(() => import('./country/CountryProfile'))
const CountryCouncilList = lazy(() => import('./country/CountryCouncilList'))
const CouncilProfile = lazy(() => import('./council/CouncilProfile'))
const CouncilCampusList = lazy(() => import('./council/CouncilCampusList'))
const CampusProfile = lazy(() => import('./campus/CampusProfile'))

const CreateContinent = lazy(() => import('./continent/CreateContinent'))
const CreateCountry = lazy(() => import('./country/CreateCountry'))
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
    path: '/directory/continent/countries',
    element: ContinentCountryList,
    placeholder: true,
    roles: ['all'],
  },
  {
    path: '/directory/continent/create',
    element: CreateContinent,
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
    path: '/directory/country/councils',
    element: CountryCouncilList,
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
