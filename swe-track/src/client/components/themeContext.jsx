import React from 'react'

export const ThemeContext = React.createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState('light')

  const rawSetTheme = theme => {
    const root = window.document.documentElement
    const isDark = theme === 'dark'

    root.classList.remove(isDark ? 'light' : 'dark')
    root.classList.add(theme)
  }

  React.useEffect(
    _ => {
      rawSetTheme(theme)
    },
    [theme]
  )

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
