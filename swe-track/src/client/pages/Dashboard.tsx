import { useEffect, useState } from 'react'
import Table from '../components/Table'
import TableEntry from '../components/TableEntry'
import axios from 'axios'

export default function Dashboard({ userData }: any) {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    if (companies.length == 0) getUserCompanies(userData.uid)
  }, [])

  const entries: {
    company: string
    status: string
    dateApplied: Date
  }[] = [
    { company: 'Datadog', status: 'Offer', dateApplied: new Date() },
    {
      company: 'Hudson River Trading',
      status: 'Final Round',
      dateApplied: new Date()
    },
    { company: 'Stripe', status: 'Applied', dateApplied: new Date() },
    { company: 'Palantir', status: 'Applied', dateApplied: new Date() },
    { company: 'NVIDIA', status: 'Applied', dateApplied: new Date() },
    { company: 'Citadel', status: 'Rejected', dateApplied: new Date() },
    { company: 'Netflix', status: 'Rejected', dateApplied: new Date() }
  ]
  const tableEntries: JSX.Element[] = entries.map(entry => (
    <TableEntry {...entry}></TableEntry>
  ))

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
    console.log(userCompanies)
    setCompanies(userCompanies)
  }
  const capitalize = (s: string) => {
    return s.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
  }

  return (
    <div className="overflow-x-auto mt-20">
      <div className="min-w-screen min-h-screen bg-white-400 flex justify-center font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
          <h3 className="text-left ml-3 text-4xl font-[Oceanwide] dark:text-white">
            Hello {userData.full_name}!
          </h3>
          <Table entries={companies}></Table>
        </div>
      </div>
    </div>
  )
}
