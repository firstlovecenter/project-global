import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const updateUserClaims = functions
  .region('europe-west1')
  .firestore.document('members/{memberId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data()
    const after = change.after.data()

    if (before.roles !== after.roles) {
      const { roles } = after
      const uid = context.params.memberId

      await admin.auth().setCustomUserClaims(uid, { roles })
    }

    return null
  })
