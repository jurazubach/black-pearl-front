import { useState } from 'react';
// import { checkCoupon } from '../bundles/Coupon/models/services/CouponClient';

export interface IFormCoupon {
  discountType: string,
  discount: number,
  endAt: string,
}

const checkCoupon = (_data: any) => Promise.resolve({ data: { discountType: '', discount: 0, endAt: '' } });

export default () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [promocode, setPromocode] = useState<string>('');
  const [coupon, setCoupon] = useState<IFormCoupon | null>(null);
  const [error, setError] = useState<string>('');

  const onCheckCoupon = () => {
    setIsLoading(true);
    setCoupon(null);
    setError('');

    return checkCoupon(promocode)
      .then((couponInfo) => {
        setCoupon(couponInfo.data as any);

        return promocode;
      })
      .catch((e: { message: string }) => {
        if (e.message === 'Coupon is already used') {
          return setError('Промокод вже був використанний');
        }
        if (e.message === 'Coupon is expired') {
          return setError('Промокод не є дійсним');
        }

        return setError('Промокод не знайденно');
      })
      .finally(() => setIsLoading(false));
  }

  const onReset = () => {
    setPromocode('');
    setCoupon(null);
    setError('');
    setIsLoading(false);
  }

  return {
    isLoading,
    promocode,
    coupon,
    error,
    onPromocodeChange: setPromocode,
    onCheckCoupon,
    onReset,
  };
}
