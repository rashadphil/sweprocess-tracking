import React from 'react'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const statuses = [
  'rejected',
  'applied',
  'online_assesment',
  'interview_rounds',
  'final_round',
  'offer'
]


const capitalize = (s: string) => {
  return s
    .replace('_', ' ')
    .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

type EntryProps = {
  entry: {
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
}

type Status = {
  offer?: number
  final_round?: number
  interview_rounds?: number
  online_assesment?: number
  applied?: number
  rejected?: number
}
const getColors = (count: number): string => {
  if (count == 0) {
    return 'text-black bg-gray-200'
  } else if (count < 5) {
    return 'text-red-700 bg-red-100'
  } else if (count < 12) {
    return 'text-yellow-700 bg-yellow-100'
  } else {
    return 'text-green-700 bg-green-100'
  }
}

export default function TableEntry({
  entry: { company_name, status_counts }
}: EntryProps) {
  company_name = capitalize(company_name)
  console.log(company_name, status_counts)
  return (
    <tr className="text-black border-b border-gray-200 group dark:border-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white">
      <td className="px-6 py-2 text-left whitespace-nowrap ">
        <div className="flex items-center">
          <div className="mr-2">
            <img
              className="object-scale-down w-5 h-5"
              src={`//logo.clearbit.com/${company_name
                .replace(/\s+/g, '')
                .toLowerCase()}.com`}
            ></img>
          </div>
          <span className="font-medium">{company_name}</span>
        </div>
      </td>
      {statuses.map((status: string) => {
        const statusKey = status as keyof Status
        const count = status_counts[statusKey] || 0
        const colors = getColors(count)
        return (
          <td className="px-4 py-2 text-left whitespace-nowrap border">
            <span
              className={classNames(
                ` px-2 py-1 leading-5 rounded-full text-sm font-bold ${colors}`
              )}
            >
              {count} users
            </span>
          </td>
        )
      })}
    </tr>
  )
}
