import React from 'react'

type EntryProps = {
  company: string
  status: string
  dateApplied: Date
}
const statusColors = new Map<string, string>([
  ['Offer', 'green'],
  ['Final Round', 'blue'],
  ['Interview Scheduled', 'yellow'],
  ['Applied', 'gray'],
  ['Rejected', 'red']
])

export default function TableEntry({
  company,
  status,
  dateApplied
}: EntryProps) {
  const bgColor: string = `bg-${statusColors.get(status)}-200`
  const textColor: string = `text-${statusColors.get(status)}-600`
  return (
    <tr className="border-b border-gray-200 dark:border-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white">
      <td className="py-3 px-6 text-left whitespace-nowrap ">
        <div className="flex items-center">
          <div className="mr-2">
            <img
              className="w-6 h-6"
              src={`//logo.clearbit.com/${company.replace(/\s+/g, '')}.com`}
            ></img>
          </div>
          <span className="font-medium">{company}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <span
          className={`${bgColor} ${textColor} font-bold py-1 px-3 rounded-full text-xs`}
        >
          {status}
        </span>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <span>August 11, 2021</span>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex items-center justify-center">
          <span className="w-6 h-6 rounded-full bg-green-200 text-green-600 transform hover:scale-125">
            {' '}
            15{' '}
          </span>
          <span className="w-6 h-6 rounded-full bg-yellow-200 text-yellow-600 transform hover:scale-125">
            {' '}
            10{' '}
          </span>
          <span className="w-6 h-6 rounded-full bg-red-200 text-red-600 transform hover:scale-125">
            {' '}
            3{' '}
          </span>
          {/* temporary fix for variable colors */}
          <span className="bg-red-200 text-red-600 bg-yellow-200 text-yellow-600 bg-green-200 text-green-600 bg-gray-200 text-gray-600 bg-blue-200 text-blue-600 ">
          </span>
        </div>
      </td>
    </tr>
  )
}
