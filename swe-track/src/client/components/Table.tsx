export default function Table({ entries }: any) {
  return (
    <div className="bg-white dark:bg-gray-700 shadow-md rounded my-6">
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-white dark:bg-gray-800 border-black border-b text-black dark:text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Company</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-left">Date Applied</th>
            <th className="py-3 px-6 text-center">LC Problems</th>
          </tr>
          {entries}
        </thead>
        <tbody className="text-gray-600 dark:text-white text-sm font-light"></tbody>
      </table>
    </div>
  )
}
