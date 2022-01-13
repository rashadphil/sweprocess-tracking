import { XCircleIcon } from '@heroicons/react/outline'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

type EntryProps = {
  companyData: any
  status: string
  date: Date | null
}

const toSnakeCase = (str: string) => str.replaceAll(' ', '_')

const statusColors: Record<string, string> = {
  offer: 'green',
  final_round: 'blue',
  interview_rounds: 'yellow',
  online_assesment: 'pink',
  applied: 'orange',
  not_applied: 'gray',
  rejected: 'red'
}

const capitalize = (s: string) => {
  s = s.replaceAll('_', ' ')
  return s.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

const removeItem = (array: any[], value: any) => {
  return array.filter(item => item !== value)
}

export default function CurrentCompanySpan({
  newEntry,
  setNewEntry
}: {
  newEntry: EntryProps
  setNewEntry: (value: EntryProps) => void
}) {
  const { companyData, status, date } = newEntry
  const { company_name } = companyData
  const bgColor = `bg-${statusColors[toSnakeCase(status)]}-200`
  const textColor = `text-${statusColors[toSnakeCase(status)]}-600`
  return (
    <div className="flex flex-wrap h-0 ">
      {company_name ? (
        <div className="text-md inline-flex rounded-full border border-gray-300 py-0.5 px-2 mx-1">
          <img
            className="w-5 h-5 mr-1 object-scale-down block m-auto"
            src={`//logo.clearbit.com/${company_name.replaceAll(' ', '')}.com`}
          />
          <span className={classNames('font-[Oceanwide] ')}>
            {capitalize(company_name)}
          </span>
          <XCircleIcon
            className="ml-1 w-3 h-3  hover:cursor-pointer block m-auto"
            onClick={() => setNewEntry({ ...newEntry, companyData: {} })}
          />
        </div>
      ) : (
        <></>
      )}

      {status ? (
        <div
          className={classNames(
            `text-md inline-flex rounded-full border border-gray-300 py-0.5 px-2 mx-1 ${textColor} ${bgColor}`
          )}
        >
          <span className={classNames(`font-[Oceanwide]  `)}>
            {capitalize(status)}
          </span>
          <XCircleIcon
            className="ml-1 w-3 h-3  hover:cursor-pointer block m-auto"
            onClick={() => setNewEntry({ ...newEntry, status: '' })}
          />
        </div>
      ) : (
        <></>
      )}
      {/* {date} */}
      {/* {statusFilter.map(status => {
        const bgColor = `bg-${statusColors[status]}-200`
        const textColor = `text-${statusColors[status]}-600`
        return (
          <span
            className={classNames(
              `inline-flex ${bgColor} ${textColor}`,
              'font-bold py-1 px-1 rounded-md text-sm mx-1'
            )}
          >
            <span>{capitalize(status)}</span>
            <XCircleIcon
              className="ml-1 mt-0.5 w-4 h-4 hover:cursor-pointer"
              onClick={() => setStatusFilter(removeItem(statusFilter, status))}
            />
          </span>
        )
      })} */}
    </div>
  )
}
