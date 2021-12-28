import React, { createContext, useContext } from 'react'
import useSWR from 'swr'

import axios from 'axios'

const AuthContext = createContext(false)
const serverUrl = 'http://localhost:8080/'

export const AuthProvider = props => {
  const { data, error, mutate } = useSWR(`/api/v1/auth/me`)
  return (
    <AuthContext.Provider
      value={{
        user: data,
        error: error,
        handleLogin: () => handleLogin().then(mutate()),
        logOut: () => logOut().then(mutate()),
      }}
      {...props}
    />
  )
}

export const handleLogin = async googleData => {
  console.log('Handling Login')
  const res = await axios.post(
    serverUrl + 'api/v1/auth/google',
    {
      token: googleData.tokenId
    },
    {
      'Content-Type': 'application/json'
    }
  )
  const data = res.data
}

export const logOut = async () => {
  await axios.delete('/api/v1/auth/logout')
}
export const useAuth = () => useContext(AuthContext)
