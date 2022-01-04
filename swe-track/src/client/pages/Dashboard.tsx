import { useEffect, useState } from 'react'
import Table from '../components/Table'
import TableEntry from '../components/TableEntry'
import axios from 'axios'
import AddCompanyModal from '../components/AddCompanyModal'
import FilterCompanies from '../components/FilterCompanies'

export default function Dashboard({ userData, setUserData }: any) {
  const [companies, setCompanies] = useState([])
  const [statusFilter, setStatusFilter] = useState<Array<string>>([])

  useEffect(() => {
    getUserCompanies(userData.uid, statusFilter)
  }, [userData, statusFilter]) 

  const getUserCompanies = async (uid: number, statusFilter: Array<any>) => {
    const filterParam = statusFilter.map(status => `status=${status}`).join('&')
    const response = await axios.get(
      `http://localhost:8080/usercompany/id/${uid}?${filterParam}`
    )
    const data = response.data
    console.log(data)
    const userCompanies = data.map(
      (entry: {
        company_name: string
        user_status: string
        date_applied: Date
      }) => <TableEntry userCompanyData={entry} setUserData={setUserData} />
    )
    // console.log(ok.getTime() == userData.last_update.getTime())
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
              <FilterCompanies filter={statusFilter} setFilter={setStatusFilter} />
              <AddCompanyModal userData={userData} setUserData={setUserData} />
            </div>
          </div>
          <Table entries={companies}></Table>
        </div>
      </div>
    </div>
  )
}
