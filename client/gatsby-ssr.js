import React from 'react';
import AppProvider from './src/appProvider';

export const wrapRootElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>;
};
