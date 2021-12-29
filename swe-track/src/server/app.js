const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./queries')

const { OAuth2Client } = require('google-auth-library')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const clientId =
  '383092057644-fpjevv3amnkr1gkn8g4nlgp57tsjmetq.apps.googleusercontent.com'
const client = new OAuth2Client(clientId)

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/api/google-login', async (req, res) => {
  const { token } = req.body
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId
  })
  const { name, email, picture } = ticket.getPayload()
  const user = await db.upsertUser({
    body: {
      full_name: name,
      email: email,
      picture: picture
    }
  })
  res.status(200).json(user)
})

/**
 * Requests
 */
app.get('/users', (req, res) => {
  db.getUsers(req, res)
})
app.post('/users', (req, res) => {
  db.upsertUser(req, res)
})
app.get('/users/:uid', (req, res) => {
  db.getUserById(req, res)
})

app.get('/companies', (req, res) => {
  db.getCompanies(req, res)
})
app.get('/companies/name/:name', (req, res) => {
  db.getCompanyByName(req, res)
})
app.get('/companies/id/:cid', (req, res) => {
  db.getCompanyById(req, res)
})

app.post('/usercompany', (req, res) => {
  db.upsertUserCompany(req, res)
})
app.get('/usercompany', (req, res) => {
  db.getAllUserCompanies(req, res)
})
app.get('/usercompany/id/:uid', (req, res) => {
  db.getCompaniesByUserId(req, res)
})

app.listen(8080, () => console.log('Server is running!'))
