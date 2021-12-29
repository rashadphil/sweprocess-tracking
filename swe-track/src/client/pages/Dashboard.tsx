import Table from '../components/Table'
export default function Dashboard({ userData, entries }: any) {
  return (
    <div className="overflow-x-auto mt-20">
      <div className="min-w-screen min-h-screen bg-white-400 flex justify-center font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
          <h3 className="text-left ml-3 text-4xl font-[Oceanwide] dark:text-white">
            Hello {userData.full_name}!
          </h3>
          <Table entries={entries}></Table>
        </div>
      </div>
    </div>
  )
}
