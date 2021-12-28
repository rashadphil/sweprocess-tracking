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
const createUser = (request, response) => {
  const {
    username,
    email,
    email_verified,
    date_created,
    last_login,
    membership
  } = request.body
  pool.query(
    'INSERT INTO users (username, email, email_verified, date_created, last_login, membership) VALUES ($1, $2, $3, $4, $5, $6)',
    [
      username,
      email,
      email_verified,
      date_created || new Date(),
      last_login || new Date(),
      membership
    ],
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
  createUser,
  getUserById
}
