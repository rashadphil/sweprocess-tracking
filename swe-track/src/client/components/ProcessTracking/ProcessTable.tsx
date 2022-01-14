import {
  ArrowSmUpIcon,
  ArrowSmDownIcon,
  SelectorIcon
} from '@heroicons/react/solid'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

type SortIconProps = {
  className: string
  sort: string
  onClick: () => void
}

function SortIcon({ className, sort, onClick }: SortIconProps) {
  switch (sort) {
    case '':
      return (
        <SelectorIcon
          className={className + ' text-gray-500'}
          onClick={onClick}
        />
      )
    case 'asc':
      return <ArrowSmUpIcon className={className} onClick={onClick} />
    case 'desc':
      return <ArrowSmDownIcon className={className} onClick={onClick} />
    default:
      return <div></div>
  }
}
const nextSort = new Map<string, string>([
  ['', 'asc'],
  ['asc', 'desc'],
  ['desc', '']
])

type TableSortProps = {
  company_name: string
  user_status: string
  date_applied: string
}
type HeaderProps = {
  className?: string
  title: string
  type: string
  tableSort?: TableSortProps
  setTableSort?: (value: TableSortProps) => void
}

const statusColors = new Map<string, string>([
  ['offer', 'green'],
  ['final_round', 'blue'],
  ['interview_rounds', 'yellow'],
  ['online_assessment', 'pink'],
  ['applied', 'orange'],
  ['not_applied', 'gray'],
  ['rejected', 'red']
])

function Header({
  className,
  title,
  type,
  tableSort,
  setTableSort
}: HeaderProps) {
  // const sort = (tableSort as any)[type]
  const color = statusColors.get(type) || ''
  const textColor = `text-${color}-600`
  const bgColor = `bg-${color}-200`
  return (
    <th
      className={
        className ||
        'py-2 px-3 border bg-gray-200 border-transparent border-gray-400 w-20 text-bold'
      }
    >
      <div className="flex space-x-1 items-center">
        <span className={classNames(``)}>{title}</span>
        {/* <SortIcon
          className="pl-1 w-5 h-5 hover:cursor-pointer"
          sort={sort}
          onClick={() => {
            setTableSort({ ...tableSort, [type]: nextSort.get(sort) })
          }}
        /> */}
      </div>
    </th>
  )
}

export default function ProcessTable({ entries }: { entries: any }) {
  const headers = [
    {
      title: 'Company',
      type: 'company_name',
      className:
        'px-6 py-3 text-left bg-gray-200 border border-transparent border-gray-400 w-14 text-bold'
    },
    {
      title: 'Rejected',
      type: 'rejected'
    },
    {
      title: 'Applied',
      type: 'applied'
    },
    {
      title: 'Assessment',
      type: 'online_assessment'
    },
    {
      title: 'Interview',
      type: 'interview_rounds'
    },
    {
      title: 'Final',
      type: 'final_round'
    },
    {
      title: 'Offer',
      type: 'offer'
    }
  ]
  return (
    <div className="my-6 bg-white rounded shadow-md dark:bg-gray-700">
      <table className="w-full table-auto min-w-max">
        <thead>
          <tr className="text-sm leading-normal text-black uppercase bg-white border-b border-black dark:bg-gray-800 dark:text-white">
            {headers.map(header => {
              const { title, type, className } = header
              return (
                <Header
                  className={className}
                  title={title}
                  type={type}
                  // tableSort={tableSort}
                  // setTableSort={setTableSort}
                />
              )
            })}
          </tr>
          {entries}
        </thead>
        <tbody className="text-sm font-light text-gray-600 dark:text-white"></tbody>
      </table>
    </div>
  )
}
