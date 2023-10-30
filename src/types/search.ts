import { IProductItem } from './product';

export interface IResultItem extends Pick<IProductItem, 'alias' | 'code' | 'title'> {}