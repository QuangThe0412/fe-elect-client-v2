import http from "@/lib/http";
import { handleResponseFromServerBackEnd, tryGetAccessToken } from "@/lib/utilsNext";

async function HandleCart(method: string, request: Request, body?: any) {
    try {
        let result;
        const accessToken = await tryGetAccessToken();
        if (accessToken) {
            const config = {
                headers: { Authorization: `${accessToken}` },
                ...((method === 'PUT' || 'DELETE') && { body: JSON.stringify(body) })
            };
            result = await http.get('/cart', config);
        } else {

        }
        return handleResponseFromServerBackEnd(result);
    } catch (error: any) {
        return handleResponseFromServerBackEnd(error);
    }
}

export async function GET(request: Request, response: Response) {
    return HandleCart('GET', request);
}

export async function PUT(request: Request, response: Response) {
    const req = await request.json();
    return HandleCart('PUT', request, req);
}

export async function DETELE(request: Request, response: Response) {
    const req = await request.json();
    return HandleCart('DELETE', request, req);
}