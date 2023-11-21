import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { Church, RoleChurch } from './types/types'

export const updateMemberLeads = functions
  .region('europe-west1')
  .firestore.document('continents/{continentRef}')
  .onWrite(async (change) => {
    try {
      const before = change.before.data()
      const after = change.after.data() as Church

      if (before?.leaderRef !== after?.leaderRef) {
        const oldLeaderRoleChurchesRef = await admin
          .firestore()
          .collection(`members/${before?.leaderRef}/roleChurches`)
          .get()
        const oldLeaderData = oldLeaderRoleChurchesRef.docs.map(
          (doc) => doc.data() as RoleChurch
        )

        const leaderRoleChurchesRef = await admin
          .firestore()
          .collection(`members/${after?.leaderRef}/roleChurches`)
          .get()

        const leaderRoleChurches = leaderRoleChurchesRef.docs.map(
          (doc) => doc.data() as RoleChurch
        )
        leaderRoleChurches.push({
          id: after.id,
          name: after.name,
          level: 'continent',
          role: 'leader',
        })

        const oldLeaderRoleChurches = oldLeaderData?.filter(
          (roleChurch) => roleChurch.id !== after.id
        )

        const oldLeaderRef = admin
          .firestore()
          .doc(`members/${before?.leaderRef}`)
        const newLeaderRef = admin
          .firestore()
          .doc(`members/${after?.leaderRef}`)
        const batch = admin.firestore().batch()

        batch.update(oldLeaderRef, {
          roleChurches: oldLeaderRoleChurches,
        })
        batch.update(newLeaderRef, {
          roleChurches: leaderRoleChurches,
        })

        await batch.commit()

        return
      }
    } catch (error) {
      console.error('Error updating user role churches:', error)
      throw error
    }
  })
