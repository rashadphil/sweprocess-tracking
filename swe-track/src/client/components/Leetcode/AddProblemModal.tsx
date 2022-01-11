import { Popover, Transition, Tab } from '@headlessui/react'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import SearchBar from '../SearchBar'
import DatePick from './DatePick'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const difficultyColors = new Map<string, string>([
  ['easy', 'green'],
  ['medium', 'yellow'],
  ['hard', 'red']
])
const capitalize = (s: string) => {
  return s.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

function DifficultySpan({ difficulty }: { difficulty: string }) {
  const color = difficultyColors.get(difficulty)
  return (
    <span
      className={classNames(
        `bg-${color}-200 text-${color}-600`,
        'font-bold py-1 px-2 rounded-md text-sm mr-3'
      )}
    >
      {difficulty.charAt(0).toUpperCase()}
    </span>
  )
}

export default function AddProblemModal({ userData, setUserData }: any) {
  const [currentTab, setCurrentTab] = useState(0)
  const [allProblemData, setAllProblemData] = useState<any[]>([])
  const [displayProblems, setDisplayProblems] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const defaultProblemData = {
    lid: null,
    title: null,
    difficulty: null
  }
  const [newEntry, setNewEntry] = useState({
    problemData: defaultProblemData,
    date: new Date()
  })
  useEffect(() => {
    console.log(userData)
  }, [userData])

  useEffect(() => {
    if (allProblemData.length == 0) getAllProblemData()
  }, [])

  useEffect(() => {
    sendEntryToDb()
  }, [newEntry])

  const getAllProblemData = async () => {
    const response = await axios.get('http://localhost:8080/leetcode')
    const data = response.data
    setAllProblemData(data)
    setDisplayProblems(data)
  }

  const sendEntryToDb = async () => {
    const { problemData, date } = newEntry
    //make sure entry is complete
    if (!problemData.lid || date === null) return
    await axios.post('http://localhost:8080/userleetcode/', {
      uid: userData.uid,
      lid: problemData.lid,
      date_solved: date || new Date()
    })

    setNewEntry({
      problemData: defaultProblemData,
      date: new Date()
    })
    setUserData(
      (await axios.get(`http://localhost:8080/users/${userData.uid}`)).data
    )
  }

  return (
    <div className="w-full max-w-md px-4 font-[Oceanwide]">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'opacity-90'}
                text-white group bg-orange-700 px-3 py-2 rounded-md inline-flex items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span>Add</span>
              <PlusIcon
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
              <Popover.Panel className="absolute z-10 w-96 px-4 mt-3 sm:px-0 lg:max-w-3xl left-1/4  transform -translate-x-1/2 bg-white shadow-xl rounded-xl">
                <div className="w-full max-w-md px-2 py-1 sm:px-0">
                  <Tab.Group
                    key={currentTab}
                    defaultIndex={currentTab}
                    onChange={index => setCurrentTab(index)}
                  >
                    <Tab.List className="flex p-1 space-x-1 bg-white-900 rounded-xl">
                      {['Problems', 'Date'].map(category => (
                        <Tab
                          key={category}
                          className={({ selected }) =>
                            classNames(
                              'w-full py-2.5 leading-5 font-medium text-md ',
                              selected
                                ? 'bg-white text-orange-600 border-b-4 border-b-orange-600'
                                : 'text-gray-600 hover:bg-white/[0.12] hover:text-orange-300 border-b border-b-gray-400 hover:border-b-2 hover:border-b-orange-300 '
                            )
                          }
                        >
                          {category}
                        </Tab>
                      ))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                      <Tab.Panel
                        key={'Problem Panel'}
                        className={classNames('bg-white rounded-xl px-3 ')}
                      >
                        <SearchBar
                          keyName={'title'}
                          values={allProblemData}
                          filtered={displayProblems}
                          onChange={(filtered: Object[]) =>
                            setDisplayProblems(filtered)
                          }
                          searchTerm={searchTerm}
                          setSearchTerm={setSearchTerm}
                        />
                        {/* list of problems */}
                        <div className="overflow-scroll h-80">
                          {displayProblems.map(problem => (
                            <ul className="flex justify-start">
                              <li
                                className="text-sm py-1.5 inline-flex pl-3 hover:bg-gray-200 hover:cursor-pointer w-full"
                                onClick={() => {
                                  setCurrentTab(1)
                                  setNewEntry({
                                    ...newEntry,
                                    problemData: problem
                                  })
                                }}
                              >
                                <div className="inline-flex justify-between w-full">
                                  <div className="text-left pt-1 pl-3">
                                    {problem.lid}. {capitalize(problem.title)}
                                  </div>
                                  <div>
                                    <DifficultySpan
                                      difficulty={problem.difficulty}
                                    />
                                  </div>
                                </div>
                              </li>
                            </ul>
                          ))}
                        </div>
                      </Tab.Panel>
                      <Tab.Panel
                        key={'Date Panel'}
                        className={classNames('bg-white  rounded-xl px-3 ')}
                      >
                        <div className="overflow-scroll h-72">
                          <DatePick></DatePick>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
