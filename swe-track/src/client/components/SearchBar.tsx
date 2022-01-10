import { useEffect, useState } from 'react'
// @ts-ignore
import TrieSearch from 'trie-search'
import { values } from 'underscore'

export default function SearchBar({
  keyName,
  values,
  filtered,
  onChange,
  searchTerm,
  setSearchTerm
}: {
  keyName: string
  values: Object[]
  filtered: Object[]
  onChange: any
  searchTerm: string
  setSearchTerm: (value: string) => void
}) {
  const [trie, setTrie] = useState(new TrieSearch(keyName))

  //make sure trie is only built once
  useEffect(() => {
    trie.addAll(values)
  }, [])
  //search trie whenver input changes
  useEffect(() => {
    //send all companies if input is empty
    const filtered = searchTerm ? trie.search(searchTerm) : values
    onChange(filtered)
  }, [searchTerm])

  return (
    <div className="py-1 mx-auto text-gray-600">
      <input
        className="w-full h-10 max-w-full px-5 bg-white border-2 border-gray-300 rounded-lg text-md focus:outline-none"
        autoComplete="off"
        type="search"
        name="search"
        placeholder="Search"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      ></input>
    </div>
  )
}
