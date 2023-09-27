'use client';

import { createContext, useContext } from 'react';
import { SettingsValueProps } from '../types';

export const SettingsContext = createContext({} as SettingsValueProps);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context) throw new Error('useSettingsContext must be use inside SettingsProvider');

  return context;
};
