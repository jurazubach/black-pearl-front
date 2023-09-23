import _round from 'lodash/round';
import { ICheckoutProduct } from '../context/checkout-context';
import { IFormCoupon } from '../hooks/use-form-coupon';

export const calculateTotalProductsInCheckout = (checkoutProducts: ICheckoutProduct[]) => {
  let count = 0;

  if (Array.isArray(checkoutProducts) && checkoutProducts.length) {
    checkoutProducts.forEach((checkoutProduct) => {
      count = _round(count + checkoutProduct.quantity);
    })
  }

  return count;
};

export const calculateTotalPrices = (checkoutProducts: ICheckoutProduct[], coupon?: IFormCoupon) => {
  let oldPrice = 0;
  let price = 0;
  let discount = 0;

  if (Array.isArray(checkoutProducts) && checkoutProducts.length) {
    checkoutProducts.forEach((checkoutProduct) => {
      oldPrice = _round((checkoutProduct.oldPrice * checkoutProduct.quantity) + oldPrice, 2);
      price = _round((checkoutProduct.price * checkoutProduct.quantity) + price, 2);
    })
  }

  if (coupon) {
    if (coupon.discountType === 'price') {
      const calculatedPrice = _round(price - Number(coupon.discount), 2);
      const calculatedOldPrice = _round(oldPrice + Number(coupon.discount), 2);

      price = calculatedPrice <= 0 ? 1 : calculatedPrice;
      oldPrice = calculatedOldPrice <= 0 ? 1 : calculatedOldPrice;
      discount = _round(coupon.discount, 2);
    }
    if (coupon.discountType === 'percent') {
      const calculateDiscount = _round((price * Number(coupon.discount)) / 100, 2);
      const calculatedPrice = _round(price - calculateDiscount, 2);
      const calculatedOldPrice = _round(oldPrice + calculateDiscount, 2);

      price = calculatedPrice <= 0 ? 1 : calculatedPrice;
      oldPrice = calculatedOldPrice <= 0 ? 1 : calculatedOldPrice;
      discount = calculateDiscount;
    }
  }

  return [oldPrice, price, discount];
}
