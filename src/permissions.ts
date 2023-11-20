import { ChurchLevel, Role } from 'types/types'

export const permitLeader = (roles: ChurchLevel): Role[] => {
  switch (roles) {
    case 'denomination':
      return ['leaderDenomination']
    case 'continent':
      return ['leaderContinent', 'leaderDenomination']
    case 'country':
      return ['leaderCountry', 'leaderContinent', 'leaderDenomination']
    case 'city':
      return [
        'leaderCity',
        'leaderCountry',
        'leaderContinent',
        'leaderDenomination',
      ]

    case 'family':
      return ['leaderFamily', 'leaderDenomination']
    case 'council':
      return ['leaderCouncil', 'leaderFamily', 'leaderDenomination']

    case 'campus':
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
    case 'denomination':
      return ['adminDenomination']
    case 'continent':
      return ['adminContinent', 'adminDenomination']
    case 'country':
      return ['adminCountry', 'adminContinent', 'adminDenomination']
    case 'city':
      return [
        'adminCity',
        'adminCountry',
        'adminContinent',
        'adminDenomination',
      ]

    case 'family':
      return ['adminFamily', 'adminDenomination']
    case 'council':
      return ['adminCouncil', 'adminFamily', 'adminDenomination']

    case 'campus':
      return ['adminCampus', 'adminCouncil', 'adminFamily', 'adminDenomination']

    default:
      return []
  }
}

export const permitMe = (level: ChurchLevel): Role[] => {
  return [...permitLeader(level), ...permitAdmin(level)]
}
