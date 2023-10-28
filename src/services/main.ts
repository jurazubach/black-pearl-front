import { httpGet } from './Http';

export const httpGetCategoryMenu = () => httpGet({ url: `/api/category/menu` });
