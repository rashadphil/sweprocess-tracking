import React from 'react'
import TableEntry from './components/TableEntry'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  const hardEntries: {
    company: string
    status: string
    dateApplied: Date
  }[] = [
    { company: 'Microsoft', status: 'Offer', dateApplied: new Date() },
    { company: 'Google', status: 'Final Round', dateApplied: new Date() },
    { company: 'Meta', status: 'Interview Scheduled', dateApplied: new Date() },
    { company: 'Stripe', status: 'Applied', dateApplied: new Date() },
    { company: 'NVIDIA', status: 'Applied', dateApplied: new Date() },
    { company: 'Citadel', status: 'Rejected', dateApplied: new Date() },
    { company: 'Netflix', status: 'Rejected', dateApplied: new Date() },
    { company: 'Salesforce', status: 'Rejected', dateApplied: new Date() }
  ]

  const tableEntries: JSX.Element[] = hardEntries.map(entry => (
    <TableEntry {...entry}></TableEntry>
  ))

  return (
    <div className="App">
      <Navbar />
      <Dashboard entries={tableEntries}/>
    </div>
  )
}

export default App
