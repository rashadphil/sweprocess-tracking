import {
  ArrowSmUpIcon,
  ArrowSmDownIcon,
  SelectorIcon
} from '@heroicons/react/solid'
import { useState } from 'react'

export default function Table({ entries }: any) {
  const [companySort, setCompanySort] = useState(0)
  return (
    <div className="my-6 bg-white rounded shadow-md dark:bg-gray-700">
      <table className="w-full table-auto min-w-max">
        <thead>
          <tr className="text-sm leading-normal text-black uppercase bg-white border-b border-black dark:bg-gray-800 dark:text-white">
            <th className="px-6 py-3 text-left">
              <div className="inline-flex">
                Company
                <SelectorIcon className="w-5 h-5 hover:cursor-pointer" />
              </div>
            </th>
            <th className="px-6 py-3 text-center">Status</th>
            <th className="px-6 py-3 text-left">Date Applied</th>
            <th className="px-6 py-3 text-center">LC Problems</th>
          </tr>
          {entries}
        </thead>
        <tbody className="text-sm font-light text-gray-600 dark:text-white"></tbody>
      </table>
    </div>
  )
}
