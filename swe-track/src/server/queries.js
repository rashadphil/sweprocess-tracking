const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getUsers = async (request, response) => {
  const users = await prisma.users.findMany({ orderBy: { uid: 'asc' } })
  response.status(200).json(users)
  return users
}

const upsertUser = async (req, res) => {
  const { username, email, email_verified, membership, picture, full_name } =
    req.body
  const user = await prisma.users.upsert({
    where: { email: email },
    update: { picture, full_name, last_login: new Date() },
    create: {
      username,
      email,
      email_verified: email_verified || true,
      membership: membership || 'free',
      picture,
      full_name
    }
  })
  res.status(201).json(user)
  return user
}

const getUserById = async (request, response) => {
  const user = await prisma.users.findFirst({
    where: {
      uid: parseInt(request.params.uid)
    }
  })
  response.status(200).json(user)
  return user
}

module.exports = {
  getUsers,
  upsertUser,
  getUserById
}
