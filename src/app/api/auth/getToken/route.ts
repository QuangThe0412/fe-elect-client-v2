import authApiRequest from "@/apiRequests/auth";
import { decodeJWT, getDateRemaining } from "@/lib/utils";
import { cookies } from 'next/headers'

export async function GET() {
    console.log('===========2222222222222222==============');
    const cookieStore = cookies()
    const accessTokenCookie = cookieStore.get('accessToken')
    const accessToken = accessTokenCookie?.value
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
                    return Response.json({
                        status: 401,
                        payload: {
                            mess: 'Token hết hạn'
                        }
                    });
                }

                // refresh token still valid
                const result = await authApiRequest.refreshToken();
                if (result.status == 200) {
                    const dataAccessToken = result.payload.data.accessToken;
                    return Response.json({
                        status: 200,
                        payload: {
                            data: { accessToken: dataAccessToken }
                        }
                    });
                }
            }
        }
    }

    return Response.json({
        status: 401,
        payload: {
            mess: 'Không có token'
        }
    });
}