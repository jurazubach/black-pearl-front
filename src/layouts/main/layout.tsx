'use client';

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import GdprAlert, { GDPR_DEFAULT_FLAG, GDPR_STORAGE_FLAG_KEY, GDPR_STORAGE_KEY } from 'src/components/gdpr-alert';
import useDialog from 'src/hooks/use-dialog';
import { DialogIds } from 'src/context/dialog-context';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { DISCOUNT_DEFAULT_FLAG, DISCOUNT_STORAGE_FLAG_KEY, DISCOUNT_STORAGE_KEY } from 'src/dialogs/discount-dialog';
import { usePathname } from 'src/routes/hooks';
import { httpGetCategoryMenu } from 'src/services/main';

import Footer from './footer';
import Header from './header';
import { HEADER_MAIN } from '../config-layout';
import { IMenuItem } from '../../types/main';
import { PATH_PAGE } from '../../routes/paths';

type Props = {
	children: React.ReactNode;
};

let expiredTimer: any;

export default ({ children }: Props) => {
	const pathname = usePathname();
	const [menuItems, setMenuItems] = useState<IMenuItem[]>([]);
	const [activeMenuIdx, setActiveMenuIdx] = React.useState<number | null>(null);

	const { openDialog } = useDialog();
	const gdprStorage = useLocalStorage(GDPR_STORAGE_KEY, GDPR_DEFAULT_FLAG);
	const discountStorage = useLocalStorage(DISCOUNT_STORAGE_KEY, DISCOUNT_DEFAULT_FLAG);

	useEffect(() => {
		const [route, categoryAlias] = pathname.split('/').filter((i) => i);
		const existCategoryAliasIdx = menuItems.findIndex((i) => i.alias === categoryAlias);

		if (PATH_PAGE.catalog.includes(route) && existCategoryAliasIdx !== -1) {
			setActiveMenuIdx(existCategoryAliasIdx);
		} else {
			setActiveMenuIdx(null);
		}
	}, [pathname, menuItems]);

	useEffect(() => {
		const requestCategoryMenu = async () => {
			try {
				const responseMenuItems = await httpGetCategoryMenu();

				setMenuItems(responseMenuItems);
			} catch (err) {
				setMenuItems([]);
			}
		}

		requestCategoryMenu();
	}, []);

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

      <Header menuItems={menuItems} activeMenuIdx={activeMenuIdx} />

      <Box component="main" sx={{
        flexGrow: 1,
	      transition: 'all 0.2s ease-in',
        paddingTop: { xs: `${HEADER_MAIN.H_MOBILE}px`, md: `${HEADER_MAIN.H_DESKTOP}px` },
      }}>
        {children}
      </Box>

      <Footer menuItems={menuItems} />
    </Box>
  );
}
