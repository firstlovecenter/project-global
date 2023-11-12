import { ChurchLevel, Role } from 'types/types'

export const permitAdmin = (role: ChurchLevel): Role[] => {
  switch (role) {
    case 'Campus':
      return [
        'adminPlanet',
        'adminContinent',
        'adminCountry',
        'adminCouncil',
        'adminCampus',
      ]

    case 'Council':
      return ['adminPlanet', 'adminContinent', 'adminCountry', 'adminCouncil']

    case 'Country':
      return ['adminPlanet', 'adminContinent', 'adminCountry']

    case 'Continent':
      return ['adminPlanet', 'adminContinent']

    case 'Planet':
      return ['adminPlanet']

    default:
      return []
  }
}

export const permitLeader = (role: ChurchLevel): Role[] => {
  switch (role) {
    case 'Campus':
      return [
        'leaderPlanet',
        'leaderContinent',
        'leaderCountry',
        'leaderCouncil',
        'leaderCampus',
      ]

    case 'Council':
      return [
        'leaderPlanet',
        'leaderContinent',
        'leaderCountry',
        'leaderCouncil',
      ]

    case 'Country':
      return ['leaderPlanet', 'leaderContinent', 'leaderCountry']

    case 'Continent':
      return ['leaderPlanet', 'leaderContinent']

    case 'Planet':
      return ['leaderPlanet']

    default:
      return []
  }
}
