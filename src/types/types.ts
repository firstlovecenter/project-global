import {
  TitleOptions,
  GenderOptions,
  MaritalStatusOptions,
} from '@jaedag/admin-portal-types'
import { User } from 'firebase/auth'

export interface Member extends User {
  id: string
  roles: Role[]
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
}

export type ChurchLevel =
  | 'global'
  | 'continent'
  | 'country'
  | 'council'
  | 'campus'

export type Role =
  | 'adminGlobal'
  | 'adminContinent'
  | 'adminCountry'
  | 'adminCouncil'
  | 'adminCampus'
  | 'leaderGlobal'
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
