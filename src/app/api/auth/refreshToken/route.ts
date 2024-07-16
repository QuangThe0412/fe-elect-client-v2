import authApiRequest from "@/apiRequests/auth";
import http, { ResponsePayloadType } from "@/lib/http";
import { decodeJWT } from "@/lib/utils";
import { handleResponse, isTokenExpired } from "@/lib/utilsNext";
import { cookies } from 'next/headers'

export async function POST(request: Request) {
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
            // const decodedAccessToken = decodeJWT(accessToken);
            // cookies().set({
            //     name: 'accessToken',
            //     value: accessToken,
            //     httpOnly: false,
            //     path: '/',
            //     maxAge: decodedAccessToken.exp - Date.now() / 1000,
            // });
            console.log('===================from refreshToken route');
            const resultSetToken = await authApiRequest.setToken({ accessToken, refreshToken });
            console.log({ resultSetToken });

            return handleResponse({
                status: 200,
                payload: {
                    code: 'Success',
                    mess: 'Lấy accessToken thành công',
                    data: { accessToken },
                }
            });
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