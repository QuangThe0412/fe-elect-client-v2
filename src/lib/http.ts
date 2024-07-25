import { isServer, tryGetAccessToken } from "./utils";
import { NextResponse } from "next/server";
import { paths } from "./paths";

type CustomOptions = RequestInit & { baseUrl?: string | undefined };
type CustomOptionsWithoutBody = Omit<CustomOptions, 'body'> | undefined;

export type ResponsePayloadType<T = any> = {
  status: number;
  payload: {
    code: string;
    mess: string;
    data: any | T;
  }
}

const request = async <ResponsePayloadType>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions,
): Promise<ResponsePayloadType> => {
  try {
    const body = options?.body ? JSON.stringify(options.body) : undefined;
    const baseHeaders = {
      'Content-Type': 'application/json',
    };
    const baseUrl = options?.baseUrl === undefined ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_DOMAIN;
    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `/${baseUrl}${url}`;
    const res = await fetch(fullUrl, {
      ...options,
      headers: {
        ...baseHeaders,
        ...options?.headers,
      },
      body,
      method,
    });
    const { ok, status, redirected, statusText } = res as NextResponse;
    if (!ok) {
      if (status === 401) {
        let resultTry = await tryGetAccessToken();
        if (!resultTry) {
          throw new Error(JSON.stringify({ status, code: 'Error', mess: 'Not Authorize', data: null }));
        } else {
          return request(method, url, options);
        }
      }
    }

    const payload = await res.json();
    const data = {
      status,
      payload
    }
    return data as ResponsePayloadType;
  } catch (error: any) {
    console.log({ error });
    const errorJson = JSON.parse(error.message);
    if (errorJson.status === 401) {
      if (isServer()) {
        return new Response(JSON.stringify({ code: 'Error', mess: 'Not Authorize', data: null }), { status: 401 }) as any;
      } else {
        window.location.href = paths.login;
      }
    }
    return Promise.reject(error);
  }
}

const http = {
  get: <ResponsePayloadType>(url: string, options?: CustomOptionsWithoutBody) => request<ResponsePayloadType>('GET', url, options),
  post: <ResponsePayloadType>(url: string, body: any, options?: CustomOptionsWithoutBody) => request<ResponsePayloadType>('POST', url, { ...options, body }),
  put: <ResponsePayloadType>(url: string, body: any, options?: CustomOptionsWithoutBody) => request<ResponsePayloadType>('PUT', url, { ...options, body }),
  delete: <ResponsePayloadType>(url: string, body: any, options?: CustomOptionsWithoutBody) => request<ResponsePayloadType>('DELETE', url, { ...options, body }),
}

export default http;