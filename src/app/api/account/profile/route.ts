import http from "@/lib/http";
import { handleResponseFromServerBackEnd, tryGetAccessToken } from "@/lib/utilsNext";
export async function GET(request: Request, response: Response) {
    const accessToken = await tryGetAccessToken();

    if (accessToken) {
        const result = await http.get('/account/profile', {
            headers: {
                Authorization: `${accessToken}`
            }
        });
        return handleResponseFromServerBackEnd(result);
    }
    return Response.json({
        status: 401,
        mess: 'Unauthorized'
    });
}

export async function PUT(request: Request, response: Response) {
    const req = await request.json();
    const accessToken = await tryGetAccessToken();
    if (accessToken) {
        const result = await http.put('/account/profile', req, {
            headers: {
                Authorization: `${accessToken}`
            }
        });
        return handleResponseFromServerBackEnd(result);
    }
    return Response.json({
        status: 401,
        mess: 'Unauthorized'
    });
}