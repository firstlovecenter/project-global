import { capitalise } from '@jaedag/admin-portal-react-core'
import { ChurchLevel } from 'types/types'

export const pluralize = (word?: string, count?: number) => {
  if (!word) {
    return ''
  }

  if (count === 1) {
    return word
  }

  /**
   * Object containing plural forms for certain words.
   * @type {Object<string, string>}
   */

  const pluralForms: { [key: string]: string } = {
    campus: 'campuses',
    Campus: 'Campuses',
    family: 'families',
    Family: 'Families',
    country: 'countries',
    Country: 'Countries',
    city: 'cities',
    City: 'Cities',
  }

  if (word in pluralForms) {
    return pluralForms[word]
  }

  return count === 1 ? word : `${word}s`
}

export const getSubGeoChurch = (church: ChurchLevel) => {
  switch (capitalise(church)) {
    case 'Denomination':
      return 'Continent'
    case 'Continent':
      return 'Country'
    case 'Country':
      return 'City'
    case 'City':
      return 'Campus'

    default:
      return ''
  }
}

export const getSubFamilyChurch = (church: ChurchLevel) => {
  switch (capitalise(church)) {
    case 'Denomination':
      return 'Family'
    case 'Family':
      return 'Council'
    case 'Council':
      return 'Campus'

    default:
      return ''
  }
}
