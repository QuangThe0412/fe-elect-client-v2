import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from '@/components/ui/use-toast'
import { UseFormSetError } from 'react-hook-form'
import jwt from 'jsonwebtoken'
import emptyImg from '../../public/emptyCard.png'

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

export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload
}

export const isServer = () => typeof window === 'undefined';

export const getDateRemaining = (exp: number | undefined) => {
  if (!exp) return 0;

  const expDate = new Date(exp * 1000);
  expDate.setDate(expDate.getDate() + 1); // add 1 day to the expiration date
  const now = new Date();

  const expDateAccess = expDate.getTime() - now.getTime();

  const daysUntilExpAccess = Math.ceil(expDateAccess / (1000 * 60 * 60 * 24));

  return daysUntilExpAccess;
}

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