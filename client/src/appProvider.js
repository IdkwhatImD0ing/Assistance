import React, { useState } from 'react';
import AppContext from './appContext';
import {v4 as uuidv4} from 'uuid'

const AppProvider = ({ children }) => {
  const initialUUID = uuidv4()
  const [sharedData, setSharedData] = useState({
    selectedConversation: initialUUID,
    [initialUUID]: {
      editable: true,
      selectedLLM: 'all',
      conversation: [],
    },
  })

  const resetSharedData = () => {
    setSharedData({
      selectedConversation: initialUUID,
      [initialUUID]: {
        editable: true,
        selectedLLM: 'all',
        conversation: [],
      },
    })
  }

  return (
    <AppContext.Provider value={{ sharedData, setSharedData, resetSharedData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
