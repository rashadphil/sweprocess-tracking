import { Popover, Transition, Tab } from '@headlessui/react'
import { AdjustmentsIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const capitalize = (s: string) => {
  s = s.replaceAll('_', ' ')
  return s.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}
const toSnakeCase = (str: string) => str.replace(' ', '_')

const removeItem = (array: any[], value: any) => {
  return array.filter(item => item !== value)
}

type TagProp = {
  tid: number
  tag_name: string
  alias: string
  color: string
}

function Popup({
  tags,
  filtered,
  updateTagFilters
}: {
  tags: TagProp[]
  filtered: number[]
  updateTagFilters: (tag: TagProp) => void
}) {
  return (
    <div className="overflow-auto flex flex-wrap py-4 mx-2 mt-1">
      {tags.map(tag => {
        const { tid, tag_name, alias, color } = tag
        return (
          <span
            key={tid}
            className={`
              inline-flex items-center justify-center m-1 px-2 py-0 rounded-full
              text-xs leading-6 hover:cursor-pointer text-gray-700 , 
              ${
                filtered.includes(tid)
                  ? 'bg-blue-400 text-black'
                  : 'bg-gray-200'
              }`}
            onClick={() => updateTagFilters(tag)}
          >
            {capitalize(tag_name)}
          </span>
        )
      })}
    </div>
  )
}

export default function FilterTag({
  filter,
  setFilter
}: {
  filter: number[]
  setFilter: (filter: number[]) => void
}) {
  const [tags, setTags] = useState<TagProp[]>([])

  const updateTagFilters = (tag: TagProp) => {
    const { tid } = tag
    if (filter.includes(tid)) {
      setFilter(removeItem(filter, tid))
    } else {
      setFilter([...filter, tid])
    }
  }

  useEffect(() => {
    console.log(filter)
  }, [filter])

  useEffect(() => {
    if (tags.length == 0) getAllTags()
  }, [])

  const getAllTags = async () => {
    const response = await axios.get('http://localhost:8080/tags')
    setTags(response.data)
  }
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
              <span>Tags</span>
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
              <Popover.Panel className="absolute z-10 w-96 px-4 mt-3 sm:px-0 lg:max-w-3xl left-1/2  transform -translate-x-1/2 bg-white shadow-xl rounded-xl">
                <div className="w-full max-w-md px-2 py-1 sm:px-0">
                  <div className="overflow-scroll h-72">
                    <Popup
                      tags={tags}
                      filtered={filter}
                      updateTagFilters={updateTagFilters}
                    />
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
