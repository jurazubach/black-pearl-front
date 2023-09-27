import { httpGet } from './Http';

export const httpGetProduct = (alias: string) => httpGet({ url: `/api/product/${alias}` });

export const httpGetSimilarProducts = (alias: string) => httpGet({ url: `/api/product/home/popular` });
