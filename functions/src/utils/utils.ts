import { ChurchLevelLowercase, Member } from '../types/types'

export const getMemberHighestRole = (member: Member) => {
  type HighestRoleType = {
    level: ChurchLevelLowercase
    role: 'leader' | 'admin'
    ids: string[] | undefined
  }
  let highestRole: HighestRoleType = {
    level: 'campus',
    role: 'leader',
    ids: [''],
  }

  if (member.leadsCampuses?.length ?? 0 > 0) {
    highestRole = { level: 'campus', role: 'leader', ids: member.leadsCampuses }
  }
  if (member.adminCampuses?.length ?? 0 > 0) {
    highestRole = { level: 'campus', role: 'admin', ids: member.adminCampuses }
  }
  if (member.leadsCouncils?.length ?? 0 > 0) {
    highestRole = {
      level: 'council',
      role: 'leader',
      ids: member.leadsCouncils,
    }
  }
  if (member.adminCouncils?.length ?? 0 > 0) {
    highestRole = { level: 'council', role: 'admin', ids: member.adminCouncils }
  }
  if (member.leadsCountries?.length ?? 0 > 0) {
    highestRole = {
      level: 'country',
      role: 'leader',
      ids: member.leadsCountries,
    }
  }
  if (member.adminCountries?.length ?? 0 > 0) {
    highestRole = {
      level: 'country',
      role: 'admin',
      ids: member.adminCountries,
    }
  }
  if (member.leadsContinents?.length ?? 0 > 0) {
    highestRole = {
      level: 'continent',
      role: 'leader',
      ids: member.leadsContinents,
    }
  }
  if (member.adminContinents?.length ?? 0 > 0) {
    highestRole = {
      level: 'continent',
      role: 'admin',
      ids: member.adminContinents,
    }
  }

  if (member.leadsDenominations?.length ?? 0 > 0) {
    highestRole = {
      level: 'denomination',
      role: 'leader',
      ids: member.leadsDenominations,
    }
  }
  if (member.adminDenominations?.length ?? 0 > 0) {
    highestRole = {
      level: 'denomination',
      role: 'admin',
      ids: member.adminDenominations,
    }
  }

  return highestRole
}

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateRequest = (request: any, requiredFields: string[]) => {
  const missingFields = requiredFields.filter((field) => !request[field])

  if (missingFields.length > 0) {
    return `Missing fields: ${missingFields.join(', ')}`
  }

  return null
}

export const removeSpaces = (str: string) => {
  return str.replace(/\s/g, '')
}
