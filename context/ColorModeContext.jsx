import React, { createContext, useContext, useState } from "react";

const ColorModeContext = createContext();

export const ColorModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ColorModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  return useContext(ColorModeContext);
};
