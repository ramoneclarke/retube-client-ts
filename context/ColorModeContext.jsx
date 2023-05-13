import React, { createContext, useContext, useEffect, useState } from "react";

const ColorModeContext = createContext();

export const ColorModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    const nextColorMode = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    window.localStorage.setItem("colorMode", nextColorMode);
  };

  useEffect(() => {
    const localColorMode = window.localStorage.getItem("colorMode");
    if (localColorMode) {
      const nextMode = localColorMode === "light" ? false : true;
      setDarkMode(nextMode);
    }
  }, []);

  return (
    <ColorModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  return useContext(ColorModeContext);
};
