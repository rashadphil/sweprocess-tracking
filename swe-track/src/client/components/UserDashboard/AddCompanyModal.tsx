import { Popover, Transition, Tab } from '@headlessui/react'
import { ChevronDownIcon, PlusIcon, PlusSmIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'
import DateSelect from '../DateSelect'
import SearchBar from '../SearchBar'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const capitalize = (s: string) => {
  return s.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}
const toSnakeCase = (str: string) => str.toLowerCase().replace(' ', '_')

const statusColors = {
  offer: 'green',
  'final round': 'blue',
  'interview rounds': 'yellow',
  'online assesment': 'pink',
  applied: 'orange',
  'not applied': 'gray',
  rejected: 'red'
}

type EntryProps = {
  companyData: any
  status: string
  date: Date | null
}

export default function AddCompanyModal({
  season,
  userData,
  setUserData,
  newEntry,
  setNewEntry
}: any) {
  const [currentTab, setCurrentTab] = useState(0)
  const [allCompanyData, setAllCompanyData] = useState<any[]>([])
  const [displayCompanies, setDisplayCompanies] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  useEffect(() => {
    if (allCompanyData.length == 0) getAllCompanyData()
  }, [])

  useEffect(() => {
    console.log(newEntry)
    const { companyData, status, date } = newEntry
    if (companyData.cid && status && date) {
      sendEntryToDb(newEntry)
    }
  }, [newEntry])

  const getAllCompanyData = async () => {
    const response = await axios.get(
      'http://localhost:8080/companies?sort=popularity'
    )
    const data = response.data.filter(
      (companyData: any) => companyData.verified
    )
    setAllCompanyData(data)
    setDisplayCompanies(data)
  }

  const addUnverifiedCompany = async (company_name: string) => {
    const response = await axios.post('http://localhost:8080/companies', {
      company_name: toSnakeCase(company_name)
    })
    const company = response.data
    setNewEntry({
      ...newEntry,
      companyData: company
    })
  }

  const sendEntryToDb = async (entry: EntryProps) => {
    const { companyData, status, date } = entry
    const { cid, company_name } = companyData

    await axios.post('http://localhost:8080/usercompany', {
      user_id: userData.uid,
      company_id: cid,
      company_name: company_name,
      user_status: status.replace(' ', '_'),
      date_applied: date || new Date(),
      szn: season
    })

    setNewEntry({
      companyData: {},
      status: '',
      date: null
    })
    setUserData(
      (await axios.get(`http://localhost:8080/users/${userData.uid}`)).data
    )
  }

  return (
    <div className="w-full max-w-sm px-1 font-[Oceanwide]">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? '' : 'opacity-90'}
                text-white group bg-orange-500 px-4 py-1 rounded-full inline-flex text-center items-center text-base font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <PlusSmIcon
                className={`
                  h-6 w-6 text-white group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
              <span className="">Add</span>
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
              {/* <Popover.Panel className="absolute z-10 w-full max-w-sm px-4 mt-3 transform -translate-x-1/2 bg-white shadow-xl rounded-xl left-1/2 sm:px-0 lg:max-w-3xl"> */}
              <Popover.Panel className="absolute z-10 w-72 px-4 mt-3 sm:px-0 lg:max-w-3xl left-1/4  transform -translate-x-1/2 bg-white shadow-xl rounded-xl">
                {({ close }) => (
                  <div className="w-full max-w-md px-2 py-1 sm:px-0">
                    <Tab.Group
                      key={currentTab}
                      defaultIndex={currentTab}
                      onChange={index => setCurrentTab(index)}
                    >
                      <Tab.List className="flex p-1 space-x-1 bg-white-900 rounded-xl">
                        {['Companies', 'Status', 'Date'].map(category => (
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
                          key={'Company Panel'}
                          className={classNames('bg-white rounded-xl px-3 ')}
                        >
                          <SearchBar
                            keyName={'company_name'}
                            values={allCompanyData}
                            filtered={displayCompanies}
                            onChange={(filtered: Object[]) =>
                              setDisplayCompanies(filtered)
                            }
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                          />
                          {/* list of companies */}
                          <div className="overflow-scroll h-80">
                            {displayCompanies.length > 0 ? (
                              displayCompanies.map(company => (
                                <ul className="flex justify-start">
                                  <li
                                    className="text-md py-1 inline-flex pl-3 hover:bg-gray-200 hover:cursor-pointer w-full"
                                    onClick={() => {
                                      setCurrentTab(1)
                                      setNewEntry({
                                        ...newEntry,
                                        companyData: company
                                      })
                                    }}
                                  >
                                    <img
                                      className="object-scale-down w-7 h-7"
                                      src={`//logo.clearbit.com/${company.website_link}`}
                                    />
                                    <h3 className="pt-1 pl-3">
                                      {capitalize(company.company_name)}
                                    </h3>
                                  </li>
                                </ul>
                              ))
                            ) : (
                              <div
                                className="inline-flex mt-2 py-1 w-full border-dashed border-4 rounded-sm hover:border-gray-600 hover:cursor-pointer "
                                onClick={() => {
                                  addUnverifiedCompany(searchTerm)
                                  setCurrentTab(1)
                                }}
                              >
                                <PlusIcon className="pl-1 w-5 h-5 text-gray-500" />
                                <span className="text-gray-500 mx-2">
                                  Add Company:
                                </span>
                                <span>"{searchTerm}"</span>
                              </div>
                            )}
                          </div>
                        </Tab.Panel>

                        <Tab.Panel
                          key={'Status Panel'}
                          className={classNames('bg-white  rounded-xl px-3 ')}
                        >
                          <div className="overflow-scroll h-72">
                            {Object.entries(statusColors).map(
                              ([status, color]) => (
                                <ul className="flex justify-start">
                                  <li
                                    className="py-1.5 inline-flex pl-3 hover:bg-gray-300 hover:cursor-pointer w-full"
                                    onClick={() => {
                                      setCurrentTab(2)
                                      setNewEntry({
                                        ...newEntry,
                                        status: status
                                      })
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
                              )
                            )}
                          </div>
                        </Tab.Panel>

                        <Tab.Panel
                          key={'Date Panel'}
                          className={classNames('bg-white  rounded-xl px-3 ')}
                        >
                          <div className="overflow-scroll h-auto">
                            <DateSelect
                              newEntry={newEntry}
                              setNewEntry={setNewEntry}
                              closePopover={() => {
                                close()
                                setCurrentTab(0)
                              }}
                            />
                          </div>
                        </Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
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
