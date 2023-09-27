'use client'

import React, { createContext, useState, useCallback, useMemo } from 'react';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import {
  CouponDrawerForm,
  CustomersDrawerForm,
  PromotionsDrawerForm,
  BannersDrawerForm,
  SocialsDrawerForm,
  BlogDrawerForm,
  CategoriesDrawerForm,
  ProductsDrawerForm,
  LooksDrawerForm,
  WarehouseDrawerForm,
  OrderDrawerForm,
} from 'src/drawers';
import { paper } from 'src/theme/css';

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
  COUPON_DRAWER_FORM: 'couponDrawerForm',
  CUSTOMER_DRAWER_FORM: 'customerDrawerForm',
  PROMOTION_DRAWER_FORM: 'promotionDrawerForm',
  BANNER_DRAWER_FORM: 'bannerDrawerForm',
  SOCIAL_DRAWER_FORM: 'socialDrawerForm',
  BLOG_DRAWER_FORM: 'blogDrawerForm',
  CATEGORY_DRAWER_FORM: 'categoriesDrawerForm',
  PRODUCT_DRAWER_FORM: 'productsDrawerForm',
  WAREHOUSE_DRAWER_FORM: 'warehouseDrawerForm',
  LOOK_DRAWER_FORM: 'looksDrawerForm',
  ORDER_DRAWER_FORM: 'orderDrawerForm',
};

const getDrawerContentById = (drawerId: string): any => {
  const drawers = {
    [DrawerIds.COUPON_DRAWER_FORM]: CouponDrawerForm,
    [DrawerIds.CUSTOMER_DRAWER_FORM]: CustomersDrawerForm,
    [DrawerIds.PROMOTION_DRAWER_FORM]: PromotionsDrawerForm,
    [DrawerIds.BANNER_DRAWER_FORM]: BannersDrawerForm,
    [DrawerIds.SOCIAL_DRAWER_FORM]: SocialsDrawerForm,
    [DrawerIds.BLOG_DRAWER_FORM]: BlogDrawerForm,
    [DrawerIds.CATEGORY_DRAWER_FORM]: CategoriesDrawerForm,
    [DrawerIds.PRODUCT_DRAWER_FORM]: ProductsDrawerForm,
    [DrawerIds.LOOK_DRAWER_FORM]: LooksDrawerForm,
    [DrawerIds.WAREHOUSE_DRAWER_FORM]: WarehouseDrawerForm,
    [DrawerIds.ORDER_DRAWER_FORM]: OrderDrawerForm,
  } as any;

  return drawers[drawerId] || null;
};

function DrawerProvider({ children }: any) {
  const theme = useTheme();
  const [isOpen, setOpen] = useState(false);
  const [drawerId, setDrawerId] = useState('');
  const [drawerWidth, setDrawerWidth] = useState('');
  const [drawerOptions, setDrawerOptions] = useState({});

  const openDrawer = useCallback((params: IOpenDrawerParamsProps, options = {}) => {
    const { id, width = '540px' } = params;
    setDrawerId(id);
    setDrawerWidth(width);
    setDrawerOptions(options);
    setOpen(true);
  }, [setDrawerId, setDrawerWidth, setDrawerOptions, setOpen]);

  const closeDrawer = useCallback(() => {
    setDrawerId('');
    setDrawerWidth('540px');
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
          [`& .${drawerClasses.paper}`]: {
            ...paper({ theme, bgcolor: theme.palette.background.default }),
            borderLeft: { xs: 'none', sm: `1px solid ${theme.palette.divider}` },
            width: { xs: '100%', sm: drawerWidth },
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
