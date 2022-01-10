import {
  ArrowSmUpIcon,
  ArrowSmDownIcon,
  SelectorIcon
} from '@heroicons/react/solid'

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
  lid: string
  difficulty: string
}
type HeaderProps = {
  className: string
  title: string
  type: string
  tableSort: TableSortProps
  setTableSort: (value: TableSortProps) => void
}

function Header({
  className,
  title,
  type,
  tableSort,
  setTableSort
}: HeaderProps) {
  const sort = (tableSort as any)[type]
  return (
    <th className={className}>
      <div className="inline-flex">
        {title}
        <SortIcon
          className="pl-1 w-5 h-5 hover:cursor-pointer"
          sort={sort}
          onClick={() => {
            setTableSort({ ...tableSort, [type]: nextSort.get(sort) })
          }}
        />
      </div>
    </th>
  )
}
export default function Table({ entries, tableSort, setTableSort }: any) {
  const headers = [
    {
      title: 'Problem',
      type: 'lid',
      className: 'px-6 py-3 text-left'
    },
    {
      title: 'Difficulty',
      type: 'difficulty',
      className: 'px-0 py-3 text-center'
    },
    {
      title: 'Tags',
      type: '',
      className: 'px-0 py-3 text-center'
    },
    {
      title: 'Companies',
      type: '',
      className: 'px-8 py-3 text-center'
    },
    {
      title: 'Date',
      type: '',
      className: 'px-6 py-3 text-center'
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
                  tableSort={tableSort}
                  setTableSort={setTableSort}
                />
              )
            })}
            {/* <th className="px-6 py-3 text-left">Problem</th>
            <th className="px-0 py-3 text-center">Difficulty</th>
            <th className="px-8 py-3 text-center">Tags</th>
            <th className="px-6 py-3 text-left">Companies</th>
            <th className="px-6 py-3 text-center">Date</th> */}
          </tr>
          {entries}
        </thead>
        <tbody className="text-sm font-light text-gray-600 dark:text-white"></tbody>
      </table>
    </div>
  )
}
