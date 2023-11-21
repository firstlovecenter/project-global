import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import { validateRequest } from './utils/utils'

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
    const leaderQuery = admin
      .firestore()
      .collection('campuses')
      .where('leader', '==', uid)
      .where('id', '>=', searchKey?.toLowerCase())
      .where('id', '<=', searchKey?.toLowerCase() + '\uf8ff')
      .get()

    const adminQuery = admin
      .firestore()
      .collection('campuses')
      .where('admin', '==', uid)
      .where('id', '>=', searchKey?.toLowerCase())
      .where('id', '<=', searchKey?.toLowerCase() + '\uf8ff')
      .get()

    const [leaderSnapshot, adminSnapshot] = await Promise.all([
      leaderQuery,
      adminQuery,
    ])

    const leaderCampuses = leaderSnapshot.docs.map((doc) => doc.data())
    const adminCampuses = adminSnapshot.docs.map((doc) => doc.data())

    const campuses = [...leaderCampuses, ...adminCampuses]

    response.send(campuses)
  } catch (error) {
    console.error('Error searching campuses:', error)
    response.status(500).send(error)
  }
})

app.get('/member', async (request, response) => {
  type SearchParams = { uid: string; searchKey: string }
  const { searchKey } = request.query as SearchParams

  const invalidReq = validateRequest(request.query, ['uid'])

  if (invalidReq) {
    response.status(400).send(invalidReq)
    return
  }

  try {
    const firstNameQuery = admin
      .firestore()
      .collection('members')
      .orderBy('lowercaseName')
      .startAt(searchKey?.toLowerCase())
      .endAt(searchKey?.toLowerCase() + '\uf8ff')
      .get()

    const nameSnapshot = await firstNameQuery

    const members = nameSnapshot.docs.map((doc) => doc.data())

    response.send(members)
    return
  } catch (error) {
    console.error('Error searching members:', error)
    response.status(500).send(error)
  }
})

export const search = functions.region('europe-west1').https.onRequest(app)
