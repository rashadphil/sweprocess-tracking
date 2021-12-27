import Table from '../components/Table'
export default function Dashboard({ entries }: any) {
  return (
    <div>
      <h1>Hello Peter.</h1>
      <Table entries={entries}></Table>
    </div>
  )
}
