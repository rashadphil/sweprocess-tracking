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
  const sort = req.query.sort
  const orderBy =
    sort === 'popularity'
      ? [{ popularity: 'desc' }, { company_name: 'asc' }]
      : { company_name: 'asc' }

  const companies = await prisma.companies.findMany({
    orderBy: orderBy
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
  const companyInfo = await prisma.companies.findFirst({
    where: { cid: company_id }
  })
  const { company_name } = companyInfo
  const userCompany = await prisma.user_companies.upsert({
    where: {
      user_id_company_id: {
        user_id: user_id,
        company_id: company_id
      }
    },
    update: { user_status: user_status || 'applied' },
    create: {
      user_id: user_id,
      company_id: company_id,
      company_name: company_name,
      user_status: user_status || 'applied',
      date_applied: date_applied || new Date()
    }
  })
  await updatePopularity(company_id, 1)
  res.status(200).json(userCompany)
}

const getAllUserCompanies = async (req, res) => {
  const allUserCompanies = await prisma.user_companies.findMany({})
  res.status(200).json(allUserCompanies)
  return allUserCompanies
}

const getCompaniesByUserId = async (req, res) => {
  const usersCompanies = await prisma.user_companies.findMany({
    where: {
      user_id: parseInt(req.params.uid)
    },
    orderBy: { user_status: 'desc' }
  })
  res.status(200).json(usersCompanies)
  return usersCompanies
}

const deleteUserCompany = async (req, res) => {
  const uid = parseInt(req.params.uid)
  const cid = parseInt(req.params.cid)
  const usersCompanies = await prisma.user_companies.delete({
    where: {
      user_id_company_id: {
        user_id: uid,
        company_id: cid
      }
    }
  })
  await updatePopularity(cid, -1)
  res.status(200).json(usersCompanies)
  return usersCompanies
}

const updatePopularity = async (cid, amount) => {
  await prisma.companies.update({
    where: { cid: cid },
    data: {
      popularity: {
        increment: amount
      }
    }
  })
}

module.exports = {
  getUsers,
  upsertUser,
  getUserById,
  getCompanies,
  getCompanyByName,
  getCompanyById,
  upsertUserCompany,
  getAllUserCompanies,
  getCompaniesByUserId,
  deleteUserCompany
}
