import React, { useState } from 'react';
import AppContext from './appContext';
import {v4 as uuidv4} from 'uuid'

const AppProvider = ({ children }) => {
  const initialUUID = uuidv4()
  const [sharedData, setSharedData] = useState({})
  
  return (
    <AppContext.Provider value={{sharedData, setSharedData}}>
      {children}
    </AppContext.Provider>
  )
};

export default AppProvider;
