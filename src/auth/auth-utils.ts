import { ChurchLevel, Role } from 'types/types'

export const permitAdmin = (role: ChurchLevel): Role[] => {
  switch (role) {
    case 'campus':
      return [
        'adminGlobal',
        'adminContinent',
        'adminCountry',
        'adminCouncil',
        'adminCampus',
      ]

    case 'council':
      return ['adminGlobal', 'adminContinent', 'adminCountry', 'adminCouncil']

    case 'country':
      return ['adminGlobal', 'adminContinent', 'adminCountry']

    case 'continent':
      return ['adminGlobal', 'adminContinent']

    case 'global':
      return ['adminGlobal']

    default:
      return []
  }
}

export const permitLeader = (role: ChurchLevel): Role[] => {
  switch (role) {
    case 'campus':
      return [
        'leaderGlobal',
        'leaderContinent',
        'leaderCountry',
        'leaderCouncil',
        'leaderCampus',
      ]

    case 'council':
      return [
        'leaderGlobal',
        'leaderContinent',
        'leaderCountry',
        'leaderCouncil',
      ]

    case 'country':
      return ['leaderGlobal', 'leaderContinent', 'leaderCountry']

    case 'continent':
      return ['leaderGlobal', 'leaderContinent']

    case 'global':
      return ['leaderGlobal']

    default:
      return []
  }
}
