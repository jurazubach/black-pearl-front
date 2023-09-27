'use client'

import React, { createContext, useState, useCallback, useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import { DeleteAlertDialog, DiscountDialog, InformProductAvailableDialog } from 'src/dialogs';

interface IOpenDialogParamsProps {
  id: string,
  width?: string,
}

const initialState = {
  isOpen: false,
  openDialog: (_params: IOpenDialogParamsProps, _options?: any) => {},
  closeDialog: () => {},
};

const DialogContext = createContext(initialState);

export const DialogIds = {
  DELETE_ALERT: 'deleteAlertDialog',
  DISCOUNT_DIALOG: 'discountDialog',
  INFORM_PRODUCT_AVAILABLE_DIALOG: 'informProductAvailableDialog',
};

const getDialogContentById = (dialogId: string): any => {
  const dialogs = {
    [DialogIds.DELETE_ALERT]: DeleteAlertDialog,
    [DialogIds.DISCOUNT_DIALOG]: DiscountDialog,
    [DialogIds.INFORM_PRODUCT_AVAILABLE_DIALOG]: InformProductAvailableDialog,
  };

  return dialogs[dialogId] || null;
};

function DialogProvider({ children }: any) {
  const [isOpen, setOpen] = useState(false);
  const [dialogId, setDialogId] = useState('');
  const [dialogOptions, setDialogOptions] = useState({});

  const openDialog = useCallback((params: IOpenDialogParamsProps, options = {}) => {
    const { id } = params;
    setDialogId(id);
    setDialogOptions(options);
    setOpen(true);
  }, [setDialogId, setDialogOptions, setOpen]);

  const closeDialog = useCallback(() => {
    setDialogId('');
    setDialogOptions({});
    setOpen(false);
  }, [setDialogId, setDialogOptions, setOpen]);

  const DialogContentComponent = getDialogContentById(dialogId);

  const providerValue = useMemo(() => ({ isOpen, openDialog, closeDialog }), [isOpen, openDialog, closeDialog]);

  return (
    <DialogContext.Provider value={providerValue}>
      {children}

      <Dialog open={isOpen} onClose={closeDialog}>
        {DialogContentComponent && isOpen && (
          <DialogContentComponent closeDialog={closeDialog} {...dialogOptions} />
        )}
      </Dialog>
    </DialogContext.Provider>
  );
}

export { DialogProvider, DialogContext };
