import http, { ResponsePayloadType } from "@/lib/http";
import { decodeJWT } from "@/lib/utils";
import { handleResponseFromServerBackEnd } from "@/lib/utilsNext";
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken || !decodeJWT(refreshToken)) {
        return handleResponseFromServerBackEnd({
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
        const decodedRefresh = decodeJWT(refreshToken);
        cookies().set({
            name: 'accessToken',
            value: accessToken,
            httpOnly: false,
            path: '/',
            maxAge: decodedRefresh.exp - Date.now() / 1000
        });

        return handleResponseFromServerBackEnd({
            status: 200,
            payload: {
                code: 'Success',
                mess: 'Lấy accessToken thành công',
                data: { accessToken },
            }
        });
    }

    return handleResponseFromServerBackEnd({
        status: 500,
        payload: {
            code: 'InternalServerError',
            mess: 'Đã có lỗi xảy ra khi lấy accessToken từ refreshToken',
            data: null
        }
    });
}