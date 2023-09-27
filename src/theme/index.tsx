'use client';

import merge from 'lodash/merge';
import { useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider, ThemeOptions } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import { useLocales } from 'src/locales';
import { SettingsProvider, SettingsValueProps } from 'src/components/settings';
import breakpoints from './breakpoints';
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import { customShadows } from './custom-shadows';
import { componentsOverrides } from './overrides';
import { presets } from './options/presets';
import { darkMode } from './options/dark-mode';
import { contrast } from './options/contrast';
import RTL, { direction } from './options/right-to-left';
import NextAppDirEmotionCacheProvider from './next-emotion-cache';

type Props = {
  children: React.ReactNode;
};

const adminTheme = {
  themeMode: 'light', // 'light' | 'dark'
  themeDirection: 'ltr', //  'rtl' | 'ltr'
  themeContrast: 'default', // 'default' | 'bold'
  themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
  themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
  themeStretch: false,
} as SettingsValueProps;

const shopTheme = {
  themeMode: 'dark', // 'light' | 'dark'
  themeDirection: 'ltr', //  'rtl' | 'ltr'
  themeContrast: 'default', // 'default' | 'bold'
  themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
  themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
  themeStretch: false,
} as SettingsValueProps;

export default function ThemeProvider({ children }: Props) {
  const { currentLang } = useLocales();
  const pathname = usePathname();
  const isAdmin = String(pathname).includes('/admin') || String(pathname).includes('/auth');
  const themeSettings = useMemo(() => isAdmin ? adminTheme : shopTheme, [isAdmin]);

  const darkModeOption = darkMode(themeSettings.themeMode);
  const presetsOption = presets(themeSettings.themeColorPresets);
  const contrastOption = contrast(themeSettings.themeContrast === 'bold', themeSettings.themeMode);
  const directionOption = direction(themeSettings.themeDirection);
  const baseOption = useMemo(
    () => ({
      breakpoints,
      palette: palette('dark'),
      shadows: shadows('dark'),
      customShadows: customShadows('dark'),
      typography,
      shape: { borderRadius: isAdmin ? 8 : 0 },
    }),
    [isAdmin]
  );

  const memoizedValue = useMemo(
    () =>
      merge(
        // Base
        baseOption,
        // Direction: remove if not in use
        directionOption,
        // Dark mode: remove if not in use
        darkModeOption,
        // Presets: remove if not in use
        presetsOption,
        // Contrast: remove if not in use
        contrastOption.theme
      ),
    [baseOption, directionOption, darkModeOption, presetsOption, contrastOption.theme]
  );

  const theme = createTheme(memoizedValue as ThemeOptions);

  theme.components = merge(componentsOverrides(theme), contrastOption.components);

  const themeWithLocale = useMemo(
    () => createTheme(theme, currentLang.systemValue),
    [currentLang.systemValue, theme]
  );

  return (
    <SettingsProvider defaultSettings={themeSettings}>
      <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
        <MuiThemeProvider theme={themeWithLocale}>
          <RTL themeDirection={themeSettings.themeDirection}>
            <CssBaseline />
            {children}
          </RTL>
        </MuiThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </SettingsProvider>
  );
}
