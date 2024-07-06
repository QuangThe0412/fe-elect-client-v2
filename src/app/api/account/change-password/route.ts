import http from "@/lib/http";
import { handleResponseFromServerBackEnd, tryGetAccessToken } from "@/lib/utilsNext";

export async function PUT(request: Request, response: Response) {
    try {
        const req = await request.json();
        const accessToken = await tryGetAccessToken();
        if (accessToken) {
            const result = await http.put('/account/change-password', req, {
                headers: {
                    Authorization: `${accessToken}`
                }
            });
            return result;
        }
        return Response.json({
            status: 401,
            mess: 'Unauthorized'
        });
    } catch (error: any) {
        return handleResponseFromServerBackEnd(error);
    }
}