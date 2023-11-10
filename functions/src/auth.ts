import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const db = admin.firestore()

export const createUserRecord = functions.auth.user().onCreate(async (user) => {
  const userRef = db.doc(`users/${user.uid}`)

  return userRef.set({
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    createdAt: new Date(),
  })
})
