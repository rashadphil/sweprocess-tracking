import { Popover, Transition, Tab } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { Fragment, useEffect, useState } from 'react'

const solutions = [
  {
    name: 'Insights',
    description: 'Measure actions your users take',
    href: '##',
    icon: IconOne
  },
  {
    name: 'Automations',
    description: 'Create your own targeted content',
    href: '##',
    icon: IconTwo
  },
  {
    name: 'Reports',
    description: 'Keep track of your growth',
    href: '##',
    icon: IconThree
  }
]
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const capitalize = (s: string) => {
  return s.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

export default function AddCompanyModal() {
  const [currentTab, setCurrentTab] = useState(1)
  const [allCompanyData, setAllCompanyData] = useState<any[]>([])

  useEffect(() => {
    if (allCompanyData.length == 0) getAllCompanyData()
  }, [])

  const getAllCompanyData = async () => {
    const response = await axios.get('http://localhost:8080/companies')
    const data = response.data
    setAllCompanyData(data)
  }
  console.log(allCompanyData)

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
              <span>Add</span>
              <ChevronDownIcon
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
              <Popover.Panel className="absolute z-10 w-full max-w-sm bg-white shadow-xl rounded-xl px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                <div className="w-full max-w-md px-2 py-1 sm:px-0">
                  <Tab.Group>
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
                        className={classNames(
                          'bg-white rounded-xl p-3 h-60 overflow-scroll'
                          // 'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
                        )}
                      >
                        {allCompanyData.map(company => (
                          <ul className="flex justify-start">
                            <li className="text-xl py-1.5 inline-flex pl-3">
                              <img
                                className="w-8 h-8 object-scale-down"
                                src={`//logo.clearbit.com/${company.website_link}`}
                              />
                              <h3 className="pl-3 pt-1">
                                {capitalize(company.company_name)}
                              </h3>
                            </li>
                            {/* {posts.map(post => (
                              <li
                                key={post.id}
                                className="relative p-3 rounded-md hover:bg-coolGray-100"
                              >
                                <h3 className="text-sm font-medium leading-5">
                                  {post.title}
                                </h3>

                                <ul className="flex mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
                                  <li>{post.date}</li>
                                  <li>&middot;</li>
                                  <li>{post.commentCount} comments</li>
                                  <li>&middot;</li>
                                  <li>{post.shareCount} shares</li>
                                </ul>

                                <a
                                  href="#"
                                  className={classNames(
                                    'absolute inset-0 rounded-md',
                                    'focus:z-10 focus:outline-none focus:ring-2 ring-blue-400'
                                  )}
                                />
                              </li>
                            ))} */}
                          </ul>
                        ))}
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </div>
                {/* <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                    {solutions.map(item => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-12 sm:w-12">
                          <item.icon aria-hidden="true" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="p-4 bg-gray-50">
                    <a
                      href="##"
                      className="flow-root px-2 py-2 transition duration-150 ease-in-out rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <span className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">
                          Documentation
                        </span>
                      </span>
                      <span className="block text-sm text-gray-500">
                        Start integrating products and tools
                      </span>
                    </a>
                  </div>
                </div> */}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  )
}
