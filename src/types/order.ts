export type IOrderTableFilterValue = string | Date | null | string[];

export type IOrderTableFilters = {
  search: string;
  payment: string[];
  paymentType: string[];
  status: string;
};

export interface IPostAddress {
  type: string; // тип почти
  number: string; // номер заказа
  city: string;
  region: string;
  address: string;
}

export type IOrderItem = {
  id: string;
  number: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  post: IPostAddress;
  coupon: boolean;
  payment: string;
  paymentType: string;
  status: string;
  createdAt: string;
};
