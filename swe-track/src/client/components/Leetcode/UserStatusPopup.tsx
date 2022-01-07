import React, { Fragment } from 'react'
import { Popover, Transition, Tab } from '@headlessui/react'
import { AdjustmentsIcon } from '@heroicons/react/outline'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
const capitalize = (s: string) => {
  return s
    .replace('_', ' ')
    .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}
const toSnakeCase = (s: string) => s.replace(/\s+/g, '_').toLowerCase()

const statusColors: Record<string, string> = {
  Offer: 'green',
  'Final Round': 'blue',
  'Interview Rounds': 'yellow',
  'Online Assesment': 'pink',
  Applied: 'orange',
  'Not Applied': 'gray',
  Rejected: 'red'
}

function CurrentStatusSpan({ user_status }: { user_status: string }) {
  const user_status_color: string = statusColors[capitalize(user_status)]
  return (
    <span
      className={classNames(
        `bg-${user_status_color}-200 text-${user_status_color}-600 z-10 font-bold py-1 px-2 rounded-md text-sm hover:cursor-pointer`
      )}
    >
      {capitalize(user_status)}
    </span>
  )
}

export default function UserStatusPopup({
  user_status,
  modifyEntry
}: {
  user_status: string
  modifyEntry: (status: string | Date) => void
}) {
  return (
    <div className="w-full max-w-sm px-4 font-[Oceanwide]">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button className="transform transition duration-100 hover:scale-110">
              <CurrentStatusSpan user_status={user_status} />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-50 w-48 px-4 mt-3 sm:px-0 lg:max-w-3xl left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-xl">
                {({ close }) => (
                  <div className="w-full max-w-md px-2 sm:px-0">
                    <div className="text-left py-2 pl-3 leading-5 bg-gray-100 border-b border-b-gray-400">
                      <CurrentStatusSpan user_status={user_status} />
                    </div>
                    <div className="overflow-scroll h-72">
                      <div className="flex pl-3 pr-3 mt-2 mb-1.5 text-sm text-slate-400 ">
                        Select a status
                      </div>
                      {Object.entries(statusColors).map(([status, color]) => (
                        <ul className="flex justify-start">
                          <li
                            className={classNames(
                              'py-1 inline-flex pl-3 hover:cursor-pointer hover:bg-gray-100 w-full'
                            )}
                            onClick={() => {
                              modifyEntry(toSnakeCase(status))
                              close()
                            }}
                          >
                            <span
                              className={classNames(
                                `bg-${color}-200 text-${color}-600`,
                                'font-bold py-1 px-2 rounded-md text-sm'
                              )}
                            >
                              {capitalize(status)}
                            </span>
                          </li>
                        </ul>
                      ))}
                    </div>
                  </div>
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
