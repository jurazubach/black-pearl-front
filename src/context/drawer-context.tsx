'use client'

import React, { createContext, useState, useCallback, useMemo } from 'react';
import Drawer from '@mui/material/Drawer';

interface IOpenDrawerParamsProps {
  id: string,
  width?: string,
}

const initialState = {
  isOpen: false,
  openDrawer: (_params: IOpenDrawerParamsProps, _options?: any) => {},
  closeDrawer: () => {},
};

const DrawerContext = createContext(initialState);

export const DrawerIds = {
};

const getDrawerContentById = (drawerId: string): any => {
  const drawers = {
    // [DrawerIds.UPDATE_USER_PASSWORD]: UpdateUserPasswordDrawer,
  } as any;

  return drawers[drawerId] || null;
};

function DrawerProvider({ children }: any) {
  const [isOpen, setOpen] = useState(false);
  const [drawerId, setDrawerId] = useState('');
  const [drawerWidth, setDrawerWidth] = useState('');
  const [drawerOptions, setDrawerOptions] = useState({});

  const openDrawer = useCallback((params: IOpenDrawerParamsProps, options = {}) => {
    const { id, width = '400px' } = params;
    setDrawerId(id);
    setDrawerWidth(width);
    setDrawerOptions(options);
    setOpen(true);
  }, [setDrawerId, setDrawerWidth, setDrawerOptions, setOpen]);

  const closeDrawer = useCallback(() => {
    setDrawerId('');
    setDrawerWidth('400px');
    setDrawerOptions({});
    setOpen(false);
  }, [setDrawerId, setDrawerWidth, setDrawerOptions, setOpen]);

  const DrawerContentComponent = getDrawerContentById(drawerId);

  const providerValue = useMemo(() => ({ isOpen, openDrawer, closeDrawer }), [isOpen, openDrawer, closeDrawer]);

  return (
    <DrawerContext.Provider value={providerValue}>
      {children}

      <Drawer
        anchor='right'
        open={isOpen}
        onClose={closeDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px',
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {DrawerContentComponent && isOpen && (
          <DrawerContentComponent closeDrawer={closeDrawer} {...drawerOptions} />
        )}
      </Drawer>
    </DrawerContext.Provider>
  );
}

export { DrawerProvider, DrawerContext };
