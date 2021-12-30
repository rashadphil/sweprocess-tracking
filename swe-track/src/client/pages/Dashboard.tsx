import { useEffect, useState } from 'react'
import Table from '../components/Table'
import TableEntry from '../components/TableEntry'
import axios from 'axios'
import AddCompanyModal from '../components/AddCompanyModal'

export default function Dashboard({ userData }: any) {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    if (companies.length === 0) getUserCompanies(userData.uid)
  }, [])

  const getUserCompanies = async (uid: number) => {
    const response = await axios.get(
      `http://localhost:8080/usercompany/id/${uid}`
    )
    const data = response.data
    const userCompanies = data.map(
      (entry: {
        company_name: string
        user_status: string
        date_applied: Date
      }) => (
        <TableEntry
          company={capitalize(entry.company_name)}
          status={capitalize(entry.user_status)}
          dateApplied={entry.date_applied}
        />
      )
    )
    setCompanies(userCompanies)
  }
  const capitalize = (s: string) => {
    return s
      .replace('_', ' ')
      .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
  }

  return (
    <div className="mt-20 overflow-x-auto">
      <div className="flex justify-center min-h-screen overflow-hidden font-sans min-w-screen bg-white-400">
        <div className="w-full lg:w-5/6">
          <div className="inline-flex justify-between w-full">
            <h3 className="text-left ml-3 text-4xl font-[Oceanwide] dark:text-white">
              Hello {userData.full_name}!
            </h3>
            <AddCompanyModal userData={userData} />
          </div>
          <Table entries={companies}></Table>
        </div>
      </div>
    </div>
  )
}
