import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { google } from 'googleapis'

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_ID =
  '383092057644-fpjevv3amnkr1gkn8g4nlgp57tsjmetq.apps.googleusercontent.com'
const client = new google.auth.OAuth2(CLIENT_ID)

app.post('/', async (req, res) => {
  res.status(201)
})

app.post('/api/v1/auth/google', async (req, res) => {
  const { token } = req.body
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID
  })
  console.log(ticket.getPayload())
  const payload = ticket.getPayload();
  const name = payload?.name;
  const email = payload?.email;
  const picture = payload?.picture;
  // const { name, email, picture } = JSON.parse(ticket.getPayload());
  res.status(201)
})

app.listen(8080, () => console.log('Server is running!'))
