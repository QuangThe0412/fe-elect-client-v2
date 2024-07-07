import http from "@/lib/http";
import { handleResponseFromServerBackEnd, tryGetAccessToken } from "@/lib/utilsNext";

export async function PUT(request: Request) {
    try {
        const req = await request.json();
        const accessToken = await tryGetAccessToken();
        if (!accessToken) {
            return handleResponseFromServerBackEnd({
                status: 401,
                payload: { code: 'Unauthorized', mess: 'Chưa xác thực', data: null }
            });
        }
        const result = await http.put('/account/change-password', req, {
            headers: { Authorization: accessToken }
        });
        return handleResponseFromServerBackEnd(result);
    } catch (error: any) {
        return handleResponseFromServerBackEnd(error);
    }
}