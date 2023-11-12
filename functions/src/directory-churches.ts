import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

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

    if (newName.toLowerCase() !== before.name.toLowerCase()) {
      const lowercaseName = newName.toLowerCase()
      return collectionRef.update({ id: lowercaseName })
    }

    return null
  })
