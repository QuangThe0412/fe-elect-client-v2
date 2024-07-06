import { decodeJWT } from "@/lib/utils";
import { handleResponseFromServerBackEnd } from "@/lib/utilsNext";

export async function POST(request: Request) {
    try {
        const req = await request.json();
        const accessToken = req.accessToken;
        const refreshToken = req.refreshToken;
        const decodedAccess = decodeJWT(accessToken);

        if (!decodedAccess) {
            return Response.json({
                status: 400,
                mess: 'Token không hợp lệ'
            });
        }

        const cookies = [];
        const accessTokenCookie = `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=${decodedAccess.exp - Date.now() / 1000}`;
        cookies.push(accessTokenCookie);
        if (refreshToken) {
            const decodedRefresh = decodeJWT(refreshToken);
            if (!decodedRefresh) {
                return Response.json({
                    status: 400,
                    mess: 'Token không hợp lệ'
                });
            }
            const refreshTokenCookie = `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${decodedRefresh.exp - Date.now() / 1000}`;
            cookies.push(refreshTokenCookie);
        }

        return Response.json(
            { req },
            {
                status: 200,
                headers: {
                    'Set-Cookie': [...cookies].join(', '),
                },
            }
        );
    } catch (error: any) {
        return handleResponseFromServerBackEnd(error);
    }
}