/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp()

export const updateRoleChurchesFromLeadsCampuses = functions.firestore
  .document('members/{memberId}/leadsCampuses/{campusId}')
  .onWrite(async (change, context) => {
    const { memberId, campusId } = context.params

    try {
      const campusRef = admin.firestore().doc(`campuses/${campusId}`)
      const campus = (await campusRef.get()).data()

      const userRef = admin.firestore().doc(`members/${memberId}`)

      return userRef.update({
        roleChurches: admin.firestore.FieldValue.arrayUnion({
          id: campusId,
          name: campus?.name,
          level: 'campus',
          role: 'leader',
        }),
      })
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  })
