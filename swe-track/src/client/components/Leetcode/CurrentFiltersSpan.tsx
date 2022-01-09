import { XCircleIcon } from '@heroicons/react/solid'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const difficultyColors = new Map<string, string>([
  ['easy', 'green'],
  ['medium', 'yellow'],
  ['hard', 'red']
])

const capitalize = (s: string) => {
  s = s.replaceAll('_', ' ')
  return s.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

const removeItem = (array: any[], value: any) => {
  return array.filter(item => item !== value)
}

type TagProp = {
  tid: number
  tag_name: string
  alias: string
  color: string
}

function TagFiltersSpan({
  tagFilter,
  setTagFilter
}: {
  tagFilter: TagProp[]
  setTagFilter: (value: TagProp[]) => void
}) {
  return (
    <div>
      {tagFilter.map(tag => {
        const { alias, tag_name, color } = tag
        return (
          <span
            className={classNames(
              `inline-flex bg-gray-200 text-gray-600`,
              'font-bold py-1 px-1 rounded-md text-sm mx-1'
            )}
          >
            <span>{capitalize(alias || tag_name)}</span>
            <XCircleIcon
              className="ml-1 mt-0.5 w-4 h-4 hover:cursor-pointer"
              onClick={() => setTagFilter(removeItem(tagFilter, tag))}
            />
          </span>
        )
      })}
    </div>
  )
}

function DifficultyFiltersSpan({
  difficultyFilter,
  setDifficultyFilter
}: {
  difficultyFilter: string[]
  setDifficultyFilter: (value: string[]) => void
}) {
  return (
    <div>
      {difficultyFilter.map(difficulty => {
        const color = difficultyColors.get(difficulty)
        return (
          <span
            className={classNames(
              `inline-flex bg-${color}-200 text-${color}-600`,
              'font-bold py-1 px-1 rounded-md text-sm mx-1'
            )}
          >
            <span>{capitalize(difficulty)}</span>
            <XCircleIcon
              className="ml-1 mt-0.5 w-4 h-4 hover:cursor-pointer text-gray-600"
              onClick={() =>
                setDifficultyFilter(removeItem(difficultyFilter, difficulty))
              }
            />
          </span>
        )
      })}
    </div>
  )
}

export default function CurrentFiltersSpan({
  tagFilter,
  setTagFilter,
  difficultyFilter,
  setDifficultyFilter
}: {
  tagFilter: TagProp[]
  setTagFilter: (value: TagProp[]) => void
  difficultyFilter: string[]
  setDifficultyFilter: (value: string[]) => void
}) {
  return (
    <div className="flex flex-wrap ">
      <DifficultyFiltersSpan
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
      />
      <TagFiltersSpan tagFilter={tagFilter} setTagFilter={setTagFilter} />
    </div>
  )
}
