export default function Table({ entries}: any) {
  return (
    <div className="my-6 bg-white rounded shadow-md dark:bg-gray-700">
      <table className="w-full table-auto min-w-max">
        <thead>
          <tr className="text-sm leading-normal text-black uppercase bg-white border-b border-black dark:bg-gray-800 dark:text-white">
            <th className="px-6 py-3 text-left">Problem</th>
            <th className="px-0 py-3 text-center">Difficulty</th>
            <th className="px-8 py-3 text-center">Tags</th>
            <th className="px-6 py-3 text-left">Companies</th>
            <th className="px-6 py-3 text-center">Date</th>
          </tr>
          {entries}
        </thead>
        <tbody className="text-sm font-light text-gray-600 dark:text-white"></tbody>
      </table>
    </div>
  )
}
