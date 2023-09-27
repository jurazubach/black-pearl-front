import { httpGet } from './Http';

export const httpGetBannerHome = () => httpGet({ url: `/api/banner/home` });
export const httpGetProductPopularHome = () => httpGet({ url: `/api/product/home/popular` });
export const httpGetProductNoveltyHome = () => httpGet({ url: `/api/product/home/novelty` });
export const httpGetSocialInstagramHome = () => httpGet({ url: `/api/social/home/instagram` });
export const httpGetBlogHome = () => httpGet({ url: `/api/blog/home/latest` });
