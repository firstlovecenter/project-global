import {
  TitleOptions,
  GenderOptions,
  MaritalStatusOptions,
} from '@jaedag/admin-portal-types'

export interface Member {
  id: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  pictureUrl: string
  whatsappNumber: string
  phoneNumber: string
  campus: Church

  dateOfBirth: string
  title: TitleOptions
  gender: GenderOptions
  maritalStatus: MaritalStatusOptions
  occupation: string

  leadsCampuses?: string[]
  adminCampuses?: string[]
  leadsCouncils?: string[]
  adminCouncils?: string[]
  leadsCountries?: string[]
  adminCountries?: string[]
  leadsContinents?: string[]
  adminContinents?: string[]
  leadsDenominations?: string[]
  adminDenominations?: string[]

  roles: Role[]
  roleChurches: RoleChurch[]
  selectedProfile: RoleChurch
}

export type RoleChurch = {
  id: string
  name: string
  level: ChurchLevel
  role: string | 'Leader' | 'Admin'
}

export type RoleChurches = {
  campuses: RoleChurch[]
}

export type ChurchLevel =
  | 'Denomination'
  | 'Continent'
  | 'Country'
  | 'Council'
  | 'Campus'
export type ChurchLevelLowercase =
  | 'denomination'
  | 'continent'
  | 'country'
  | 'council'
  | 'campus'

export type Role =
  | 'adminPlanet'
  | 'adminContinent'
  | 'adminCountry'
  | 'adminCouncil'
  | 'adminCampus'
  | 'leaderPlanet'
  | 'leaderContinent'
  | 'leaderCountry'
  | 'leaderCouncil'
  | 'leaderCampus'
  | 'all'

export interface Church {
  id: string
  level: ChurchLevel
  name: string
  leader: Member
  admin: Member
}
