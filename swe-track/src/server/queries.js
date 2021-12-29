const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const getUsers = async (req, res) => {
  const users = await prisma.users.findMany({ orderBy: { uid: 'asc' } })
  res.status(200).json(users)
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
  return user
}

const getUserById = async (req, res) => {
  const user = await prisma.users.findFirst({
    where: {
      uid: parseInt(req.params.uid)
    }
  })
  res.status(200).json(user)
  return user
}

const getCompanies = async (req, res) => {
  const companies = await prisma.companies.findMany({
    orderBy: { company_name: 'asc' }
  })
  res.status(200).json(companies)
  return companies
}

const getCompanyByName = async (req, res) => {
  const company = await prisma.companies.findFirst({
    where: { company_name: req.params.name }
  })
  res.status(200).json(company)
  return company
}

const getCompanyById = async (req, res) => {
  const company = await prisma.companies.findFirst({
    where: { cid: parseInt(req.params.cid) }
  })
  res.status(200).json(company)
  return company
}

const upsertUserCompany = async (req, res) => {
  const { user_id, company_id, user_status, date_applied } = req.body
  const userCompany = await prisma.user_companies.upsert({
    where: {
      user_id_company_id: {
        user_id: user_id,
        company_id: company_id
      }
    },
    update: { user_status: user_status || 'applied'},
    create: {
      user_id: user_id,
      company_id: company_id,
      user_status: user_status || 'applied',
      date_applied: date_applied
    }
  })
  res.status(200).json(userCompany)
}

module.exports = {
  getUsers,
  upsertUser,
  getUserById,
  getCompanies,
  getCompanyByName,
  getCompanyById,
  upsertUserCompany
}
