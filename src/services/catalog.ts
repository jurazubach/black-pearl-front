import { httpGet } from './Http';
import { IFilterContainerOut, TSortPage } from '../utils/get-filter-container';

export const httpGetCategory = (alias: string) => httpGet({ url: `/api/category/${alias}` });

export const httpGetCatalogProducts = (page: number, sort: TSortPage, filters: IFilterContainerOut['list']) => httpGet({ url: `/api/catalog?page=${page}&sort=${sort}&filter=${JSON.stringify(filters)}` });
