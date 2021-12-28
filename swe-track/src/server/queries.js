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
const upsertUser = async (request, response) => {
  console.log('Upserting User')
  const { username, email, email_verified, membership, picture, full_name } =
    request.body

  const values = [
    username,
    email,
    email_verified || true,
    membership || 'free',
    picture,
    full_name
  ]
  try {
    //check if the email already exists in the database
    const result = await pool.query(
      `INSERT INTO users(username, email, email_verified, date_created, last_login, membership, picture, full_name) 
    VALUES($1, $2, $3, NOW(), NOW(), $4, $5, $6)
    ON CONFLICT (email) DO UPDATE SET last_login = NOW(), picture = $5, full_name = $6
    RETURNING *`,
      values
    )
    //return the user information to the client
    return result.rows[0]
  } catch (err) {
    return err.stack
  }
}

const getUserById = async (request, response) => {
  console.log(request)
  const uid = parseInt(request.params.uid)
  try {
    const result = await pool.query('SELECT * FROM users WHERE uid = $1', [uid])
    response.status(201).json(result.rows)
    return result.rows[0]
  } catch (err) {
    return err.stack
  }
}

module.exports = {
  getUsers,
  upsertUser,
  getUserById
}
