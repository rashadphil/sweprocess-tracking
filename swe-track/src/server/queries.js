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
//Specifically for companies not verified
const upsertCompany = async (req, res) => {
  const { company_name } = req.body
  const company = await prisma.companies.upsert({
    where: { company_name: company_name },
    update: { popularity: { increment: 1 } },
    create: {
      company_name,
      website_link: `${company_name.replaceAll('_', '')}.com`,
      application_link: null,
      intern_salary: null,
      popularity: 1,
      verified: false
    }
  })
  res.status(200).json(company)
  return company
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
  await updateUser(user_id)
  await updatePopularity(company_id, 1)
  res.status(200).json(userCompany)
}

const updateUser = async uid => {
  await prisma.users.update({
    where: { uid: uid },
    data: { last_update: new Date() }
  })
}

const getAllUserCompanies = async (req, res) => {
  const allUserCompanies = await prisma.user_companies.findMany({})
  res.status(200).json(allUserCompanies)
  return allUserCompanies
}

const getCompaniesByUserId = async (req, res) => {
  const query = req.query
  const statusParams =
    query.status instanceof Array ? query.status : [query.status]
  const statusFilter = statusParams[0]
    ? statusParams.map(status => {
        return {
          user_status: {
            equals: status
          }
        }
      })
    : undefined
  const sort = query.sort ? query.sort.split(',') : null
  const orderBy = sort
    ? sort.map(s => {
        const [property, order] = s.split(':')
        return { [property]: order }
      })
    : undefined
  console.log(orderBy)
  const usersCompanies = await prisma.user_companies.findMany({
    where: {
      user_id: parseInt(req.params.uid),
      OR: statusFilter
    },
    orderBy: orderBy
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

/**
 * Leetcode
 */
const getAllLeetcode = async (req, res) => {
  const problems = await prisma.leetcode.findMany({})
  res.status(200).json(problems)
  return problems
}

const getProblemsFromTag = async (req, res) => {
  const tid = parseInt(req.params.tid)
  const problems = await prisma.leetcode_tags.findMany({
    where: { tid: tid },
    select: { leetcode: true }
  })

  res.status(200).json(problems)
  return problems
}

const upsertUserLeetcode = async (req, res) => {
  const { uid, lid, date_solved } = req.body
  const userLeetcode = await prisma.user_leetcode.upsert({
    where: {
      uid_lid: {
        uid: uid,
        lid: lid
      }
    },
    update: { date_solved: date_solved || new Date() },
    create: {
      uid: uid,
      lid: lid,
      date_solved: date_solved || new Date()
    }
  })
  await updateUser(uid)
  res.status(200).json(userLeetcode)
}

const getLeetcodeByUserId = async (req, res) => {
  const query = req.query
  const difficultyParams =
    query.difficulty instanceof Array ? query.difficulty : [query.difficulty]
  const tagParams = (query.tag instanceof Array ? query.tag : [query.tag]).map(
    Number
  )
  const userLeetcode = await prisma.leetcode.findMany({
    where: {
      AND: [
        {
          difficulty: {
            in: difficultyParams[0] ? difficultyParams : undefined,
            mode: 'insensitive'
          }
        },
        { user_leetcode: { some: { uid: parseInt(req.params.uid) } } },
        {
          leetcode_tags: {
            some: { tid: { in: isNaN(tagParams[0]) ? undefined : tagParams } }
          }
        }
      ]
    },
    include: {
      user_leetcode: { where: { uid: parseInt(req.params.uid) } },
      leetcode_tags: {
        select: {
          tag: {
            select: { tid: true, tag_name: true, alias: true, color: true }
          }
        }
      }
    }
  })

  res.status(200).json(userLeetcode)
  return userLeetcode
}

const deleteUserLeetcode = async (req, res) => {
  const uid = parseInt(req.params.uid)
  const lid = parseInt(req.params.lid)
  const userLeetcode = await prisma.user_leetcode.delete({
    where: {
      uid_lid: {
        uid: uid,
        lid: lid
      }
    }
  })
  res.status(200).json(userLeetcode)
  return userLeetcode
}

const getTags = async (req, res) => {
  const tags = await prisma.tag.findMany({
    orderBy: {
      count: 'desc'
    }
  })
  res.status(200).json(tags)
  return tags
}

module.exports = {
  getUsers,
  upsertUser,
  getUserById,
  getCompanies,
  upsertCompany,
  getCompanyByName,
  getCompanyById,
  upsertUserCompany,
  getAllUserCompanies,
  getCompaniesByUserId,
  deleteUserCompany,
  getAllLeetcode,
  getProblemsFromTag,
  upsertUserLeetcode,
  getLeetcodeByUserId,
  deleteUserLeetcode,
  getTags
}
