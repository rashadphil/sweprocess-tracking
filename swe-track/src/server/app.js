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
 * Users
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

/**
 * Companies
 */
app.get('/companies', (req, res) => {
  db.getCompanies(req, res)
})
app.post('/companies', (req, res) => {
  db.upsertCompany(req, res)
})
app.get('/companies/name/:name', (req, res) => {
  db.getCompanyByName(req, res)
})
app.get('/companies/id/:cid', (req, res) => {
  db.getCompanyById(req, res)
})

/**
 * User Companies
 */
app.post('/usercompany', (req, res) => {
  db.upsertUserCompany(req, res)
})
app.get('/usercompany', (req, res) => {
  db.getAllUserCompanies(req, res)
})
app.get('/usercompany/id/:uid/:szn', (req, res) => {
  db.getCompaniesByUserId(req, res)
})
app.delete('/usercompany/:uid/:cid/:szn', (req, res) => {
  db.deleteUserCompany(req, res)
})

/**
 * Leetcode
 */
app.get('/leetcode', (req, res) => {
  db.getAllLeetcode(req, res)
})
app.get('/leetcode/tags/:tid', (req, res) => {
  db.getProblemsFromTag(req, res)
})
app.post('/userleetcode', (req, res) => {
  db.upsertUserLeetcode(req, res)
})
app.get('/userleetcode/id/:uid/', (req, res) => {
  db.getLeetcodeByUserId(req, res)
})
app.delete('/userleetcode/:uid/:lid', (req, res) => {
  db.deleteUserLeetcode(req, res)
})
/**
 * Tags
 */
app.get('/tags', (req, res) => {
  db.getTags(req, res)
})

app.listen(8080, () => console.log('Server is running!'))
