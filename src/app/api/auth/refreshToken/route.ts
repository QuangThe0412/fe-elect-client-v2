import http, { ResponsePayloadType } from "@/lib/http";
import { decodeJWT } from "@/lib/utils";
import { handleResponseFromServerBackEnd, isTokenExpired } from "@/lib/utilsNext";

export async function POST(request: Request) {
    const req = await request.json();
    const { refreshToken } = req;

    if (!refreshToken || isTokenExpired(refreshToken)) {
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