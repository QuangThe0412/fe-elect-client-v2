import http from "@/lib/http";
import { decodeJWT } from "@/lib/utils";
import { handleResponseFromServerBackEnd } from "@/lib/utilsNext";
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    try {
        const cookieStore = cookies();
        const refreshToken = cookieStore.get('refreshToken');

        let accessToken = '';
        if (refreshToken) {
            const decodedRefresh = decodeJWT(refreshToken?.value);
            if (!decodedRefresh) {
                return Response.json({
                    status: 400,
                    mess: 'RefreshToken không hợp lệ'
                });
            }

            const result = await http.post('/auth/refresh-token', { refreshToken });
            if (result.status === 200) {
                const accessTokenData = (result as any)?.payload?.data;
                accessToken = `accessToken=${accessTokenData}; HttpOnly; Path=/; Max-Age=${decodedRefresh.exp - Date.now() / 1000}`;
            }
            else {
                return Response.json({
                    status: 500,
                    mess: 'Đã có lỗi xảy ra khi lấy accessToken từ refreshToken'
                });
            }
        }

        return Response.json(
            { data: { accessToken } },
            {
                status: 200,
                headers: {
                    'Set-Cookie': accessToken,
                },
            }
        );
    } catch (error: any) {
        return handleResponseFromServerBackEnd(error);
    }
}