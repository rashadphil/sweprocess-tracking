import { useEffect, useState } from 'react'
import Table from '../components/Leetcode/Table'
import TableEntry from '../components/Leetcode/TableEntry'
import axios from 'axios'
import AddProblemModal from '../components/Leetcode/AddProblemModal'
import FilterDifficulty from '../components/Leetcode/FilterDifficulty'

export default function LeetcodeDashboard({ userData, setUserData }: any) {
  const [problems, setProblems] = useState([])
  const [difficultyFilter, setDifficultyFilter] = useState<Array<string>>([])

  useEffect(() => {
    getUserLeetcode(userData.uid, difficultyFilter)
  }, [userData, difficultyFilter])

  const getUserLeetcode = async (uid: number, difficultyFilter: string[]) => {
    const filterParam = difficultyFilter.map(difficulty => `difficulty=${difficulty}`).join('&')
    const response = await axios.get(
      `http://localhost:8080/userleetcode/id/${uid}?${filterParam}`
    )
    const data = response.data
    console.log(data)
    const userLeetcode = data.map(
      (entry: {
        uid: number
        lid: number
        date_solved: Date
        leetcode: {
          difficulty: string
          title: string
          leetcode_tags: Array<Object>
        }
      }) => <TableEntry userLeetcodeData={entry} setUserData={setUserData} />
    )
    setProblems(userLeetcode)
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
              <FilterDifficulty
                filter={difficultyFilter}
                setFilter={setDifficultyFilter}
              />
              <AddProblemModal userData={userData} setUserData={setUserData} />
            </div>
          </div>
          <Table entries={problems}></Table>
        </div>
      </div>
    </div>
  )
}
