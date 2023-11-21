import * as functions from 'firebase-functions'
import { Church } from './types/types'
import { updateUserRoles } from './directory-churches'

export const updateMemberLeadsOrAdmins = functions
  .region('europe-west1')
  .firestore.document('continents/{continentRef}')
  .onWrite(async (change) => {
    try {
      const before = change.before.data() as Church | undefined
      const after = change.after.data() as Church

      if (before?.leaderRef !== after?.leaderRef) {
        updateUserRoles({ before, after, level: 'continent', role: 'leader' })
      }

      if (before?.adminRef !== after?.adminRef) {
        updateUserRoles({ before, after, level: 'continent', role: 'admin' })
      }

      return
    } catch (error) {
      console.error('Error updating user role churches:', error)
      throw error
    }
  })
