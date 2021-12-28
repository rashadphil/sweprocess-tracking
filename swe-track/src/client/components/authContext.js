import React, { createContext, useContext } from 'react'
import useSWR from 'swr'

import axios from 'axios'

const AuthContext = createContext(false)
const serverUrl = 'http://localhost:8080/'

export const AuthProvider = props => {
  const { data, error, mutate } = useSWR(`${serverUrl}/me`)
  const handleLogin = async googleData => {
    console.log('Handling Login')
    await axios.post(
      serverUrl + 'api/v1/auth/google',
      {
        token: googleData.tokenId
      },
      {
        'Content-Type': 'application/json'
      }
    )
    mutate()
  }
  const logOut = async () => {
    await axios.delete('/api/v1/auth/logout')
    mutate()
  }
  return (
    <AuthContext.Provider
      value={{
        user: data,
        error: error,
        handleLogin: handleLogin,
        logOut: logOut
      }}
      {...props}
    />
  )
}
export const useAuth = () => useContext(AuthContext)
