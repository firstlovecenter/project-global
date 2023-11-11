import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as cors from 'cors'
import { json } from 'body-parser'
import { Member } from './types/types'
import { getMemberHighestRole, validateRequest } from './utils/utils'

const app = express()
app.use(cors({ origin: true }), json())

app.get('/campus', async (request, response) => {
  type SearchParams = { uid: string; searchKey: string }
  const { uid, searchKey } = request.query as SearchParams

  const invalidReq = validateRequest(request.query, ['uid'])

  if (invalidReq) {
    response.status(400).send(invalidReq)
    return
  }

  try {
    const memberRef = admin.firestore().doc(`members/${uid}`)
    const memberSnapshot = await memberRef.get()
    const memberData = memberSnapshot.data() as Member

    const highestRole = getMemberHighestRole(memberData)

    const churchSnapshot = await admin
      .firestore()
      .collection('campuses')
      .where(`${highestRole?.level}`, 'in', highestRole.ids)
      .where('id', '>=', searchKey?.toLowerCase())
      .where('id', '<=', searchKey?.toLowerCase() + '\uf8ff')
      .get()

    const churches = churchSnapshot.docs.map((doc) => doc.data())

    response.send(churches)
  } catch (error) {
    console.error('Error searching campuses:', error)
    response.status(500).send(error)
  }
})

export const search = functions.region('europe-west1').https.onRequest(app)
