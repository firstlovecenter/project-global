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
    element: CityTrends,
    roles: permitMe('denomination'),
  },
]
