import * as functions from 'firebase-functions'
import { Church } from './types/types'
import { updateUserRoles } from './directory-churches'

export const updateMemberLeadsOrAdminsContinent = functions
  .region('europe-west1')
  .firestore.document('continents/{continentRef}')
  .onWrite(async (change) => {
    try {
      const before = change.before.data() as Church | undefined
      const after = change.after.data() as Church

      if (before?.leaderRef !== after?.leaderRef) {
        await updateUserRoles({
          before,
          after,
          level: 'continent',
          role: 'leader',
        })
      }

      if (before?.adminRef !== after?.adminRef) {
        await updateUserRoles({
          before,
          after,
          level: 'continent',
          role: 'admin',
        })
      }

      return
    } catch (error) {
      console.error('Error updating user role churches:', error)
      throw error
    }
  })

export const updateMemberLeadsOrAdminsCountry = functions
  .region('europe-west1')
  .firestore.document('countries/{countryRef}')
  .onWrite(async (change) => {
    try {
      const before = change.before.data() as Church | undefined
      const after = change.after.data() as Church

      if (before?.leaderRef !== after?.leaderRef) {
        await updateUserRoles({
          before,
          after,
          level: 'country',
          role: 'leader',
        })
      }

      if (before?.adminRef !== after?.adminRef) {
        await updateUserRoles({
          before,
          after,
          level: 'country',
          role: 'admin',
        })
      }

      return
    } catch (error) {
      console.error('Error updating user role churches:', error)
      throw error
    }
  })

export const updateMemberLeadsOrAdminsCity = functions
  .region('europe-west1')
  .firestore.document('cities/{cityRef}')
  .onWrite(async (change) => {
    try {
      const before = change.before.data() as Church | undefined
      const after = change.after.data() as Church

      if (before?.leaderRef !== after?.leaderRef) {
        await updateUserRoles({
          before,
          after,
          level: 'city',
          role: 'leader',
        })
      }

      if (before?.adminRef !== after?.adminRef) {
        await updateUserRoles({
          before,
          after,
          level: 'city',
          role: 'admin',
        })
      }

      return
    } catch (error) {
      console.error('Error updating user role churches:', error)
      throw error
    }
  })

export const updateMemberLeadsOrAdminsCampus = functions
  .region('europe-west1')
  .firestore.document('campuses/{campusRef}')
  .onWrite(async (change) => {
    try {
      const before = change.before.data() as Church | undefined
      const after = change.after.data() as Church

      if (before?.leaderRef !== after?.leaderRef) {
        await updateUserRoles({
          before,
          after,
          level: 'campus',
          role: 'leader',
        })
      }

      if (before?.adminRef !== after?.adminRef) {
        await updateUserRoles({
          before,
          after,
          level: 'campus',
          role: 'admin',
        })
      }

      return
    } catch (error) {
      console.error('Error updating user role churches:', error)
      throw error
    }
  })
