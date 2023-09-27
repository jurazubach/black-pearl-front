'use client';

import merge from 'lodash/merge';
import { enUS as enUSAdapter, uk as ukUAAdapter } from 'date-fns/locale';
// core
import { enUS as enUSCore, ukUA as ukUACore } from '@mui/material/locale';
// date-pickers
import { enUS as enUSDate, ukUA as ukUADate } from '@mui/x-date-pickers/locales';
// data-grid
import { enUS as enUSDataGrid, ukUA as ukUADataGrid } from '@mui/x-data-grid';

export const allLangs = [
  {
    label: 'Українська',
    value: 'uk',
    systemValue: merge(ukUADate, ukUADataGrid, ukUACore),
    adapterLocale: ukUAAdapter,
    icon: 'flagpack:uk',
  },
  {
    label: 'English',
    value: 'en',
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
  },
];

export const defaultLang = allLangs[0]; // Ukraine
