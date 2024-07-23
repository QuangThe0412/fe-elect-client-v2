import authApiRequest from "@/apiRequests/auth";
import http from "@/lib/http";
import { handleResponse, tryGetAccessToken }  from "@/lib/utils";
import { cookies } from 'next/headers';

async function fetchProfile(method: string, request: Request, body?: any) {
    try {
        const cookieStore = cookies();  
        let accessTokenCookie = cookieStore.get('accessToken');
        let accessToken = accessTokenCookie?.value;
        if(!accessTokenCookie) {
            const refreshTokenCookie = cookieStore.get('refreshToken');
            if(!refreshTokenCookie){
                return handleResponse({
                    status: 401,
                    payload: { code: 'Unauthorized', mess: 'RefreshToken hết hạn', data: null }
                });
            }
            const resultRefreshToken = await authApiRequest.refreshToken({ refreshToken: refreshTokenCookie?.value });
            const { status, payload } = resultRefreshToken as any;
            if(status === 200) {
                const { accessToken : newAccessToken, refreshToken } = payload?.data;
                accessToken = newAccessToken;
            }
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