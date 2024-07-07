import authApiRequest from "@/apiRequests/auth";
import { decodeJWT, getDateRemaining } from "@/lib/utils";
import { cookies } from 'next/headers'
import { ResponsePayloadType } from "./http";

export const tryGetAccessToken = async () => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken')?.value ?? '';
    if (!accessToken || isTokenExpired(accessToken)) {
        cookieStore.delete('accessToken');
        const refreshToken = cookieStore.get('refreshToken')?.value;
        if (!refreshToken || isTokenExpired(refreshToken)) {
            cookieStore.delete('refreshToken');
            return null;
        }
        const result = await authApiRequest.refreshToken();
        return result.status === 200 ? (result?.payload as any)?.data?.accessToken : null;
    }
    return accessToken;
};

const isTokenExpired = (token: string) => {
    const exp = decodeJWT<{ exp: number }>(token).exp;
    return getDateRemaining(exp) < 1;
};

export const handleResponseFromServerBackEnd = async (result: any) => {
    const { status, payload } = result as ResponsePayloadType;
    if (!payload) {
        return new Response(JSON.stringify({ code: 'Error', mess: 'Unknown error', data: null }), { status: status || 500 });
    }
    const { data, code, mess } = payload;
    return new Response(JSON.stringify({ data, code, mess }), { status });
}