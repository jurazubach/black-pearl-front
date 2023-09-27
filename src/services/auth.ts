import { httpPost } from './Http';

export interface IHttpPostSignInProps {
	email: string;
	password: string;
}

export const httpPostSignIn = (payload: IHttpPostSignInProps) => httpPost({
	url: '/api/auth/sign-in',
	data: payload,
});

export const httpPostLogout = () => httpPost({
	url: '/api/auth/logout',
});
