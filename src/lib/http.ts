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

const request = async<Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions,
) => {
  try {
    const body = options?.body ? JSON.stringify(options.body) : undefined;
    const baseHeaders = {
      'Content-Type': 'application/json',
    };
    //Nếu không truyền baseUrl thì là gọi ServerBackEnd
    //Nếu truyền baseUrl = '' thì gọi API của nextjs
    const baseUrl = options?.baseUrl === undefined ? process.env.NEXT_PUBLIC_API_URL : 'http://localhost:4005';
    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `/${baseUrl}${url}`
    // console.log(options?.headers);
    // console.log({ fullUrl });
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
    const data = {
      status: res.status,
      payload
    }
    if (!res.ok) {
      return Promise.reject(data);
    }
    return data;
  }
  catch (error: any) {
    console.log({ error })
    return Promise.reject(error);
  }
}

const http = {
  get: <Response>(url: string, options?: CustomOptionsWithoutBody) => request<Response>('GET', url, options),
  post: <Response>(url: string, body: any, options?: CustomOptionsWithoutBody) => request<Response>('POST', url, { ...options, body }),
  put: <Response>(url: string, body: any, options?: CustomOptionsWithoutBody) => request<Response>('PUT', url, { ...options, body }),
  delete: <Response>(url: string, body: any, options?: CustomOptionsWithoutBody) => request<Response>('DELETE', url, { ...options, body }),
}

export default http;