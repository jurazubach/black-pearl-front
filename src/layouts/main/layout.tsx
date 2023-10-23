'use client';

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import GdprAlert, { GDPR_DEFAULT_FLAG, GDPR_STORAGE_FLAG_KEY, GDPR_STORAGE_KEY } from 'src/components/gdpr-alert';
import useDialog from 'src/hooks/use-dialog';
import { DialogIds } from 'src/context/dialog-context';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { DISCOUNT_DEFAULT_FLAG, DISCOUNT_STORAGE_FLAG_KEY, DISCOUNT_STORAGE_KEY } from 'src/dialogs/discount-dialog';

import Footer from './footer';
import Header from './header';
import HeaderMobile from './header-mobile';
import { HEADER_MAIN } from '../config-layout';

type Props = {
  children: React.ReactNode;
};

let expiredTimer: any;

export default function MainLayout({ children }: Props) {
  const { openDialog } = useDialog();
  const gdprStorage = useLocalStorage(GDPR_STORAGE_KEY, GDPR_DEFAULT_FLAG);
  const discountStorage = useLocalStorage(DISCOUNT_STORAGE_KEY, DISCOUNT_DEFAULT_FLAG);

  useEffect(() => {
    clearTimeout(expiredTimer);

    const isGdprAccepted = !!gdprStorage.state && gdprStorage.state[GDPR_STORAGE_FLAG_KEY];
    const isShowDiscountModal = !discountStorage.state || (!!discountStorage.state && !discountStorage.state[DISCOUNT_STORAGE_FLAG_KEY]);

    if (isGdprAccepted && isShowDiscountModal && !expiredTimer) {
      expiredTimer = setTimeout(() => openDialog({ id: DialogIds.DISCOUNT_DIALOG }), 2000);
    }
  }, [openDialog, gdprStorage, discountStorage]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <GdprAlert />

      <Header />
      <HeaderMobile />

      <Box component="main" sx={{
        flexGrow: 1,
        paddingTop: { xs: `${HEADER_MAIN.H_MOBILE}px`, md: `${HEADER_MAIN.H_DESKTOP}px` },
      }}>
        {children}
      </Box>

      <Footer />
    </Box>
  );
}
