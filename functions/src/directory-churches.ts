import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { removeSpaces } from './utils/utils'

export const updateDocIdOnNameChange = functions.firestore
  .document('{collectionId}/{documentId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data()
    const after = change.after.data()
    const newName = after.name
    const documentId = context.params.documentId
    const collectionRef = admin
      .firestore()
      .doc(`${context.params.collectionId}/${documentId}`)

    if (
      removeSpaces(newName.toLowerCase()) !==
      removeSpaces(before.name.toLowerCase())
    ) {
      const lowercaseName = removeSpaces(newName.toLowerCase())
      return collectionRef.update({ id: lowercaseName })
    }

    return null
  })
