import React, { Component, useContext, useState } from "react";

const ThemeContext = React.createContext("dark");

const useThemeContext = () => useContext(ThemeContext);

interface Props {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState("dark" as string);

  const changeTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  const value = { theme, changeTheme };

  return (
    <ThemeContext.Provider value={value as any}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider, useThemeContext };
