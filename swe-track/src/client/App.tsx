import React, { useState } from 'react'
import TableEntry from './components/UserDashboard/TableEntry'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import { ThemeProvider } from './components/themeContext'
import LoginPage from './pages/LoginPage'
import { Outlet, Link } from 'react-router-dom'

import './App.css'
import AddCompanyModal from './components/UserDashboard/AddCompanyModal'
import LeetcodeDashboard from './pages/LeetcodeDashboard'

function App() {
  const [userData, setUserData] = useState(
    localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData') || '{}')
      : null
  )
  return (
    <ThemeProvider>
      <div className="transition-colors duration-300 App bg-gray-50 dark:bg-gray-700">
        <Navbar userData={userData} setUserData={setUserData} />
        {userData ? (
          // <Dashboard userData={userData} setUserData={setUserData} />
          <LeetcodeDashboard userData={userData} setUserData={setUserData} />
        ) : (
          <LoginPage userData={userData} setUserData={setUserData} />
        )}
      </div>
      <Outlet />
    </ThemeProvider>
  )
}

export default App
