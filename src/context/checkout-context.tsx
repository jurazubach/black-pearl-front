'use client'

import React, { createContext, useState, useMemo, useEffect, useLayoutEffect, useCallback } from 'react';
import _round from 'lodash/round';

export interface ICheckoutProduct {
  productId: number;
  imageSrc: string;
  title: string;
  size: string;
  price: number;
  oldPrice: number;
  quantity: number;
}

const defaultList: ICheckoutProduct[] = [];
const initialState = {
  open: false,
  checkoutProducts: defaultList,
  addProduct: (_checkoutProduct: ICheckoutProduct) => {},
  removeProduct: (_productId: number, _size: string) => {},
  incrementProduct: (_productId: number, _size: string) => {},
  decrementProduct: (_productId: number, _size: string) => {},
  onClear: () => {},
  openToggle: () => {},
};

const CheckoutContext = createContext(initialState);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function CheckoutProvider({ children }: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [checkoutProducts, setCheckoutProducts] = useState<ICheckoutProduct[]>([]);

  const syncWithSessionStorage = useCallback((nextCheckoutProducts: ICheckoutProduct[]) => {
    if (!!window && window.sessionStorage) {
      window.sessionStorage.setItem('checkout', JSON.stringify(nextCheckoutProducts));
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!!window && window.sessionStorage) {
      const checkout = window.sessionStorage.getItem('checkout');
      if (checkout) {
        setCheckoutProducts(JSON.parse(checkout));
      }
    }
  }, []);

  const openToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, [setOpen]);

  const removeProduct = useCallback((productId: number, size: string) => {
    const nextCheckoutProducts = checkoutProducts.filter((i) => !(i.productId === productId && i.size === size));

    setCheckoutProducts(nextCheckoutProducts);
    syncWithSessionStorage(nextCheckoutProducts);
  }, [checkoutProducts, setCheckoutProducts, syncWithSessionStorage]);

  const onClear = useCallback(() => {
    setCheckoutProducts([]);
    syncWithSessionStorage([]);
  }, [setCheckoutProducts, syncWithSessionStorage]);

  const incrementProduct = useCallback((productId: number, size: string) => {
    const existProductIndex = checkoutProducts.findIndex((i) => i.productId === productId && i.size === size);
    if (existProductIndex !== -1) {
      const nextCheckoutProducts = [...checkoutProducts];
      nextCheckoutProducts[existProductIndex].quantity = _round(nextCheckoutProducts[existProductIndex].quantity + 1);

      setCheckoutProducts(nextCheckoutProducts);
      syncWithSessionStorage(nextCheckoutProducts);
    }
  }, [checkoutProducts, setCheckoutProducts, syncWithSessionStorage]);

  const decrementProduct = useCallback((productId: number, size: string) => {
    const existProductIndex = checkoutProducts.findIndex((i) => i.productId === productId && i.size === size);
    if (checkoutProducts[existProductIndex].quantity > 1) {
      const nextCheckoutProducts = [...checkoutProducts];
      nextCheckoutProducts[existProductIndex].quantity = _round(nextCheckoutProducts[existProductIndex].quantity - 1);

      setCheckoutProducts(nextCheckoutProducts);
      syncWithSessionStorage(nextCheckoutProducts);
    } else {
      removeProduct(productId, size);
    }
  }, [checkoutProducts, setCheckoutProducts, removeProduct, syncWithSessionStorage]);

  const addProduct = useCallback((checkoutProduct: ICheckoutProduct) => {
    const existProductIndex = checkoutProducts.findIndex((i) => i.productId === checkoutProduct.productId && i.size === checkoutProduct.size);
    if (existProductIndex !== -1) {
      const nextCheckoutProducts = [...checkoutProducts];
      nextCheckoutProducts[existProductIndex].quantity = _round(nextCheckoutProducts[existProductIndex].quantity + 1);

      setCheckoutProducts(nextCheckoutProducts);
      syncWithSessionStorage(nextCheckoutProducts);
    } else {
      const nextCheckoutProducts = [...checkoutProducts, checkoutProduct];

      setCheckoutProducts(nextCheckoutProducts);
      syncWithSessionStorage(nextCheckoutProducts);
    }
  }, [checkoutProducts, setCheckoutProducts, syncWithSessionStorage]);

  const providerValue = useMemo(() => ({ open, openToggle, checkoutProducts, incrementProduct, decrementProduct, addProduct, removeProduct, onClear }), [open, openToggle, checkoutProducts, incrementProduct, decrementProduct, addProduct, removeProduct, onClear]);

  return (
    <CheckoutContext.Provider
      value={providerValue}>
      {children}
    </CheckoutContext.Provider>
  );
}

export { CheckoutProvider, CheckoutContext };
