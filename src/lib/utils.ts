import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from '@/components/ui/use-toast'
import { UseFormSetError } from 'react-hook-form'
import jwt from 'jsonwebtoken'
import emptyImg from '../../public/emptyCard.png'
import { ResponsePayloadType } from "./http";
import authApiRequest from "@/apiRequests/auth"
import slugify from 'slugify';
import configEnv from "@/configEnv"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleErrorApi = ({ error, setError, duration }: {
  error: any, setError?: UseFormSetError<any>, duration?: number
}) => {
  console.log({ error })
  const mess = error?.payload?.mess;
  const title = error?.status === 422 ? 'Lỗi nhập liệu' : 'Thông báo';
  toast({
    title: title,
    description: mess ?? 'Lỗi không xác định',
    variant: 'destructive',
    duration: duration ?? 5000
  })
}
/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export const isServer = () => typeof window === 'undefined';

export const getCookie = (name: string) => {
  if (isServer()) return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export const setCookie = (name: string, value: string, days: number) => {
  if (isServer()) return;

  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
}

export const removeCookie = (name: string) => {
  if (isServer()) return;

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export const formatCurrency = (value: number | string | undefined) => {
  if (!value) return '0';

  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(value));
}

export const formatNumber = (value: number | string | undefined) => {
  if (!value) return '0';

  return new Intl.NumberFormat('vi-VN').format(Number(value));
}

export const emptyImage = (e: any) => {
  e.target.src = { emptyImg }
};

export const tryGetAccessToken = async () => {
  if (isServer()) return null; // must be run at client side
  let accessToken = getCookie('accessToken');
  if (!accessToken || isTokenExpired(accessToken)) {
    removeCookie('accessToken');
    let refreshToken = getCookie('refreshToken');
    if (!refreshToken || isTokenExpired(refreshToken)) {
      removeCookie('refreshToken');
      return null;
    }
    const result = await authApiRequest.refreshToken({ refreshToken });
    const { status, payload } = result as any;
    if (status === 200) {
      accessToken = payload?.accessToken;
      return accessToken;
    } if (status === 401) {
      removeCookie('accessToken');
      removeCookie('refreshToken');
      return null;
    }
  }
  return accessToken;
};

export const getDateRemaining = (exp: number | undefined) => {
  if (!exp) return 0;

  const expDate = new Date(exp * 1000);
  expDate.setDate(expDate.getDate() + 1); // add 1 day to the expiration date
  const now = new Date();

  const expDateAccess = expDate.getTime() - now.getTime();

  const daysUntilExpAccess = Math.ceil(expDateAccess / (1000 * 60 * 60 * 24));

  return daysUntilExpAccess;
}

export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload
}

export const isTokenExpired = (token: string) => {
  const exp = decodeJWT<{ exp: number }>(token)?.exp;
  return getDateRemaining(exp) < 1;
};

export const handleResponse = async (result: any) => {
  const { status, payload } = result as ResponsePayloadType | any;
  if (status === 401) {
    return new Response(JSON.stringify({ code: 'Error', mess: 'Not Authorize', data: null }), { status: 401 });
  }
  if (!payload) {
    return new Response(JSON.stringify({ code: 'Error', mess: 'Unknown error', data: null }), { status: status || 500 });
  }
  const { data, code, mess } = payload;
  return new Response(JSON.stringify({ data, code, mess }), { status });
}

export const getParamFromUrl = (url: string, key: string) => {
  const urlParams = new URLSearchParams(url);
  return urlParams.get(key);
};

export const parseHandleQuery = (handle: string): Record<string, string> => {
  const decodedHandle = decodeURIComponent(handle);
  const queryParams: Record<string, string> = {};
  decodedHandle.split('&').forEach(pair => {
    const [key, value] = pair.split('=');
    queryParams[key] = value;
  });
  return queryParams;
}

export const slugifyHandle = (str: string) => {
  if (!str) return '';
  return slugify(str, {
    replacement: '-',  // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true,      // convert to lower case, defaults to `false`
    strict: false,     // strip special characters except replacement, defaults to `false`
    locale: 'vi',      // language code of the locale to use
    trim: true         // trim leading and trailing replacement chars, defaults to `true`
  })
}

// những tham số có giá trị mới được thêm vào chuỗi truy vấn của URL.
export function buildQueryString(params: Record<string, any>): string {
  return Object.keys(params)
    .filter(key => params[key] !== undefined && params[key] !== null && params[key] !== '')
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

export const generateSlugLink = (str: string, id: number) => {
  if (str && id) {
    const link = slugifyHandle(str).concat(`-${id}`).concat('.html');
    return link;
  }
  return null;
}

export const getIdFromSlugLink = (slug: string) => {
  const temp = slug.split('.html');
  const id = temp[0].split('-').pop();
  return id as string;
}

export const generateLinkGoogleImage = (id: string) => {
  if(id){
    return `${(configEnv.NEXT_PUBLIC_LINK_IMAGE_GG ?? '') + id}` + '&sz=w1000';
  } else {
    return emptyImg;
  }
}