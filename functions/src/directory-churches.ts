import * as admin from 'firebase-admin'
import { Church, ChurchLevel, RoleChurch } from './types/types'

type UpdateUserRoleArgs = {
  before?: Church
  after: Church
  level: ChurchLevel
  role: 'leader' | 'admin'
}

export const updateUserRoles = async ({
  before,
  after,
  level,
  role,
}: UpdateUserRoleArgs) => {
  const refVar = role === 'leader' ? 'leaderRef' : 'adminRef'
  const afterRef = after[refVar]
  const beforeRef = before?.[refVar]

  const leaderRoleChurchesRef = await admin
    .firestore()
    .collection(`members/${afterRef}/roleChurches`)
    .get()

  const leaderRoleChurches = leaderRoleChurchesRef.docs.map(
    (doc) => doc.data() as RoleChurch
  )

  const afterRoleChurch = {
    id: after.id,
    name: after.name,
    level,
    role,
  } as RoleChurch

  leaderRoleChurches.push(afterRoleChurch)

  const newLeaderRef = admin
    .firestore()
    .doc(
      `members/${afterRef}/roleChurches/${afterRoleChurch.id}_continent_${role}`
    )

  const oldLeaderRoleChurchesRef = await admin
    .firestore()
    .collection(`members/${beforeRef}/roleChurches`)
    .get()
  const oldLeaderData = oldLeaderRoleChurchesRef.docs.map(
    (doc) => doc.data() as RoleChurch
  )

  const oldLeaderRoleChurches = oldLeaderData?.filter(
    (roleChurch) => roleChurch.id !== after.id
  )

  const oldLeaderRef = admin
    .firestore()
    .doc(`members/${beforeRef}/roleChurches/${before?.id}_continent_${role}`)

  const batch = admin.firestore().batch()
  batch.update(newLeaderRef, {
    roleChurches: leaderRoleChurches,
  })

  if (before) {
    batch.update(oldLeaderRef, {
      roleChurches: oldLeaderRoleChurches,
    })
  }
  await batch.commit()
}
