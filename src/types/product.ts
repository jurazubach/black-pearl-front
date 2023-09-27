import { ICategoryItem } from './category';
import { IWarehouseProductItemCatalog } from './warehouseProduct';

export type IProductTableFilterValue = string | Date | null | string[];

export enum EProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'in-active',
}

export type TProductStatus = EProductStatus.ACTIVE | EProductStatus.INACTIVE;

export const STATUS_OPTIONS = [
  { value: 'all', label: 'Всі' },
  { value: EProductStatus.ACTIVE, label: 'Активні' },
  { value: EProductStatus.INACTIVE, label: 'Виключені' },
];

export type IProductTableFilters = {
  search: string;
  status: TProductStatus | 'all';
};

export interface IProductItemCatalog extends Pick<IProductItem, 'id' | 'imageSrc' | 'alias' | 'title' | 'warehouseProducts'>{}

export type IProductItem = {
  id: number;
  imageSrc: string;
  category: ICategoryItem;
  code: string;
  alias: string;
  title: string;
  description: string;
  warehouseProducts: IWarehouseProductItemCatalog[];
  status: TProductStatus;
};
