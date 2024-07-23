import http, { ResponsePayloadType } from "@/lib/http";
import { decodeJWT } from "@/lib/utils";
import { handleResponse, isTokenExpired } from "@/lib/utils";

export async function POST(request: Request, response: Response) {
    try {
        const req = await request.json();
        const refreshToken =  req?.refreshToken;
        const decodedRefresh = decodeJWT(refreshToken);

        if (!decodedRefresh || isTokenExpired(refreshToken)) {
            return Response.json({
                status: 400,
                payload: {
                    mess: 'Token không hợp lệ hoặc hết hạn'
                }
            });
        }

        const { status, payload } = await http.post('/auth/refresh-token', { refreshToken }) as ResponsePayloadType;
        if (status == 200) {
            const accessToken = payload?.data;
            const decodedAccess = decodeJWT(accessToken);

            const currentTimeInSeconds = Date.now() / 1000;
            const accessTokenMaxAge = decodedAccess.exp - currentTimeInSeconds;

            return Response.json(
                { accessToken },
                {
                    status: 200,
                    headers: {
                        'Set-Cookie': `accessToken=${accessToken}; Path=/; Max-Age=${Math.floor(accessTokenMaxAge)}`,
                    },
                }
            );
        }

        return handleResponse({
            status: 500,
            payload: {
                code: 'InternalServerError',
                mess: 'Đã có lỗi xảy ra khi lấy accessToken từ refreshToken',
                data: null
            }
        });
    } catch (error: any) {
        console.log({ error });
        throw new Error(error);
    }
}