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
  pool.query('SELECT * FROM users ORDER BY uid ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const upsertUser = (request, response) => {
  const { email } = request.body
  //check if the email already exists in the database
  const userinDB =
    pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
      (error, result) => {
        if (error) {
          throw error
        }
      }
    ) !== null
  if (userinDB) updateUser(request, response)
  else addUser(request, response)
}

const addUser = (req, response) => {
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
      response.status(201).send(`User added with ID: ${result.insertId}`)
    }
  )
}
const updateUser = (req, response) => {
  const { email, last_login } = req.body
  pool.query(
    'UPDATE users SET last_login = $1 WHERE email = $2',
    [last_login || new Date(), email],
    (error, result) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    }
  )
}

const getUserById = (request, response) => {
  const uid = parseInt(request.params.uid)

  pool.query('SELECT * FROM users WHERE uid = $1', [uid], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers,
  upsertUser,
  getUserById
}
