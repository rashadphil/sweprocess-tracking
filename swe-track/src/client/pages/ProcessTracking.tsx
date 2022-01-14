import { useEffect, useState } from 'react'
import Table from '../components/UserDashboard/Table'
import TableEntry from '../components/ProcessTracking/TableEntry'
import axios from 'axios'
import AddCompanyModal from '../components/UserDashboard/AddCompanyModal'
import FilterCompanies from '../components/UserDashboard/FilterCompanies'
import CurrentFiltersSpan from '../components/UserDashboard/CurrentFiltersSpan'
import SeasonSpan from '../components/UserDashboard/SeasonSpan'
import DateSelect from '../components/DateSelect'
import CurrentCompanySpan from '../components/UserDashboard/CurrentCompanySpan'
import ProcessTable from '../components/ProcessTracking/ProcessTable'

type TableSortProps = {
  company_name: string
  user_status: string
  date_applied: string
}

type EntryProps = {
  company_name: string
  status_counts: {
    offer?: number
    final_round?: number
    interview_rounds?: number
    online_assesment?: number
    applied?: number
    rejected?: number
  }
}

export default function ProcessTracking() {
  const [season, setSeason] = useState('s22')
  const [entries, setEntries] = useState([])

  const getProcessTracking = async (season: string) => {
    const response = await axios.get(
      `http://localhost:8080/usercompany/${season}`
    )
    const data = response.data
    const processEntries = data.map((entry: EntryProps) => (
      <TableEntry entry={entry} />
    ))
    setEntries(processEntries)
  }

  useEffect(() => {
    getProcessTracking(season)
  }, [season])
  return (
    <div className="bg-white mt-0.5 pt-14 overflow-x-auto">
      <div className="flex justify-center min-h-screen overflow-hidden font-sans min-w-screen bg-white-400">
        <div className="w-full lg:w-5/6">
          <div className="py-4 inline-flex justify-between w-full">
            <h3 className="text-left ml-3 text-3xl font-[Oceanwide] dark:text-white">
              Process Tracking
            </h3>
          </div>
          <div className="ml-3 w-full inline-flex justify-between">
            <SeasonSpan activeSeason={season} setActiveSeason={setSeason} />
          </div>
          <div className="ml-3 mt-3 w-full inline-flex flex-row"></div>
          <ProcessTable entries={entries} />
        </div>
      </div>
    </div>
  )
}
