export default function Table({ entries }: any) {
  return (
    <div className="bg-white shadow-md rounded my-6">
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className="bg-white-100 border-black border-b text-black uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Company</th>
            <th className="py-3 px-6 text-center">Status</th>
            <th className="py-3 px-6 text-left">Date Applied</th>
            <th className="py-3 px-6 text-center">LC Problems</th>
          </tr>
          {entries}
        </thead>
        <tbody className="text-gray-600 text-sm font-light"></tbody>
      </table>
    </div>
  )
}
