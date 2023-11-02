import { ChurchLevel, Role } from 'types/types'

export const permitAdmin = (role: ChurchLevel): Role[] => {
  switch (role) {
    case 'Campus':
      return [
        'adminGlobal',
        'adminContinent',
        'adminCountry',
        'adminCouncil',
        'adminCampus',
      ]

    case 'Council':
      return ['adminGlobal', 'adminContinent', 'adminCountry', 'adminCouncil']

    case 'Country':
      return ['adminGlobal', 'adminContinent', 'adminCountry']

    case 'Continent':
      return ['adminGlobal', 'adminContinent']

    case 'Global':
      return ['adminGlobal']

    default:
      return []
  }
}

export const permitLeader = (role: ChurchLevel): Role[] => {
  switch (role) {
    case 'Campus':
      return [
        'leaderGlobal',
        'leaderContinent',
        'leaderCountry',
        'leaderCouncil',
        'leaderCampus',
      ]

    case 'Council':
      return [
        'leaderGlobal',
        'leaderContinent',
        'leaderCountry',
        'leaderCouncil',
      ]

    case 'Country':
      return ['leaderGlobal', 'leaderContinent', 'leaderCountry']

    case 'Continent':
      return ['leaderGlobal', 'leaderContinent']

    case 'Global':
      return ['leaderGlobal']

    default:
      return []
  }
}
