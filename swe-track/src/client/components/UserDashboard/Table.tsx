import {
  ArrowSmUpIcon,
  ArrowSmDownIcon,
  SelectorIcon
} from '@heroicons/react/solid'
import { useState } from 'react'

const sorts = new Map<number, string>([
  [0, ''],
  [1, 'asc'],
  [2, 'desc']
])

type SortIconProps = {
  className: string
  sort: number
  onClick: () => void
}
function SortIcon({ className, sort, onClick }: SortIconProps) {
  switch (sort) {
    case 0:
      return (
        <SelectorIcon
          className={className + ' text-gray-500'}
          onClick={onClick}
        />
      )
    case 1:
      return <ArrowSmUpIcon className={className} onClick={onClick} />
    case 2:
      return <ArrowSmDownIcon className={className} onClick={onClick} />
    default:
      return <div></div>
  }
}
type HeaderProps = {
  className: string
  title: string
  sort: number
  setSort: (value: number) => void
}

function Header({ className, title, sort, setSort }: HeaderProps) {
  return (
    <th className={className}>
      <div className="inline-flex">
        {title}
        <SortIcon
          className="pl-1 w-5 h-5 hover:cursor-pointer"
          sort={sort}
          onClick={() => setSort(sort == 2 ? 0 : sort + 1)}
        />
      </div>
    </th>
  )
}
export default function Table({ entries }: any) {
  const [companySort, setCompanySort] = useState(0)
  const [statusSort, setStatusSort] = useState(0)
  const [dateSort, setDateSort] = useState(0)
  const [problemSort, setProblemSort] = useState(0)
  return (
    <div className="my-6 bg-white rounded shadow-md dark:bg-gray-700">
      <table className="w-full table-auto min-w-max">
        <thead>
          <tr className="text-sm leading-normal text-black uppercase bg-white border-b border-black dark:bg-gray-800 dark:text-white">
            <Header
              className="px-6 py-3 text-left"
              title={'Company'}
              sort={companySort}
              setSort={setCompanySort}
            />
            <Header
              className="px-6 py-3 text-center"
              title={'Status'}
              sort={statusSort}
              setSort={setStatusSort}
            />
            <Header
              className="px-6 py-3 text-left"
              title={'Date Applied'}
              sort={dateSort}
              setSort={setDateSort}
            />
            <Header
              className="px-6 py-3 text-center"
              title={'LC Problems'}
              sort={problemSort}
              setSort={setProblemSort}
            />
          </tr>
          {entries}
        </thead>
        <tbody className="text-sm font-light text-gray-600 dark:text-white"></tbody>
      </table>
    </div>
  )
}
