import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import express from 'express'
import cors from 'cors'
import axios from 'axios'
import { json } from 'body-parser'
import { Church, ChurchData, Member } from './types/types'
import { notifyBaseURL } from './constants'
import { validateRequest, toKebabCase } from './utils/utils'

admin.initializeApp()

const app = express()
app.use(cors({ origin: true }), json())

app.post('/member', async (request, response) => {
  // access from doppler JSON.parse(process.env.CLOUD_RUNTIME_CONFIG).doppler.FLC_NOTIFY_KEY
  // const doppler = JSON.parse(process.env.CLOUD_RUNTIME_CONFIG).doppler
  // const notifyKey = doppler.FLC_NOTIFY_KEY

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
          'x-secret-key': process.env.FLC_NOTIFY_KEY,
        },
        data: {
          template: 'den-app-welcome-email',
          to: member.email,
          from: 'FL Den Admin <no-reply@firstlovecenter.org>',
          't:variables': {
            firstName: member.firstName,
            email: member.email,
            passwordResetURL: passwordResetRes,
          },
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

app.post('/church/denomination', async (request, response) => {
  const denomination = request.body as Church
  const invalidReq = validateRequest(request.body, ['name', 'leaderRef'])

  if (invalidReq) {
    response.status(400).send(invalidReq)
    return
  }

  const denominationId = toKebabCase(denomination.name)

  const denominationRef = admin
    .firestore()
    .doc(`denominations/${denominationId}`)

  const churchData = formatInputData(denomination, denominationId)
  try {
    await denominationRef.set(churchData)

    // get the leaderRef
    const memberData = await getMemberByLeaderRef(denomination.leaderRef)

    if (!memberData.exist) {
      const churchData = {
        ...memberData,
        churchName: denomination.name,
      } as ChurchData

      await sendChurchLeaderEmail(churchData)
    }

    response.send(denomination)
    return
  } catch (error) {
    console.error('Error creating continent:', error)
    response.status(500).send(error)
  }
})

app.post('/church/continent', async (request, response) => {
  const continent = request.body as Church
  const invalidReq = validateRequest(request.body, [
    'name',
    'leaderRef',
    'denominationRef',
  ])

  if (invalidReq) {
    response.status(400).send(invalidReq)
    return
  }

  try {
    const continentId = toKebabCase(continent.name)
    const continentRef = admin.firestore().doc(`continents/${continentId}`)

    const churchData = formatInputData(continent, continentId)
    await continentRef.set(churchData)

    // get the leaderRef
    const memberData = await getMemberByLeaderRef(continent.leaderRef)

    if (!memberData.exist) {
      const churchData = {
        ...memberData,
        churchName: continent.name,
      } as ChurchData

      await sendChurchLeaderEmail(churchData)
    }

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
    'name',
    'leaderRef',
    'continentRef',
  ])

  if (invalidReq) {
    response.status(400).send(invalidReq)
    return
  }

  try {
    const countryId = toKebabCase(country.name)
    const countryRef = admin.firestore().doc(`countries/${countryId}`)

    const churchData = formatInputData(country, countryId)
    await countryRef.set(churchData)
    // get the leaderRef
    const memberData = await getMemberByLeaderRef(country.leaderRef)

    if (!memberData.exist) {
      const churchData = {
        ...memberData,
        churchName: country.name,
      } as ChurchData
      await sendChurchLeaderEmail(churchData)
    }

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
    'name',
    'leaderRef',
    'countryRef',
  ])

  if (invalidReq) {
    response.status(400).send(invalidReq)
    return
  }

  try {
    const cityId = toKebabCase(city.name)
    const cityRef = admin.firestore().doc(`cities/${cityId}`)
    const churchData = formatInputData(city, cityId)
    await cityRef.set(churchData)

    // get the leaderRef
    const memberData = await getMemberByLeaderRef(city.leaderRef)

    if (memberData.exist) {
      const churchData = {
        ...memberData,
        churchName: city.name,
      } as ChurchData
      await sendChurchLeaderEmail(churchData)
    }
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
    'name',
    'leaderRef',
    'denominationRef',
  ])

  if (invalidReq) {
    response.status(400).send(invalidReq)
    return
  }

  try {
    const familyId = toKebabCase(family.name)
    const familyRef = admin.firestore().doc(`families/${family.id}`)
    const churchData = formatInputData(family, familyId)

    await familyRef.set(churchData)

    // get the leaderRef
    const memberData = await getMemberByLeaderRef(family.leaderRef)

    if (memberData.exist) {
      const churchData = {
        ...memberData,
        churchName: family.name,
      } as ChurchData
      await sendChurchLeaderEmail(churchData)
    }
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
    'name',
    'leaderRef',
    'familyRef',
  ])

  if (invalidReq) {
    response.status(400).send(invalidReq)
    return
  }

  try {
    const councilId = toKebabCase(council.name)
    const councilRef = admin.firestore().doc(`councils/${councilId}`)

    const churchData = formatInputData(council, councilId)
    await councilRef.set(churchData)

    // get the leaderRef
    const memberData = await getMemberByLeaderRef(council.leaderRef)

    if (memberData.exist) {
      const churchData = {
        ...memberData,
        churchName: council.name,
      } as ChurchData
      await sendChurchLeaderEmail(churchData)
    }
    response.send(council)
    return
  } catch (error) {
    console.log('Error creating council:', error)
    response.status(500).send(error)
  }
})

app.post('/church/campus', async (request, response) => {
  const campus = request.body as Church
  const invalidReq = validateRequest(request.body, [
    'name',
    'leaderRef',
    'councilRef',
    'cityRef',
  ])

  if (invalidReq) {
    response.status(400).send(invalidReq)
    return
  }

  try {
    const campusId = toKebabCase(campus.name)
    const campusRef = admin.firestore().doc(`campuses/${campusId}`)

    const churchData = formatInputData(campus, campusId)
    await campusRef.set(churchData)

    // get the leaderRef
    const memberData = await getMemberByLeaderRef(campus.leaderRef)

    if (memberData.exist) {
      const churchData = {
        ...memberData,
        churchName: campus.name,
      } as ChurchData
      await sendChurchLeaderEmail(churchData)
    }
    response.send(campus)
    return
  } catch (error) {
    console.log('Error creating campus:', error)
    response.status(500).send(error)
  }
})

async function getMemberByLeaderRef(leaderRef: string) {
  const memberEmailQuerySnapshot = await admin
    .firestore()
    .collection('members')
    .where('email', '==', leaderRef)
    .limit(1)
    .get()

  const memberData = memberEmailQuerySnapshot.docs[0]?.data()
  return memberData
}

function formatInputData(churchData: object, id: string) {
  return {
    ...churchData,
    id: id,
  }
}

async function sendChurchLeaderEmail(ChurchData: ChurchData) {
  await Promise.all([
    axios({
      method: 'post',
      baseURL: notifyBaseURL,
      url: '/send-email',
      headers: {
        'Content-Type': 'application/json',
        'x-secret-key': process.env.FLC_NOTIFY_KEY,
      },
      data: {
        template: 'den-app-church-leader-email',
        to: ChurchData.email,
        from: 'FL Den Admin <no-reply@firstlovecenter.org>',
        't:variables': {
          firstName: ChurchData.firstName,
          // email: ChurchData.email,
          churchName: ChurchData.churchName,
        },
      },
    }),
  ])
}
export const directory = functions
  .region('europe-west1')
  .runWith({
    secrets: ['FLC_NOTIFY_KEY'],
  })
  .https.onRequest(app)
