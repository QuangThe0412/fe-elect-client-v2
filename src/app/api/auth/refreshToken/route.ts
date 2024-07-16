import authApiRequest from "@/apiRequests/auth";
import http, { ResponsePayloadType } from "@/lib/http";
import { decodeJWT, isServer } from "@/lib/utils";
import { handleResponse, isTokenExpired } from "@/lib/utilsNext";
import { cookies } from 'next/headers'

export async function POST(request: Request, response: Response) {
    try {
        const req = await request.json();
        const { refreshToken } = req;

        if (!refreshToken || isTokenExpired(refreshToken)) {
            return handleResponse({
                status: 400,
                payload: {
                    code: 'BadRequest',
                    mess: 'RefreshToken không hợp lệ',
                    data: null
                }
            });
        }

        const result = await http.post('/auth/refresh-token', { refreshToken }) as ResponsePayloadType;
        const { status, payload } = result;
        if (status == 200) {
            const accessToken = payload?.data;
            const decodedAccess = decodeJWT(accessToken);
            const accessTokenCookie = `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=${decodedAccess.exp - Date.now() / 1000}`;
            console.log(isServer());
            return Response.json(
                { accessToken, refreshToken },
                {
                    status: 200,
                    headers: {
                        'Set-Cookie': [accessTokenCookie].join(', '),
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