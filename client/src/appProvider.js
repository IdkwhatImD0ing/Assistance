import React, { useState } from 'react';
import AppContext from './appContext';

const AppProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState({})
  
  return (
    <AppContext.Provider value={{sharedData, setSharedData}}>
      {children}
    </AppContext.Provider>
  )
};

export default AppProvider;
