import {
  TitleOptions,
  GenderOptions,
  MaritalStatusOptions,
} from '@jaedag/admin-portal-types'
import { User } from 'firebase/auth'

export interface Member extends User {
  id: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  pictureUrl: string
  whatsappNumber: string
  phoneNumber: string
  campus: string

  dateOfBirth: string
  title: TitleOptions
  gender: GenderOptions
  maritalStatus: MaritalStatusOptions
  occupation: string

  leadsCampuses?: string[]
  leadsCouncils?: string[]
  leadsCountries?: string[]
  leadsContinents?: string[]
  leadsDenominations?: string[]

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
  | 'Planet'
  | 'Continent'
  | 'Country'
  | 'City'
  | 'Denomination'
  | 'Family'
  | 'Council'
  | 'Campus'

export type Role =
  | 'adminPlanet'
  | 'adminContinent'
  | 'adminCountry'
  | 'adminCity'
  | 'adminDenomination'
  | 'adminFamily'
  | 'adminCouncil'
  | 'adminCampus'
  | 'leaderPlanet'
  | 'leaderContinent'
  | 'leaderCountry'
  | 'leaderCity'
  | 'leaderDenomination'
  | 'leaderFamily'
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
