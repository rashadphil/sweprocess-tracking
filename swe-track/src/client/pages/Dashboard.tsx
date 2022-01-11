import { useEffect, useState } from 'react'
import Table from '../components/UserDashboard/Table'
import TableEntry from '../components/UserDashboard/TableEntry'
import axios from 'axios'
import AddCompanyModal from '../components/UserDashboard/AddCompanyModal'
import FilterCompanies from '../components/UserDashboard/FilterCompanies'
import CurrentFiltersSpan from '../components/UserDashboard/CurrentFiltersSpan'
import SeasonSpan from '../components/UserDashboard/SeasonSpan'

type TableSortProps = {
  company_name: string
  user_status: string
  date_applied: string
}
export default function Dashboard({ userData, setUserData }: any) {
  const [companies, setCompanies] = useState([])
  const [season, setSeason] = useState('s22')
  const [statusFilter, setStatusFilter] = useState<string[]>([])
  const [tableSort, setTableSort] = useState<TableSortProps>({
    company_name: '',
    user_status: 'desc',
    date_applied: ''
  })

  useEffect(() => {
    getUserCompanies(userData.uid, statusFilter)
  }, [userData, statusFilter, tableSort, season])

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
      `http://localhost:8080/usercompany/id/${uid}/${season}?${filterParam}&sort=${sortParam}`
    )
    const data = response.data
    const userCompanies = data.map(
      (entry: {
        company_name: string
        user_status: string
        date_applied: Date
        szn: string
      }) => <TableEntry userCompanyData={entry} setUserData={setUserData} />
    )
    setCompanies(userCompanies)
  }
  const [first, last] = userData.full_name.split(' ')
  return (
    <div className="bg-white mt-0.5 pt-14 overflow-x-auto">
      <div className="flex justify-center min-h-screen overflow-hidden font-sans min-w-screen bg-white-400">
        <div className="w-full lg:w-5/6">
          <div className="py-4 inline-flex justify-between w-full">
            <h3 className="text-left ml-3 text-3xl font-[Oceanwide] dark:text-white">
              {first}'s Applications
            </h3>
            <div className="inline-flex">
              <FilterCompanies
                filter={statusFilter}
                setFilter={setStatusFilter}
              />
              <AddCompanyModal
                season={season}
                userData={userData}
                setUserData={setUserData}
              />
            </div>
          </div>
          <div className="ml-3 w-full inline-flex">
            <SeasonSpan activeSeason={season} setActiveSeason={setSeason} />
          </div>
          <div className="ml-3 mt-3 w-full inline-flex flex-row">
            <CurrentFiltersSpan
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
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
