import { httpPost } from './Http';

export interface IHttpPostSearchProps {
	text: string;
}

export const httpPostSearch = (payload: IHttpPostSearchProps) => httpPost({
	url: '/api/search',
	data: payload,
});
