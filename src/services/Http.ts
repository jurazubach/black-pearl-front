import _get from 'lodash/get';

const REACT_APP_API_HOST = 'https://api.black-pearl.local';
const REACT_APP_API_PORT = '8888';

export const baseURL = `${REACT_APP_API_HOST}:${REACT_APP_API_PORT}`;

const onSuccess = async (response: Response) => {
  if (typeof window !== 'undefined') {
    console.log(`%c√ ${response.url}`, 'color: green');
  }
  const parsedResponse = await response.json();

  return _get(parsedResponse, 'data');
};

const onError = async (response: Response) => {
  const errorResponse = await response.json();
  const errorMessage = _get(errorResponse, 'message', 'Network Error');
  const errorCode = _get(errorResponse, 'statusCode', 400);
  console.log(`%c× ${response.url}: [${errorCode}]${errorMessage}`, 'color: red');

  throw new Error(errorMessage);
};

const handleResponse = (response: Response) => response.ok ? onSuccess(response) : onError(response)

const getBaseHeaders = (headers = {}) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  ...headers,
});

const getAbsoluteUrl = (path: string) => `${baseURL}${path}`;

const httpGet = async ({ url, options }: { url: string, options?: any }) => {
  const { headers = {}, ...restOptions } = options || {};

  const response = await fetch(getAbsoluteUrl(url), {
    method: "GET",
    credentials: "include",
    headers: getBaseHeaders(headers),
    ...restOptions,
  });

  return handleResponse(response);
};

const httpPost = async ({ url, data, options }: { url: string, data?: any, options?: any }) => {
  const { headers = {}, ...restOptions } = options || {};

  const response = await fetch(getAbsoluteUrl(url), {
    method: "POST",
    credentials: "include",
    headers: getBaseHeaders(headers),
    body: JSON.stringify(data), // body data type must match "Content-Type" header
    ...restOptions,
  });

  return handleResponse(response);
};

const httpPut = async ({ url, data, options }: { url: string, data: any, options?: any }) => {
  const { headers = {}, ...restOptions } = options || {};

  const response = await fetch(getAbsoluteUrl(url), {
    method: "PUT",
    credentials: "include",
    headers: getBaseHeaders(headers),
    body: JSON.stringify(data), // body data type must match "Content-Type" header
    ...restOptions,
  });

  return handleResponse(response);
}

const httpPatch = async ({ url, data, options }: { url: string, data: any, options?: any }) => {
  const { headers = {}, ...restOptions } = options || {};

  const response = await fetch(getAbsoluteUrl(url), {
    method: "PATCH",
    credentials: "include",
    headers: getBaseHeaders(headers),
    body: JSON.stringify(data), // body data type must match "Content-Type" header
    ...restOptions,
  });

  return handleResponse(response);
};

const httpDelete = async ({ url, options }: { url: string, options?: any }) => {
  const { headers = {}, ...restOptions } = options || {};

  const response = await fetch(getAbsoluteUrl(url), {
    method: "DELETE",
    credentials: "include",
    headers: getBaseHeaders(headers),
    ...restOptions,
  });

  return handleResponse(response);
};

export {
  httpGet,
  httpPost,
  httpPut,
  httpPatch,
  httpDelete,
};