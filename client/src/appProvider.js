import React, { useState } from 'react';
import AppContext from './appContext';

const AppProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState({})
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  return (
    <AppContext.Provider value={{sharedData, setSharedData, isDarkMode, setIsDarkMode}}>
      {children}
    </AppContext.Provider>
  )
};

export default AppProvider;
