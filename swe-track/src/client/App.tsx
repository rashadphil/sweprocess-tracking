import React from 'react'
import TableEntry from './components/TableEntry'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import { ThemeProvider } from './components/themeContext'
import LoginPage from './pages/LoginPage'
import { Outlet, Link } from 'react-router-dom'

import { AuthProvider } from './components/authContext'
import './App.css'

function App() {
  const hardEntries: {
    company: string
    status: string
    dateApplied: Date
  }[] = [
    { company: 'Datadog', status: 'Offer', dateApplied: new Date() },
    { company: 'Microsoft', status: 'Offer', dateApplied: new Date() },
    { company: 'Quora', status: 'Offer', dateApplied: new Date() },
    { company: 'Hudson River Trading', status: 'Final Round', dateApplied: new Date() },
    { company: 'Bloomberg', status: 'Final Round', dateApplied: new Date() },
    { company: 'Google', status: 'Final Round', dateApplied: new Date() },
    { company: 'Akuna Capital', status: 'Final Round', dateApplied: new Date() },
    { company: 'Meta', status: 'Interview Scheduled', dateApplied: new Date() },
    { company: 'Jump Trading', status: 'Interview Scheduled', dateApplied: new Date() },
    { company: 'Amazon', status: 'Interview Scheduled', dateApplied: new Date() },
    { company: 'Stripe', status: 'Applied', dateApplied: new Date() },
    { company: 'Palantir', status: 'Applied', dateApplied: new Date() },
    { company: 'NVIDIA', status: 'Applied', dateApplied: new Date() },
    { company: 'Citadel', status: 'Rejected', dateApplied: new Date() },
    { company: 'Netflix', status: 'Rejected', dateApplied: new Date() },
    { company: 'Salesforce', status: 'Rejected', dateApplied: new Date() }
  ]

  const tableEntries: JSX.Element[] = hardEntries.map(entry => (
    <TableEntry {...entry}></TableEntry>
  ))

  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="App transition-colors duration-300 bg-gray-50 dark:bg-gray-700">
          <Navbar />
          {/* <Dashboard entries={tableEntries} /> */}
        </div>
        <Outlet/>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
