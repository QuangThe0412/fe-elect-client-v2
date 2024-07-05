import { decodeJWT } from "@/lib/utils";

export async function POST(request: Request) {
    const req = await request.json();
    const accessToken = req.accessToken;
    const refreshToken = req.refreshToken;
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
    if (decodedAccess.exp < Date.now() / 1000 || decodedRefresh.exp < Date.now() / 1000) {
        return Response.json({
            status: 400,
            payload: {
                mess: 'Token đã hết hạn'
            }
        });
    }
    const accessTokenCookie = `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=${decodedAccess.exp - Date.now() / 1000}`;
    const refreshTokenCookie = `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${decodedRefresh.exp - Date.now() / 1000}`;

    return Response.json(
        { req },
        {
            status: 200,
            headers: {
                'Set-Cookie': [accessTokenCookie, refreshTokenCookie].join(', '),
            },
        }
    );
}