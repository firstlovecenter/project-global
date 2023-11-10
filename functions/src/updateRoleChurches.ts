import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { Member, RoleChurch } from '../../src/types/types'

export const updateMemberLeadsCampuses = functions.firestore
  .document('members/{memberId}/leadsCampuses')
  .onWrite(async (change) => {
    const before = change.before.data() as Member
    const after = change.after.data() as Member

    try {
      const campuses = after.leadsCampuses || []
      const campusesSnapshot = await admin
        .firestore()
        .collection('campuses')
        .where('id', 'in', campuses.length ? campuses : ['none'])
        .get()

      const campusesData = campusesSnapshot.docs.map((doc) => doc.data())

      const memberRef = admin.firestore().doc(`members/${after.id}`)
      const memberSnapshot = await memberRef.get()
      const memberData = memberSnapshot.data() as Member

      const roleChurches = memberData?.roleChurches || []

      // remove all before campuses
      roleChurches.forEach((campus) => {
        if (before.leadsCampuses?.includes(campus.id)) {
          roleChurches.splice(roleChurches.indexOf(campus), 1)
        }
      })

      // add all after campuses
      campusesData?.forEach((campus) => {
        roleChurches.push({
          id: campus.id,
          name: campus.name,
          level: 'Campus',
          role: 'leader',
        })
      })

      return memberRef.update({
        roleChurches: roleChurches.reduce(
          (acc: RoleChurch[], current: RoleChurch) => {
            if (!acc.find((obj) => obj.id === current.id)) {
              acc.push(current)
            }
            return acc
          },
          []
        ),
      })
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  })
