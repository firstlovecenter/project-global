import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as cors from 'cors'
import { json } from 'body-parser'
import { Member } from './types/types'

admin.initializeApp()

const app = express()
app.use(cors({ origin: true }), json())

app.post('/create-member', async (request, response) => {
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

    const memberRef = admin.firestore().collection('members').doc(member.email)

    const memberData = {
      ...member,
      id: member.email,
      createdAt: new Date(),
    }
    await memberRef.set(memberData)
    response.send(memberData)
    return
  } catch (error: unknown) {
    console.log('There was an error creating the member')
    response.status(500).send(error)
  }
})

app.post('/update-member', async (request, response) => {
  const { uid } = request.body

  const userRef = admin.firestore().doc(`members/${uid}`)

  try {
    await userRef.set({
      id: uid,
      firstName: 'John-Dag',
      lastName: 'Addy',
      email: 'jaedagy@gmail.com',
      phoneNumber: '233594760323',
      photoURL: 'https://lh3.goo',
      createdAt: new Date(),
    })
    response.send('Member updated')
  } catch (error) {
    console.error('Error updating user:', error)
    response.status(500).send(error)
  }
})

export const directory = functions.region('europe-west1').https.onRequest(app)
