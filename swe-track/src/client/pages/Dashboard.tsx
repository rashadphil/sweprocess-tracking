import { useEffect, useState } from 'react'
import Table from '../components/UserDashboard/Table'
import TableEntry from '../components/UserDashboard/TableEntry'
import axios from 'axios'
import AddCompanyModal from '../components/UserDashboard/AddCompanyModal'
import FilterCompanies from '../components/UserDashboard/FilterCompanies'

type TableSortProps = {
  company_name: string
  user_status: string
  date_applied: string
}
export default function Dashboard({ userData, setUserData }: any) {
  const [companies, setCompanies] = useState([])
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [tableSort, setTableSort] = useState<TableSortProps>({
    company_name: '',
    user_status: 'desc',
    date_applied: ''
  })

  useEffect(() => {
    getUserCompanies(userData.uid, statusFilter)
  }, [userData, statusFilter, tableSort])

  const parseSort = (sort: TableSortProps) => {
    return JSON.stringify(sort, (key, value) => {
      if (value) return value
    })
      .replaceAll('"', '')
      .slice(1, -1)
  }

  const getUserCompanies = async (uid: number, statusFilter: Array<any>) => {
    const filterParam = statusFilter.map(status => `status=${status}`).join('&')
    const sortParam = parseSort(tableSort)
    const response = await axios.get(
      `http://localhost:8080/usercompany/id/${uid}?${filterParam}&sort=${sortParam}`
    )
    const data = response.data
    const userCompanies = data.map(
      (entry: {
        company_name: string
        user_status: string
        date_applied: Date
      }) => <TableEntry userCompanyData={entry} setUserData={setUserData} />
    )
    setCompanies(userCompanies)
  }
  return (
    <div className="mt-20 overflow-x-auto">
      <div className="flex justify-center min-h-screen overflow-hidden font-sans min-w-screen bg-white-400">
        <div className="w-full lg:w-5/6">
          <div className="inline-flex justify-between w-full">
            <h3 className="text-left ml-3 text-4xl font-[Oceanwide] dark:text-white">
              Hello {userData.full_name}!
            </h3>
            <div className="inline-flex">
              <FilterCompanies
                filter={statusFilter}
                setFilter={setStatusFilter}
              />
              <AddCompanyModal userData={userData} setUserData={setUserData} />
            </div>
          </div>
          <Table
            entries={companies}
            tableSort={tableSort}
            setTableSort={setTableSort}
          />
        </div>
      </div>
    </div>
  )
}
