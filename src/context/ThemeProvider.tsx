import React, { Component, useContext, useState } from 'react';

const ThemeContext = React.createContext('dark');

const useThemeContext = () => useContext(ThemeContext)

const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('dark')

  const changeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  const value = {theme, changeTheme}

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider ,useThemeContext }