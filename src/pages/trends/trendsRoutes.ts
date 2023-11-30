import { LazyRouteTypes } from 'auth/auth-types'
import { permitMe } from 'permissions'
import { lazy } from 'react'

const ContinentsList = lazy(
  () => import('../directory/church-subchurch-lists/DenominationContinentsList')
)
const ContinentTrends = lazy(
  () => import('../directory/profile/ContinentProfile')
)

const CountriesList = lazy(
  () => import('../directory/church-subchurch-lists/ContinentCountriesList')
)
const CountryTrends = lazy(() => import('../directory/profile/CountryProfile'))

const CitiesList = lazy(
  () => import('../directory/church-subchurch-lists/CountryCitiesList')
)
const CityTrends = lazy(() => import('../directory/profile/CityProfile'))
const FamiliesList = lazy(
  () => import('../directory/church-subchurch-lists/DenominationFamiliesList')
)
const FamilyTrends = lazy(() => import('../directory/profile/FamilyProfile'))
const CouncilList = lazy(
  () => import('../directory/church-subchurch-lists/FamilyCouncilsList')
)
const CouncilTrends = lazy(() => import('../directory/profile/CouncilProfile'))
const CouncilCampusesList = lazy(
  () => import('../directory/church-subchurch-lists/CouncilCampusesList')
)
const CityCampuses = lazy(
  () => import('../directory/church-subchurch-lists/CityCampusesList')
)
const CampusTrends = lazy(() => import('../directory/profile/CampusProfile'))

export const churchInsightsRoutes: LazyRouteTypes[] = [
  {
    path: '/continents-list',
    element: ContinentsList,
    placeholder: true,
    roles: permitMe('denomination'),
  },
  {
    path: '/trends/continent',
    element: ContinentTrends,
    roles: permitMe('continent'),
  },
  {
    path: '/countries-list',
    element: CountriesList,
    placeholder: true,
    roles: permitMe('country'),
  },
  {
    path: '/trends/country',
    element: CountryTrends,
    roles: permitMe('country'),
  },
  {
    path: '/cities-list',
    element: CitiesList,
    placeholder: true,
    roles: permitMe('city'),
  },
  {
    path: '/trends/city',
    element: CityTrends,
    roles: permitMe('city'),
  },
  {
    path: '/families-list',
    element: FamiliesList,
    placeholder: true,
    roles: permitMe('denomination'),
  },
  {
    path: '/trends/family',
    element: FamilyTrends,
    roles: permitMe('denomination'),
  },
  {
    path: '/councils-list',
    element: CouncilList,
    placeholder: true,
    roles: permitMe('family'),
  },
  {
    path: '/trends/council',
    element: CouncilTrends,
    roles: permitMe('family'),
  },
]
