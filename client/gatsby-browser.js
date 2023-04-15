import React from 'react';
import AppProvider from './src/appProvider';
import './src/global.css';

export const wrapRootElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>;
};
