import qs from 'querystring';
import { httpGet } from '../Http';

export const httpBannerList = (page: number, filters: any) => httpGet({
  url: `/api/banner/list?${qs.stringify({ page, filters: JSON.stringify(filters) })}`,
});

export const httpGetBanner = (uid: number) => httpGet({ url: `/api/banner/${uid}` });
