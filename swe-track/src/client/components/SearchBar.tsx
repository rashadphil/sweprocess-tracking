import { useEffect, useState } from 'react'
// @ts-ignore
import TrieSearch from 'trie-search'

export default function SearchBar({
  keys,
  values,
  filtered,
  onChange
}: {
  keys: string[]
  values: Object[]
  filtered: Object[]
  onChange: any
}) {
  const [trie, setTrie] = useState(new TrieSearch())
  const [searchTerm, setSearchTerm] = useState('')

  //make sure trie is only built once
  useEffect(() => {
    keys.forEach((key, index) => {
      trie.map(key, values[index])
    })
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
