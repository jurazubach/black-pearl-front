export type ICouponTableFilterValue = string | Date | null | string[];

export enum ECouponType {
  SINGLE = 'single',
  MULTIPLE = 'multiple',
}

export type TCouponType = ECouponType.SINGLE | ECouponType.MULTIPLE;

export enum ECouponDiscountType {
  PERCENT = 'percent',
  PRICE = 'price',
}

export const DISCOUNT_TYPE_OPTIONS = [
  { value: ECouponDiscountType.PERCENT, label: 'Процентна' },
  { value: ECouponDiscountType.PRICE, label: 'Фіксована' },
];

export const TYPE_OPTIONS = [
  { value: 'all', label: 'Всі' },
  { value: ECouponType.SINGLE, label: 'Одноразовий' },
  { value: ECouponType.MULTIPLE, label: 'Багаторазовий' },
];

export type TCouponDiscountType = ECouponDiscountType.PERCENT | ECouponDiscountType.PRICE;

export type ICouponTableFilters = {
  search: string;
  discountType: TCouponDiscountType[];
  type: TCouponType | 'all';
};

export type ICouponItem = {
  id: string;
  type: ECouponType;
  code: string;
  discountType: ECouponDiscountType;
  discount: string;
  startAt: string;
  endAt: string;
  createdAt: string;
};
