'use client';

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useResponsive } from 'src/hooks/use-responsive';
import GdprAlert, { GDPR_DEFAULT_FLAG, GDPR_STORAGE_FLAG_KEY, GDPR_STORAGE_KEY } from 'src/components/gdpr-alert';
import useDialog from 'src/hooks/use-dialog';
import { DialogIds } from 'src/context/dialog-context';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { DISCOUNT_DEFAULT_FLAG, DISCOUNT_STORAGE_FLAG_KEY, DISCOUNT_STORAGE_KEY } from 'src/dialogs/discount-dialog';

import Footer from './footer';
import Header from './header';
import HeaderMobile from './header-mobile';
import ChatFab from '../../components/chat-fab';

type Props = {
  children: React.ReactNode;
};

let expiredTimer: any;

export default function MainLayout({ children }: Props) {
  const smUp = useResponsive('up', 'sm');
  const { openDialog } = useDialog();
  const gdprStorage = useLocalStorage(GDPR_STORAGE_KEY, GDPR_DEFAULT_FLAG);
  const discountStorage = useLocalStorage(DISCOUNT_STORAGE_KEY, DISCOUNT_DEFAULT_FLAG);

  useEffect(() => {
    clearTimeout(expiredTimer);
    const isAvailableToShowDiscountDialog = !!gdprStorage.state && gdprStorage.state[GDPR_STORAGE_FLAG_KEY];
    const isShowDiscountDialog = !discountStorage.state || (!!discountStorage.state && !discountStorage.state[DISCOUNT_STORAGE_FLAG_KEY]);

    if (isAvailableToShowDiscountDialog && isShowDiscountDialog) {
      expiredTimer = setTimeout(() => openDialog({ id: DialogIds.DISCOUNT_DIALOG }), 5000);
    }
  }, [openDialog, gdprStorage, discountStorage]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <GdprAlert />
      <ChatFab />

      {smUp ? <Header /> : <HeaderMobile />}

      <Box component="main" sx={{ flexGrow: 1, paddingTop: { xs: '115px', sm: '140px' } }}>
        {children}
      </Box>

      <Footer />
    </Box>
  );
}
