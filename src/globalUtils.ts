import { ChurchLevel } from 'types/types'

export const pluralize = (word?: string, count?: number) => {
  if (!word) {
    return ''
  }

  if (word === 'campus') {
    return count === 1 ? word : 'campuses'
  }
  if (word === 'country') {
    return count === 1 ? word : 'countries'
  }

  return count === 1 ? word : `${word}s`
}

export const getSubGeoChurch = (church: ChurchLevel) => {
  switch (church) {
    case 'Planet':
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
  switch (church) {
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
