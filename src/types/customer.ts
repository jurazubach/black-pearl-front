export type ICustomerTableFilterValue = string;

export type ICustomerTableFilters = {
  search: string;
};

export type ICustomerItem = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  region: string;
  createdAt: string;
};
