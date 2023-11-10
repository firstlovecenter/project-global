import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as cors from 'cors'

admin.initializeApp()

const app = express()
app.use(cors({ origin: true }))

app.get('cat', (request, response) => {
  response.send('CAT')
})

app.get('dog', (request, response) => {
  response.send('DOG')
})

export const api = functions.https.onRequest(app)
