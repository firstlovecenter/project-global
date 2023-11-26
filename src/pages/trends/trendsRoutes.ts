import { LazyRouteTypes } from 'auth/auth-types'
import { permitMe } from 'permissions'
import { lazy } from 'react'

const ContinentsList = lazy(
  () => import('../directory/denomination/DenominationContinentsList')
)
const ContinentTrends = lazy(() => import('./ContinentTrends'))

const CountriesList = lazy(
  () => import('../directory/continent/ContinentCountriesList')
)
const CountryTrends = lazy(() => import('./CountryTrends'))

const CitiesList = lazy(() => import('../directory/country/CountryCitiesList'))
const CityTrends = lazy(() => import('./CityTrends'))

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
]
