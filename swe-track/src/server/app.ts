import express, { Request } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import db from './queries'
import sessions from 'express-session'
const pgSession = require('connect-pg-simple')(sessions)
import cookieParser from 'cookie-parser'

//Declaration merging
declare module 'express-session' {
  interface Session {
    user_id: number
    user: any
  }
}
import { google } from 'googleapis'

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.set('trust proxy', 1) // trust first proxy

/**
 * Session stuf
 */
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'rashadp',
  host: 'localhost',
  database: 'database1',
  password: 'Kylieisatool1!',
  port: 5432
})
const sessionConfig = {
  store: new pgSession({
    pool: pool,
    tableName: 'session'
  }),
  name: 'SID',
  secret: 'ajsdfaksfdjkha',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    aameSite: true,
    secure: false // ENABLE ONLY ON HTTPS
  }
}
app.use(sessions(sessionConfig))

app.use(cookieParser())

var session: any
/**
 * Session Managment
 */
// app.use(async (req, res, next) => {
//   // console.log(req.session)
//   const user = await db.getUserById({ params: { uid: session.user_id } }, res)
//   console.log('current user: ' + user)
//   next()
// })

app.delete('/api/v1/auth/logout', async (req, res) => {
  await req.session.destroy(err => {
    throw err
  })
  res.status(200)
  res.json({
    message: 'Logged out successfully'
  })
})

/**
 * Google Authentication
 */
// const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_ID =
  '383092057644-fpjevv3amnkr1gkn8g4nlgp57tsjmetq.apps.googleusercontent.com'
const client = new google.auth.OAuth2(CLIENT_ID)

app.post('/api/v1/auth/google', async (req, res) => {
  const token = req.body.token
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID
  })
  const payload = ticket.getPayload()
  const user = await db.upsertUser(
    {
      body: {
        full_name: payload?.name,
        email: payload?.email,
        picture: payload?.picture
      }
    },
    res
  )
  //for managing the user's session
  session = req.session
  session.user_id = user.uid
})

app.get('/logout', (req, res) => {
  session.destroy(() => console.log('Session ended'))
  res.redirect('/')
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

app.get('/me', async (req, res) => {
  const user = await db.getUserById({ params: { uid: session.user_id } }, res)
  res.status(200)
  res.json(user)
})

app.listen(8080, () => console.log('Server is running!'))
