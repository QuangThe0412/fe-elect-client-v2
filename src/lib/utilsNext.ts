import authApiRequest from "@/apiRequests/auth";
import { decodeJWT, getDateRemaining } from "@/lib/utils";
import { cookies } from 'next/headers'

export const tryGetAccessToken = async () => {
    const cookieStore = cookies()
    const accessTokenCookie = cookieStore.get('accessToken')
    let accessToken = accessTokenCookie?.value
    if (accessToken) {
        const expAccessToken = decodeJWT<{ exp: number }>(accessToken).exp;
        const daysUntilExpAccess = getDateRemaining(expAccessToken);
        if (daysUntilExpAccess && daysUntilExpAccess < 1) {
            cookies().delete('accessToken')

            const refreshTokenCookie = cookieStore.get('refreshToken')
            const refreshToken = refreshTokenCookie?.value;
            if (refreshToken) {
                const expRefreshToken = decodeJWT<{ exp: number }>(refreshToken).exp;
                const daysUntilExpRefresh = getDateRemaining(expRefreshToken);
                if (daysUntilExpRefresh && daysUntilExpRefresh < 1) {
                    cookies().delete('refreshToken')
                    return null;
                }

                // refresh token still valid
                const result = await authApiRequest.refreshToken();
                if (result.status == 200) {
                    accessToken = result.payload.data.accessToken;
                }
            }
        }
        return accessToken;
    }
    return null;
};

export const handleResponseFromServerBackEnd = async (result: any) => {
    const { status, payload } = result;
    const data = payload.data;
    return Response.json({
        status: status,
        data,
        mess: result.payload.mess
    });
}