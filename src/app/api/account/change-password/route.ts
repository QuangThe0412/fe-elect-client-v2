import http from "@/lib/http";
import { handleResponse, tryGetAccessToken } from "@/lib/utils";

export async function PUT(request: Request) {
    try {
        const req = await request.json();
        const accessToken = await tryGetAccessToken();
        if (!accessToken) {
            return handleResponse({
                status: 401,
                payload: { code: 'Unauthorized', mess: 'Chưa xác thực', data: null }
            });
        }
        const result = await http.put('/account/change-password', req, {
            headers: { Authorization: accessToken }
        });
        return handleResponse(result);
    } catch (error: any) {
        throw new Error(error);
    }
}