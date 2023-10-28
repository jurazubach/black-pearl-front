import { httpGet } from './Http';

export const httpGetCategoryFilters = (alias: string) => httpGet({ url: `/api/filter/list/category/${alias}` });
