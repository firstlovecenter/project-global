import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const updateRoleChurchesFromLeadsCampuses23 = functions.firestore
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
