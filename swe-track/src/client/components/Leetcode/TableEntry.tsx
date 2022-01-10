import React from 'react'
import { TrashIcon } from '@heroicons/react/outline'
import axios from 'axios'
import dateformat from 'dateformat'
import UserStatusPopup from './UserStatusPopup'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const difficultyColors = new Map<string, string>([
  ['Easy', 'green'],
  ['Medium', 'yellow'],
  ['Hard', 'red']
])

const colorTypesBg = new Map<string, string>([
  ['red', 'bg-red-200'],
  ['pink', 'bg-pink-200'],
  ['purple', 'bg-purple-200'],
  ['violet', 'bg-violet-200'],
  ['indigo', 'bg-indigo-200'],
  ['blue', 'bg-blue-200'],
  ['sky', 'bg-sky-200'],
  ['cyan', 'bg-cyan-200'],
  ['teal', 'bg-teal-200'],
  ['green', 'bg-green-200'],
  ['emerald', 'bg-emerald-200'],
  ['lime', 'bg-lime-200'],
  ['yellow', 'bg-yellow-200'],
  ['amber', 'bg-amber-200'],
  ['orange', 'bg-orange-200'],
  ['fuchsia', 'bg-fuchsia-200'],
  ['rose', 'bg-rose-200'],
  ['gray', 'bg-gray-200']
])

const colorTypesTx = new Map<string, string>([
  ['red', 'text-red-600'],
  ['pink', 'text-pink-600'],
  ['purple', 'text-purple-600'],
  ['violet', 'text-violet-600'],
  ['indigo', 'text-indigo-600'],
  ['blue', 'text-blue-600'],
  ['sky', 'text-sky-600'],
  ['cyan', 'text-cyan-600'],
  ['teal', 'text-teal-600'],
  ['green', 'text-green-600'],
  ['emerald', 'text-emerald-600'],
  ['lime', 'text-lime-600'],
  ['yellow', 'text-yellow-600'],
  ['amber', 'text-amber-600'],
  ['orange', 'text-orange-600'],
  ['fuchsia', 'text-fuchsia-600'],
  ['rose', 'text-rose-600'],
  ['gray', 'text-gray-600']
])

const capitalize = (s: string) => {
  return s
    .replaceAll('_', ' ')
    .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

const toLink = (s: string) => {
  s = s.replaceAll(' ', '-').toLowerCase()
  return `https://leetcode.com/problems/${s}`
}

export default function TableEntry({
  userLeetcodeData: { lid, title, difficulty, user_leetcode, leetcode_tags },
  setUserData
}: any) {
  const { uid, date_solved } = user_leetcode[0]
  const tags = leetcode_tags.map(
    (leetcode_tag: { tag: Object }) => leetcode_tag.tag
  )
  const deleteEntry = async (uid: number, lid: number) => {
    await axios.delete(`http://localhost:8080/userleetcode/${uid}/${lid}`)
    setUserData((await axios.get(`http://localhost:8080/users/${uid}`)).data)
  }

  function TitleSpan({ title, lid }: { title: string; lid: number }) {
    return (
      <a href={toLink(title)} target="_blank" className="text-sm font-medium">
        {lid}. {title}
      </a>
    )
  }
  function DifficultySpan({ difficulty }: { difficulty: string }) {
    const color = difficultyColors.get(difficulty)
    return (
      <span
        className={classNames(
          `bg-${color}-200 text-${color}-600`,
          'font-bold py-1 px-1 rounded-md text-sm'
        )}
      >
        {capitalize(difficulty)}
      </span>
    )
  }

  type TagProp = {
    tag_name: string
    color: string
    alias: string
  }
  function TagsElement({ tags }: { tags: TagProp[] }) {
    return (
      <div className="w-72 overflow-x-scroll scrollbar-hide">
        {tags.map((tagInfo: TagProp) => {
          const { tag_name, color, alias } = tagInfo
          const n = Math.floor(Math.random() * colorTypesBg.size)
          // const bgColor = `bg-${Array.from(colorTypesBg.keys())[n]}-200`
          // const textColor = `text-${Array.from(colorTypesTx.keys())[n]}-600`
          const bgColor = 'bg-gray-200'
          const textColor = 'bg-gray-600'
          return (
            <span
              className={classNames(
                `whitespace-nowrap ${bgColor} ${textColor} bg-opacity-40`,
                'py-1 px-1 rounded-md text-sm font-bold',
                'mx-1'
              )}
            >
              {capitalize(alias || tag_name)}
            </span>
          )
        })}
      </div>
    )
  }

  return (
    <tr className="text-black border-b border-gray-200 group dark:border-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white">
      <td className="px-6 py-2 text-left whitespace-nowrap ">
        <div className="flex items-center">
          <div className="mr-2"></div>
          <TitleSpan title={title} lid={lid} />
        </div>
      </td>
      <td className="pr-3 py-2 text-center">
        <div>
          <DifficultySpan difficulty={difficulty} />
        </div>
      </td>
      <td className="px-8 py-2 text-left">
        <TagsElement tags={tags} />
      </td>
      <td className="px-6 py-2 text-left">
        <div></div>
      </td>
      <td className="px-6 py-2 text-center">
        <div className="flex items-center">
          <span>{dateformat(date_solved, 'd mmm yyyy')}</span>
        </div>
      </td>
      <td className="px-1 py-2 text-center ">
        <div className="flex items-center justify-center">
          <TrashIcon
            className="invisible w-5 h-5 ml-2 text-red-300 group-hover:visible hover:text-red-600 hover:cursor-pointer "
            aria-hidden="true"
            onClick={() => deleteEntry(uid, lid)}
          />
        </div>
      </td>
    </tr>
  )
}
