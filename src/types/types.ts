import {
  TitleOptions,
  GenderOptions,
  MaritalStatusOptions,
} from '@jaedag/admin-portal-types'
import { User } from 'firebase/auth'
import { Timestamp } from 'firebase/firestore'

export interface Member extends User {
  id: string
  createdAt: Timestamp
  updatedAt: Timestamp
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
  employeeStatus: string

  housesOwned: number
  carsOwned: number

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
  | 'planet'
  | 'continent'
  | 'country'
  | 'city'
  | 'denomination'
  | 'family'
  | 'council'
  | 'campus'

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
  leaderRef: string
  adminRef: string
}
