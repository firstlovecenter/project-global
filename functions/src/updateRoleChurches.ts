import * as functions from 'firebase-functions'

export const updateMemberLeadsCampuses = functions
  .region('europe-west1')
  .firestore.document('members/{memberId}')
  .onWrite(async () => {
    try {
      // TODO Implement RoleChurchers Update when member is  made a leader
    } catch (error) {
      console.error('Error updating user role churches:', error)
      throw error
    }
  })
