export enum WAREHOUSE_PRODUCT_SIZE {
  XS = 'XS',
  XS_S = 'XS-S',
  S = 'S',
  S_M = 'S-M',
  M = 'M',
  M_L = 'M-L',
  L = 'L',
  L_XL = 'L-XL',
  XL = 'XL',
  XL_XXL = 'XL-XXL',
  XXL = 'XXL',
  XXXL = 'XXXL',
}

export type TWarehouseProductSize =
  | WAREHOUSE_PRODUCT_SIZE.XS
  | WAREHOUSE_PRODUCT_SIZE.XS_S
  | WAREHOUSE_PRODUCT_SIZE.S
  | WAREHOUSE_PRODUCT_SIZE.S_M
  | WAREHOUSE_PRODUCT_SIZE.M
  | WAREHOUSE_PRODUCT_SIZE.M_L
  | WAREHOUSE_PRODUCT_SIZE.L
  | WAREHOUSE_PRODUCT_SIZE.L_XL
  | WAREHOUSE_PRODUCT_SIZE.XL
  | WAREHOUSE_PRODUCT_SIZE.XL_XXL
  | WAREHOUSE_PRODUCT_SIZE.XXL
  | WAREHOUSE_PRODUCT_SIZE.XXXL;

export const SIZES_OPTIONS = Object.entries(WAREHOUSE_PRODUCT_SIZE)
  .map(([value, label]) => ({ value, label })) as unknown as { value: TWarehouseProductSize; label: string }[];

export type IWarehouseProductTableFilterValue = string | Date | null | string[];

export type IWarehouseProductTableFilters = {
  search: string;
  sizes: TWarehouseProductSize[];
};

export interface IWarehouseProductItemCatalog extends Pick<IWarehouseProductItem, 'id' | 'quantity' | 'price' | 'oldPrice' | 'size'>{}

export type IWarehouseProductItem = {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  costPrice: number;
  oldPrice: number;
  size: TWarehouseProductSize;
  lastUpdatedAt: string;
  createdAt: string;
};
