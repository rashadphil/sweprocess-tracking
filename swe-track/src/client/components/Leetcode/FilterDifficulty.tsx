import { Popover, Transition, Tab } from '@headlessui/react'
import { AdjustmentsIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const difficultyColors = {
  easy: 'green',
  medium: 'yellow',
  hard: 'red'
}

const capitalize = (s: string) => {
  return s.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}
const toSnakeCase = (str: string) => str.replaceAll(' ', '_')

const removeItem = (array: any[], value: any) => {
  return array.filter(item => item !== value)
}

export default function FilterDifficulty({
  filter,
  setFilter
}: {
  filter: string[]
  setFilter: (filter: string[]) => void
}) {
  return (
    <div className="w-full max-w-sm px-4 font-[Oceanwide]">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'opacity-90'}
                text-white group bg-orange-700 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>Difficulty</span>
              <AdjustmentsIcon
                className={`${open ? '' : 'text-opacity-70'}
                  ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
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
              <Popover.Panel className="absolute z-10 w-36 px-4 mt-3 sm:px-0 lg:max-w-3xl left-1/2  transform -translate-x-1/2 bg-white shadow-xl rounded-xl">
                <div className="w-full max-w-md px-2 py-1 sm:px-0">
                  <div className="overflow-scroll h-auto">
                    {Object.entries(difficultyColors).map(
                      ([difficulty, color]) => (
                        <ul className="flex justify-start">
                          <li
                            className={classNames(
                              'py-1.5 inline-flex pl-3 hover:cursor-pointer w-full',
                              filter.includes(toSnakeCase(difficulty))
                                ? `bg-${color}-200 hover:bg-${color}-200`
                                : 'hover:bg-gray-300'
                            )}
                            onClick={() => {
                              filter.includes(toSnakeCase(difficulty))
                                ? setFilter(
                                    removeItem(filter, toSnakeCase(difficulty))
                                  )
                                : setFilter([
                                    ...filter,
                                    toSnakeCase(difficulty)
                                  ])
                            }}
                          >
                            <span
                              className={classNames(
                                `bg-${color}-200 text-${color}-600`,
                                'font-bold py-1 px-2 rounded-md text-sm'
                              )}
                            >
                              {capitalize(difficulty)}
                            </span>
                          </li>
                        </ul>
                      )
                    )}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
