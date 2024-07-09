import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'

const app = express()
app.use(cors({ origin: true }), json())

const db = admin.firestore()

app.get('/campuses/:campusId/members', async (request, response) => {
  const campusId = request.params.campusId

  const campusMembershipSnapShot = db
    .collection('members')
    .where('campus', '==', campusId)

  const campusMembershipCount = (
    await campusMembershipSnapShot.count().get()
  ).data().count
  const campusMembership = (await campusMembershipSnapShot.limit(20).get()).docs

  const members = campusMembership.map((doc) => ({ id: doc.id, ...doc.data() }))

  const memberData = {
    campusMembershipCount,
    members,
  }
  response.send(memberData)
})

app.get('/church/councils/:councilId/members', async (request, response) => {
  const councilId = request.params.councilId

  const councilSnapshot = await db
    .collection('councils')
    .where('id', '==', councilId)
    .get()

  const councilData = councilSnapshot.docs[0]?.data()

  if (!councilData) {
    const errorMessage = `This council, ${councilId} does not exist. Check again`
    response.status(404).send(errorMessage)
    return
  }

  const campuses = await getCampusByCouncils([councilId])
  const campusDocIds = campuses.map((campus) => campus.id)

  const members = await getMembersByCampus(campusDocIds)

  response.send(members)
})

app.get('/church/families/:familyId/members', async (request, response) => {
  const familyId = request.params.familyId

  const familySnapshot = await db
    .collection('families')
    .where('id', '==', familyId)
    .get()

  const familyData = familySnapshot.docs[0]?.data()

  if (!familyData) {
    const errorMessage = `The family, ${familyId} does not exist. Check again`
    response.status(404).send(errorMessage)
    return
  }

  const familyMembers = await getFamilyMembers([familyId])

  response.send(familyMembers)
})

app.get(
  '/church/denominations/:denominationId/members',
  async (request, response) => {
    const denominationId = request.params.denominationId

    const denominationSnapshot = await db
      .collection('denominations')
      .where('id', '==', denominationId)
      .get()

    const denominationData = denominationSnapshot.docs[0]?.data()

    if (!denominationData) {
      const errorMessage = `The denomination, ${denominationId} does not exist. Check again`
      response.status(404).send(errorMessage)
      return
    }

    const denominationFamilySnapShot = await db
      .collection('families')
      .where('denominationRef', '==', denominationId)
      .get()

    const families = denominationFamilySnapShot.docs.map((doc) => doc.id)

    const members = await getFamilyMembers(families)

    response.send(members)
  }
)

app.get('/geo/cities/:cityId/members', async (request, response) => {
  const cityId = request.params.cityId

  const citySnapshot = await db
    .collection('cities')
    .where('id', '==', cityId)
    .get()

  const cityData = citySnapshot.docs[0]?.data()

  if (!cityData) {
    const errorMessage = `The city, ${cityId} does not exist. Check again`
    response.status(404).send(errorMessage)
    return
  }

  const campuses = await getCampusByCities([cityId])
  const campusDocIds = campuses.map((campus) => campus.id)

  const members = await getMembersByCampus(campusDocIds)

  response.send(members)
})

app.get('/geo/countries/:countryId/members', async (request, response) => {
  const countryId = request.params.countryId

  const countrySnapshot = await db
    .collection('countries')
    .where('id', '==', countryId)
    .get()

  const countryData = countrySnapshot.docs[0]?.data()

  if (!countryData) {
    const errorMessage = `The country, ${countryId} does not exist. Check again`
    response.status(404).send(errorMessage)
    return
  }

  const familyMembers = await getCountryMembers([countryId])

  response.send(familyMembers)
})

app.get('/geo/continents/:continentId/members', async (request, response) => {
  const continentId = request.params.continentId

  const continentSnapshot = await db
    .collection('continents')
    .where('id', '==', continentId)
    .get()

  const continentData = continentSnapshot.docs[0]?.data()

  if (!continentData) {
    const errorMessage = `The city, ${continentId} does not exist. Check again`
    response.status(404).send(errorMessage)
    return
  }

  const members = await getContinentMembers([continentId])

  response.send(members)
})

app.get(
  '/geo/denominations/:denominationId/members',
  async (request, response) => {
    const denominationId = request.params.denominationId

    const continentSnapshot = await db
      .collection('denominations')
      .where('id', '==', denominationId)
      .get()

    const continentData = continentSnapshot.docs[0]?.data()

    if (!continentData) {
      const errorMessage = `The denomination, ${denominationId} does not exist. Check again`
      response.status(404).send(errorMessage)
      return
    }

    const denominationContinentSnapshot = await db
      .collection('continents')
      .where('denominationRef', '==', denominationId)
      .get()

    const continents = denominationContinentSnapshot.docs.map((doc) => doc.id)
    const members = await getContinentMembers(continents)

    response.send(members)
  }
)

async function getCountryMembers(countries: string[]) {
  const countryCitySnapshot = await db
    .collection('cities')
    .where('countryRef', 'in', countries)
    .get()

  const cities = countryCitySnapshot.docs.map((doc) => doc.id)

  const campuses = await getCampusByCities(cities)
  const campusDocIds = campuses.map((campus) => campus.id)

  const members = await getMembersByCampus(campusDocIds)

  return members
}

async function getContinentMembers(continents: string[]) {
  const continentCountrySnapshot = await db
    .collection('countries')
    .where('continentRef', 'in', continents)
    .get()

  const countries = continentCountrySnapshot.docs.map((doc) => doc.id)

  const members = await getCountryMembers(countries)

  return members
}

async function getFamilyMembers(families: string[]) {
  const familyCouncilSnapshot = await db
    .collection('councils')
    .where('familyRef', 'in', families)
    .get()

  const councils = familyCouncilSnapshot.docs.map((doc) => doc.id)

  const campuses = await getCampusByCouncils(councils)
  const campusDocIds = campuses.map((campus) => campus.id)

  const members = await getMembersByCampus(campusDocIds)

  return members
}

async function getCampusByCouncils(councilIds: string[]) {
  const councilCampusesSnapShot = await db
    .collection('campuses')
    .where('councilRef', 'in', councilIds)
    .get()

  const campuses = councilCampusesSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  return campuses
}

async function getMembersByCampus(campuses: string[]) {
  const membershipSnapShot = db
    .collection('members')
    .where('campus', 'in', campuses)

  const membershipCount = (await membershipSnapShot.count().get()).data().count
  const members = (await membershipSnapShot.limit(20).get()).docs.map(
    (doc) => ({ id: doc.id, ...doc.data() })
  )

  return { membershipCount, members }
}

async function getCampusByCities(cityIds: string[]) {
  const cityCampusesSnapShot = await db
    .collection('campuses')
    .where('cityRef', 'in', cityIds)
    .get()

  const campuses = cityCampusesSnapShot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  return campuses
}

export const directoryMembers = functions
  .region('europe-west1')
  .runWith({
    secrets: ['FLC_NOTIFY_KEY'],
  })
  .https.onRequest(app)
