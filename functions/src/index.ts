/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from 'firebase-functions/v2/https'
import * as logger from 'firebase-functions/logger'
import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})

admin.initializeApp()

export const pushToArray = functions.firestore
  .document('users/{userId}/leadsCampuses/{campusId}')
  .onWrite(async (change, context) => {
    const { userId, campusId } = context.params

    try {
      const campusRef = admin.firestore().doc(`campuses/${campusId}`)
      const campus = (await campusRef.get()).data()

      const userRef = admin.firestore().doc(`users/${userId}`)

      return userRef.update({
        leadsChurches: admin.firestore.FieldValue.arrayUnion({
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
