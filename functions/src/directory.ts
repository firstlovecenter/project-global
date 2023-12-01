import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import express from 'express'
import cors from 'cors'
import axios from 'axios'
import { json } from 'body-parser'
import { Church, Member } from './types/types'
import { notifyBaseURL } from './constants'
import { validateRequest } from './utils/utils'

admin.initializeApp()

const app = express()
app.use(cors({ origin: true }), json())
const secrets = functions.config()

app.post('/member', async (request, response) => {
  const member = request.body as Member

  try {
    const memberWhatsappQuerySnapshot = await admin
      .firestore()
      .collection('members')
      .where('whatsappNumber', '==', member.whatsappNumber)
      .limit(1)
      .get()
    const memberPhoneNumberQuerySnapshot = await admin
      .firestore()
      .collection('members')
      .where('phoneNumber', '==', member.phoneNumber)
      .limit(1)
      .get()

    const memberEmailQuerySnapshot = await admin
      .firestore()
      .collection('members')
      .where('email', '==', member.email)
      .limit(1)
      .get()

    const whatsappDuplicate = memberWhatsappQuerySnapshot.docs[0]?.data()
    const phoneNumberDuplicate = memberPhoneNumberQuerySnapshot.docs[0]?.data()
    const emailDuplicate = memberEmailQuerySnapshot.docs[0]?.data()

    if (whatsappDuplicate) {
      const errorMessage = `This whatsapp number is registered to ${whatsappDuplicate.firstName} ${whatsappDuplicate.lastName}`
      response.status(400).send(errorMessage)
      return
    }

    if (phoneNumberDuplicate) {
      const errorMessage = `This phone number is registered to ${phoneNumberDuplicate.firstName} ${phoneNumberDuplicate.lastName}`
      response.status(400).send(errorMessage)
      return
    }

    if (emailDuplicate) {
      const errorMessage = `This email is registered to ${emailDuplicate.firstName} ${emailDuplicate.lastName}`
      response.status(400).send(errorMessage)
      return
    }

    const res = await Promise.all([
      admin.auth().createUser({
        uid: member.email,
        email: member.email,
        emailVerified: false,
        phoneNumber: `+${member.phoneNumber}`,
        password: 'dEfaultP@ssword',
        displayName: `${member.firstName} ${member.lastName}`,
        photoURL: member.pictureUrl,
        disabled: false,
      }),
      admin.firestore().collection('members').doc(member.email),
    ])

    const memberRef = res[1]

    const memberData = {
      ...member,
      id: member.email,
      createdAt: new Date(),
    }

    const passwordResetRes = await admin
      .auth()
      .generatePasswordResetLink(member.email)

    await Promise.all([
      axios({
        method: 'post',
        baseURL: notifyBaseURL,
        url: '/send-email',
        headers: {
          'Content-Type': 'application/json',
          'x-secret-key': secrets.FLC_NOTIFY_KEY,
        },
        data: {
          template: 'den-app-welcome-email',
          to: member.email,
          from: 'FL Den Admin <no-reply@firstlovecenter.org>',
          't:variables': JSON.stringify({
            firstName: member.firstName,
            email: member.email,
            passwordResetURL: passwordResetRes,
          }),
        },
      }),
      memberRef.set(memberData),
    ])
    response.send(memberData)
    return
  } catch (error: unknown) {
    console.log('There was an error creating the member', error)
    response.status(500).send(error)
  }
})

app.put('/member', async (request, response) => {
  const member = request.body as Member

  const memberRef = admin.firestore().doc(`members/${member.id}`)

  try {
    await Promise.all([
      memberRef.set({
        ...member,
        updatedAt: new Date(),
      }),
      admin.auth().updateUser(member.id, {
        displayName: `${member.firstName} ${member.lastName}`,
        photoURL: member.pictureUrl,
        email: member.email,
        phoneNumber: `+${member.phoneNumber}`,
      }),
    ])

    response.send(member)
    return
  } catch (error) {
    console.error('Error updating user:', error)
    response.status(500).send(error)
  }
})

app.post('/church/continent', async (request, response) => {
  const continent = request.body as Church
  const invalidReq = validateRequest(request.body, [
    'id',
    'name',
    'leaderRef',
    'denominationRef',
  ])

  if (invalidReq) {
    response.status(400).send(invalidReq)
    return
  }

  const continentRef = admin.firestore().doc(`continents/${continent.id}`)

  try {
    await continentRef.set(continent)
    response.send(continent)
    return
  } catch (error) {
    console.error('Error creating continent:', error)
    response.status(500).send(error)
  }
})

app.post('/church/country', async (request, response) => {
  const country = request.body as Church
  const invalidReq = validateRequest(request.body, [
    'id',
    'name',
    'leaderRef',
    'continentRef',
  ])

  if (invalidReq) {
    response.status(400).send(invalidReq)
    return
  }

  const countryRef = admin.firestore().doc(`countries/${country.id}`)

  try {
    await countryRef.set(country)
    response.send(country)
    return
  } catch (error) {
    console.error('Error creating country:', error)
    response.status(500).send(error)
  }
})

app.post('/church/city', async (request, response) => {
  const city = request.body as Church
  const invalidReq = validateRequest(request.body, [
    'id',
    'name',
    'leaderRef',
    'countryRef',
  ])

  if (invalidReq) {
    response.status(400).send(invalidReq)
    return
  }

  const cityRef = admin.firestore().doc(`cities/${city.id}`)

  try {
    await cityRef.set(city)
    response.send(city)
    return
  } catch (error) {
    console.error('Error creating city:', error)
    response.status(500).send(error)
  }
})

app.post('/church/family', async (request, response) => {
  const family = request.body as Church
  const invalidReq = validateRequest(request.body, [
    'id',
    'name',
    'leaderRef',
    'denominationRef',
  ])

  if (invalidReq) {
    response.status(400).send(invalidReq)
    return
  }

  const familyRef = admin.firestore().doc(`families/${family.id}`)

  try {
    await familyRef.set(family)
    response.send(family)
    return
  } catch (error) {
    console.log('Error creating family:', error)
    response.status(500).send(error)
  }
})

app.post('/church/council', async (request, response) => {
  const council = request.body as Church
  const invalidReq = validateRequest(request.body, [
    'id',
    'name',
    'leaderRef',
    'familyRef',
  ])

  if (invalidReq) {
    response.status(400).send(invalidReq)
    return
  }

  const councilRef = admin.firestore().doc(`councils/${council.id}`)

  try {
    await councilRef.set(council)
    response.send(council)
    return
  } catch (error) {
    console.log('Error creating council:', error)
    response.status(500).send(error)
  }
})

export const directory = functions.region('europe-west1').https.onRequest(app)
