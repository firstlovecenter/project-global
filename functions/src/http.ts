import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

export const basicHTTP = functions.https.onRequest((request, response) => {
  //   const name = request.query.name

  //   if (!name) {
  //     response.status(400).send('You must supply a name :(')
  //   }

  response.send('Hi from project global')
})
