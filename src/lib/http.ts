import authApiRequest from "@/apiRequests/auth";

type CustomOptions = RequestInit & { baseUrl?: string | undefined };
type CustomOptionsWithoutBody = Omit<CustomOptions, 'body'> | undefined;

export type ResponsePayloadType = {
  code: string;
  mess: string;
  data: any;
}

type EntityErrorPayload = {
  mess: string
  errors: {
    field: string
    mess: string
  }[]
}

class HttpError extends Error {
  status: number;
  payload: any;
  constructor({ status, payload }: { status: number, payload: any }) {
    super('Http Error');
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: 422
  payload: EntityErrorPayload
  constructor({ status, payload }: { status: 422, payload: EntityErrorPayload }) {
    super({ status, payload })
    this.status = status
    this.payload = payload
  }
}

const request = async<Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions,
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeaders = {
    'Content-Type': 'application/json',
  };

  //Nếu không truyền baseUrl thì lấy từ biến môi trường
  //Nếu không truyền baseUrl = '' thì gọi API của nextjs
  const baseUrl = options?.baseUrl === undefined ? process.env.NEXT_PUBLIC_API_URL : options.baseUrl;
  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `/${baseUrl}${url}`

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });
  
  const payload: Response = await res?.json();
  const _payload = payload as ResponsePayloadType;
  const data = {
    status: res.status,
    payload: _payload
  }
  if (!res.ok) {
    throw new HttpError(data);
  }
  return data;
}

const http = {
  get: <Response>(url: string, options?: CustomOptionsWithoutBody) => request<Response>('GET', url, options),
  post: <Response>(url: string, body: any, options?: CustomOptionsWithoutBody) => request<Response>('POST', url, { ...options, body }),
  put: <Response>(url: string, body: any, options?: CustomOptionsWithoutBody) => request<Response>('PUT', url, { ...options, body }),
  delete: <Response>(url: string, body: any, options?: CustomOptionsWithoutBody) => request<Response>('DELETE', url, { ...options, body }),
}

export default http;