import authApiRequest from "@/apiRequests/auth";
import { decodeJWT, getDateRemaining, isServer } from "@/lib/utils";
import { cookies } from 'next/headers'
import { ResponsePayloadType } from "./http";

export const tryGetAccessToken = async () => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value ?? '';
    if (!accessToken || isTokenExpired(accessToken)) {
        const resultDeleteAccess = await authApiRequest.deleteToken('accessToken');
        if (resultDeleteAccess.status !== 200) {
            return null;
        }
        const refreshToken = cookieStore.get('refreshToken')?.value ?? '';
        if (!refreshToken || isTokenExpired(refreshToken)) {
            const resultDeleteRefresh = await authApiRequest.deleteToken('refreshToken');
            if (resultDeleteRefresh.status !== 200) {
                return null;
            }
        } else {
            const result = await authApiRequest.refreshToken({ refreshToken });
            const { payload, status } = result as any;
            if (status == 200) {
                const newAccessToken = payload?.data?.accessToken;
                return newAccessToken;
                // const resultSetToken = await authApiRequest.setToken({ accessToken: newAccessToken, refreshToken });                
                // return resultSetToken.status === 200 ? (result?.payload as any)?.data?.accessToken : null;
            }
        }
        return accessToken;
    }
};

export const isTokenExpired = (token: string) => {
    const exp = decodeJWT<{ exp: number }>(token)?.exp;
    return getDateRemaining(exp) < 1;
};

export const handleResponse = async (result: any) => {
    const { status, payload } = result as ResponsePayloadType;
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