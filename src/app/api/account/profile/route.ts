import { stat } from 'fs';
import http from "@/lib/http";
import { tryGetAccessToken } from "@/lib/utilsNext";
export async function GET(request: Request, response: Response) {
    const accessToken = await tryGetAccessToken();

    if (accessToken) {
        const result = await http.get('/account/profile', {
            headers: {
                Authorization: `${accessToken}`
            }
        });
        const data = result.payload.data;

        return Response.json({
            status: 200,
            data
        });
    }
    return Response.json({
        status: 401,
        payload: {
            mess: 'Unauthorized'
        }
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

        const data = result.payload.data;
        return Response.json({
            status: 200,
            data,
            mess: result.payload.mess
        });
    }
    return Response.json({
        status: 401,
        payload: {
            mess: 'Unauthorized'
        }
    });
}