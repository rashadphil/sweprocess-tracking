const Pool = require('pg').Pool
const pool = new Pool({
  user: 'rashadp',
  host: 'localhost',
  database: 'database1',
  password: 'Kylieisatool1!',
  port: 5432
})

const getUsers = (request, response) => {
  console.log('getting users')
  pool.query('SELECT * FROM users ORDER BY uid ASC', (error, result) => {
    if (error) {
      throw error
    }
    response.status(200).json(result.rows)
  })
}
const upsertUser = (request, response) => {
  console.log('Upserting User')
  const {
    username,
    email,
    email_verified,
    membership
  } = request.body

  const values = [username, email, email_verified || true, membership || 'free']
  //check if the email already exists in the database
  pool.query(
    `INSERT INTO users(username, email, email_verified, date_created, last_login, membership) 
    VALUES($1, $2, $3, NOW(), NOW(), $4)
    ON CONFLICT (email) DO UPDATE SET last_login = NOW()
    RETURNING *`,
    values,
    (error, result) => {
      if (error) throw error
      console.log(result)
      response.status(201).json(result.rows)
    }
  )
}

const createUser = (req, res) => {
  console.log('Creating User')
  const {
    username,
    email,
    email_verified,
    date_created,
    last_login,
    membership
  } = req.body
  pool.query(
    'INSERT INTO users (username, email, email_verified, date_created, last_login, membership) VALUES ($1, $2, $3, $4, $5, $6)',
    [
      username,
      email,
      email_verified || 'true',
      date_created || new Date(),
      last_login || new Date(),
      membership || 'free'
    ],
    (error, result) => {
      if (error) {
        throw error
      }
      res.status(200).json(result.rows)
    }
  )
}
const updateUser = (req, res) => {
  console.log('Updating User')
  const { username, email, last_login } = req.body
  pool.query(
    'UPDATE users SET last_login = $1, username = $2 WHERE email = $3',
    [last_login || new Date(), username, email],
    (error, result) => {
      if (error) {
        throw error
      }
    }
  )
}

const getUserById = (request, response) => {
  const uid = parseInt(request.params.uid)

  pool.query('SELECT * FROM users WHERE uid = $1', [uid], (error, results) => {
    if (error) {
      throw error
    }
  })
}

module.exports = {
  getUsers,
  upsertUser,
  getUserById
}
