import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from '@/components/ui/use-toast'
import { EntityError } from '@/lib/http'
import { UseFormSetError } from 'react-hook-form'
import jwt from 'jsonwebtoken'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleErrorApi = ({
  error,
  setError,
  duration
}: {
  error: any
  setError?: UseFormSetError<any>
  duration?: number
}) => {
  if (error instanceof EntityError && setError) {
    error.payload.errors.forEach((item) => {
      setError(item.field, {
        type: 'server',
        message: item.mess
      })
    })
  } else {
    toast({
      title: 'Lỗi',
      description: error?.payload?.mess ?? 'Lỗi không xác định',
      variant: 'destructive',
      duration: duration ?? 5000
    })
  }
}
/**
 * Xóa đi ký tự `/` đầu tiên của path
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path
}

export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload
}

export const isServer = () => typeof window === 'undefined';

export const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ""}${expires}; path=/`;
};

export const getCookie = (name: string) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const eraseCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=-99999999;`;
};

export const getDateRemaining = (exp: number) => {
  const expDate = new Date(exp * 1000);
  expDate.setDate(expDate.getDate() + 1); // add 1 day to the expiration date
  const now = new Date();

  const expDateAccess = expDate.getTime() - now.getTime();

  const daysUntilExpAccess = Math.ceil(expDateAccess / (1000 * 60 * 60 * 24));

  return daysUntilExpAccess;
}