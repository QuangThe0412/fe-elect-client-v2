import http from "@/lib/http";
import { handleResponse, tryGetAccessToken } from  from "@/lib/utils";

async function fetchProfile(method: string, request: Request, body?: any) {
    try {
        const accessToken = await tryGetAccessToken();
        if (!accessToken) {
            return handleResponse({
                status: 401,
                payload: { code: 'Unauthorized', mess: 'Chưa xác thực', data: null }
            });
        }
        const config = {
            headers: { Authorization: `${accessToken}` },
            ...(method === 'PUT' && { body: JSON.stringify(body) })
        };
        let result;
        switch (method) {
            case 'GET':
                result = await http.get('/account/profile', config);
                break;
            case 'PUT':
                result = await http.put('/account/profile', body, config);
                break;
        }
        return handleResponse(result);
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function GET(request: Request, response: Response) {
    return fetchProfile('GET', request);
}

export async function PUT(request: Request, response: Response) {
    const req = await request.json();
    return fetchProfile('PUT', request, req);
}