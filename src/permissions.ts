import { ChurchLevel, Role } from 'types/types'

export const permitLeader = (roles: ChurchLevel): Role[] => {
  switch (roles) {
    case 'Denomination':
      return ['leaderDenomination']
    case 'Continent':
      return ['leaderContinent', 'leaderDenomination']
    case 'Country':
      return ['leaderCountry', 'leaderContinent', 'leaderDenomination']
    case 'City':
      return [
        'leaderCity',
        'leaderCountry',
        'leaderContinent',
        'leaderDenomination',
      ]

    case 'Family':
      return ['leaderFamily', 'leaderDenomination']
    case 'Council':
      return ['leaderCouncil', 'leaderFamily', 'leaderDenomination']

    case 'Campus':
      return [
        'leaderCampus',
        'leaderCouncil',
        'leaderFamily',
        'leaderDenomination',
      ]

    default:
      return []
  }
}

export const permitAdmin = (roles: ChurchLevel): Role[] => {
  switch (roles) {
    case 'Denomination':
      return ['adminDenomination']
    case 'Continent':
      return ['adminContinent', 'adminDenomination']
    case 'Country':
      return ['adminCountry', 'adminContinent', 'adminDenomination']
    case 'City':
      return [
        'adminCity',
        'adminCountry',
        'adminContinent',
        'adminDenomination',
      ]

    case 'Family':
      return ['adminFamily', 'adminDenomination']
    case 'Council':
      return ['adminCouncil', 'adminFamily', 'adminDenomination']

    case 'Campus':
      return ['adminCampus', 'adminCouncil', 'adminFamily', 'adminDenomination']

    default:
      return []
  }
}

export const permitMe = (level: ChurchLevel): Role[] => {
  return [...permitLeader(level), ...permitAdmin(level)]
}
