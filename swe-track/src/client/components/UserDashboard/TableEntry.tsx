import React from 'react'
import { TrashIcon } from '@heroicons/react/outline'
import axios from 'axios'
import dateformat from 'dateformat'
import UserStatusPopup from './UserStatusPopup'
import CurrentFiltersSpan from './CurrentFiltersSpan'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const statusColors = new Map<string, string>([
  ['Offer', 'green'],
  ['Final Round', 'blue'],
  ['Interview Rounds', 'yellow'],
  ['Online Assesment', 'pink'],
  ['Applied', 'orange'],
  ['Not Applied', 'gray'],
  ['Rejected', 'red']
])

const capitalize = (s: string) => {
  return s
    .replace('_', ' ')
    .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

export default function TableEntry({
  userCompanyData: {
    company_id,
    user_id,
    company_name,
    user_status,
    date_applied
  },
  setUserData
}: any) {
  company_name = capitalize(company_name)
  user_status = capitalize(user_status)
  const bgColor: string = `bg-${statusColors.get(user_status)}-200`
  const textColor: string = `text-${statusColors.get(user_status)}-600`

  const deleteEntry = async (uid: number, cid: number) => {
    await axios.delete(`http://localhost:8080/usercompany/${uid}/${cid}`)
    setUserData((await axios.get(`http://localhost:8080/users/${uid}`)).data)
  }
  const modifyEntry = async (change: string | Date) => {
    const data = {
      company_id: company_id,
      user_id: user_id,
      user_status: user_status,
      date_applied: date_applied
    }
    typeof change === 'string'
      ? (data.user_status = change)
      : (data.date_applied = change)
    await axios.post('http://localhost:8080/usercompany', data)
    setUserData(
      (await axios.get(`http://localhost:8080/users/${user_id}`)).data
    )
  }
  return (
    <tr className="text-black border-b border-gray-200 group dark:border-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white">
      <td className="px-6 py-2 text-left whitespace-nowrap ">
        <div className="flex items-center">
          <div className="mr-2">
            <img
              className="object-scale-down w-8 h-8"
              src={`//logo.clearbit.com/${company_name
                .replace(/\s+/g, '')
                .toLowerCase()}.com`}
            ></img>
          </div>
          <span className="font-medium">{company_name}</span>
        </div>
      </td>
      <td className="px-6 py-3 text-center">
        <div>
          <UserStatusPopup
            user_status={user_status}
            modifyEntry={modifyEntry}
          />
        </div>
      </td>
      <td className="px-6 py-2 text-left">
        <div className="flex items-center">
          <span>{dateformat(date_applied, 'd mmm yyyy')}</span>
        </div>
      </td>
      <td className="px-6 py-2 text-center">
        <div className="flex items-center justify-center">
          <span className="w-6 h-6 text-green-600 transform bg-green-200 rounded-full hover:scale-125">
            {' '}
            15{' '}
          </span>
          <span className="w-6 h-6 text-yellow-600 transform bg-yellow-200 rounded-full hover:scale-125">
            {' '}
            10{' '}
          </span>
          <span className="w-6 h-6 text-red-600 transform bg-red-200 rounded-full hover:scale-125">
            {' '}
            3{' '}
          </span>
          <span
            className={classNames(
              'text-gray-600 text-red-600 text-orange-600 text-yellow-600 text-green-600 text-blue-600 text-pink-600 text-gray-600, bg-red-200 bg-orange-200 bg-yellow-200 bg-green-200 bg-blue-200 bg-pink-200 bg-gray-200'
            )}
          />
        </div>
      </td>
      <td className="px-1 py-2 text-center ">
        <div className="flex items-center justify-center">
          <TrashIcon
            className="invisible w-5 h-5 ml-2 text-red-300 group-hover:visible hover:text-red-600 hover:cursor-pointer "
            aria-hidden="true"
            onClick={() => deleteEntry(user_id, company_id)}
          />
        </div>
      </td>
    </tr>
  )
}
