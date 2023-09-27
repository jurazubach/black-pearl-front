import { httpGet } from '../Http';

export const httpGetUser = (options = {}) => httpGet({ url: '/api/user/me', options });