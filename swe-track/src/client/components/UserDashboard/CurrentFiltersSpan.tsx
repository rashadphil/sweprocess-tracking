import { XCircleIcon } from '@heroicons/react/solid'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

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

function StatusFilterSpan({
  statusFilter,
  setStatusFilter
}: {
  statusFilter: string[]
  setStatusFilter: (value: string[]) => void
}) {
  return (
    <div>
      {statusFilter.map(status => {
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
      })}
    </div>
  )
}

export default function CurrentFiltersSpan({
  statusFilter,
  setStatusFilter
}: {
  statusFilter: string[]
  setStatusFilter: (value: string[]) => void
}) {
  return (
    <div className="flex flex-wrap ">
      <StatusFilterSpan
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
    </div>
  )
}
