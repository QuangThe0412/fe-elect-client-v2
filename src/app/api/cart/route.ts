import http from "@/lib/http";
import { handleResponseFromServerBackEnd, tryGetAccessToken } from "@/lib/utilsNext";

async function HandleCart(method: string, request: Request, body?: any) {
    try {
        const accessToken = await tryGetAccessToken();
        if (!accessToken) return handleResponseFromServerBackEnd(
            {
                status: 401,
                payload: { code: 'Error', mess: 'Not Authorize', data: null }
            }
        );
        const _body = JSON.stringify(body);
        const idChiTietHd = Number(body?.IDChiTietHD ?? 0);
        const idHoaDon = Number(body?.IDHoaDon ?? 0);

        const config = {
            headers: { Authorization: `${accessToken}` },
            ...((method === 'PUT' || 'POST') && { body: _body })
        };
        let result;
        switch (method) {
            case 'GET':
                result = await http.get('/cart', config);
                break;
            case 'POST'://======work here
                result = await http.post(`/cart/${idHoaDon}`, [_body], config);
                break;
            case 'PUT':
                result = await http.put(`/cart/${idChiTietHd}`, _body, config);
                break;
            case 'DELETE':
                result = await http.delete(`/cart/${idChiTietHd}`, {}, config);
                break;
            default:
                break;
        }
        return handleResponseFromServerBackEnd(result);
    } catch (error: any) {
        return handleResponseFromServerBackEnd(error);
    }
}

export async function GET(request: Request, response: Response) {
    return HandleCart(request.method, request);
}

export async function POST(request: Request, response: Response) {
    const reqBody = await request.json();
    return HandleCart(request.method, request, reqBody);
}

export async function PUT(request: Request, response: Response) {
    const reqBody = await request.json();
    return HandleCart(request.method, request, reqBody);
}

export async function DELETE(request: Request, response: Response) {
    const reqBody = await request.json();
    return HandleCart(request.method, request, reqBody);
}