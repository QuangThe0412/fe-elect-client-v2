import { decodeJWT } from "@/lib/utils";
import { isTokenExpired } from "@/lib/utilsNext";

export async function POST(request: Request) {
    try {
        const { accessToken, refreshToken } = await request.json();

        const decodedAccess = decodeJWT(accessToken);
        const decodedRefresh = decodeJWT(refreshToken);
        if (!decodedAccess || !decodedRefresh) {
            return Response.json({
                status: 400,
                payload: {
                    mess: 'Token không hợp lệ'
                }
            });
        }
        
        if (isTokenExpired(accessToken) || isTokenExpired(refreshToken)) {
            return Response.json({
                status: 400,
                payload: {
                    mess: 'Token đã hết hạn'
                }
            });
        }
        
        const currentTimeInSeconds = Date.now() / 1000;
        const accessTokenMaxAge = decodedAccess.exp - currentTimeInSeconds;
        const refreshTokenMaxAge = decodedRefresh.exp - currentTimeInSeconds;

        const accessTokenCookie = `accessToken=${accessToken}; Path=/; Max-Age=${Math.floor(accessTokenMaxAge)}`;
        const refreshTokenCookie = `refreshToken=${refreshToken}; Path=/; Max-Age=${Math.floor(refreshTokenMaxAge)}`;
        return Response.json(
            { accessToken, refreshToken },
            {
                status: 200,
                headers: {
                    'Set-Cookie': [accessTokenCookie, refreshTokenCookie].join(', '),
                },
            }
        );

    } catch (error: any) {
        throw new Error(error);
    }
}