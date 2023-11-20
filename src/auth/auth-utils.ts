import { ChurchLevel, Role } from 'types/types'

export const permitAdmin = (role: ChurchLevel): Role[] => {
  switch (role) {
    case 'campus':
      return [
        'adminPlanet',
        'adminContinent',
        'adminCountry',
        'adminCouncil',
        'adminCampus',
      ]

    case 'council':
      return ['adminPlanet', 'adminContinent', 'adminCountry', 'adminCouncil']

    case 'country':
      return ['adminPlanet', 'adminContinent', 'adminCountry']

    case 'continent':
      return ['adminPlanet', 'adminContinent']

    case 'planet':
      return ['adminPlanet']

    default:
      return []
  }
}

export const permitLeader = (role: ChurchLevel): Role[] => {
  switch (role) {
    case 'campus':
      return [
        'leaderPlanet',
        'leaderContinent',
        'leaderCountry',
        'leaderCouncil',
        'leaderCampus',
      ]

    case 'council':
      return [
        'leaderPlanet',
        'leaderContinent',
        'leaderCountry',
        'leaderCouncil',
      ]

    case 'country':
      return ['leaderPlanet', 'leaderContinent', 'leaderCountry']

    case 'continent':
      return ['leaderPlanet', 'leaderContinent']

    case 'planet':
      return ['leaderPlanet']

    default:
      return []
  }
}
