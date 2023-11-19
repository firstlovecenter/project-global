import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const db = admin.firestore()

export const createUserRecord = functions
  .region('europe-west1')
  .auth.user()
  .beforeSignIn((user) => {
    console.log('🚀 ~ file: auth.ts:10 ~ user:', user)
  })
