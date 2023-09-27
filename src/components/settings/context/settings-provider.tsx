'use client';

import { SettingsValueProps } from '../types';
import { SettingsContext } from './settings-context';

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  return <SettingsContext.Provider value={defaultSettings}>{children}</SettingsContext.Provider>;
}
