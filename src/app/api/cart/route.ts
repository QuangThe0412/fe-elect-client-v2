import { STATUS_ENUM } from "@/lib/constants";
import http from "@/lib/http";
import { handleResponse } from "@/lib/utils";
import { cookies } from "next/headers";

async function HandleCart(method: string, request: Request, body?: any) {
    try {
        const cookieStore = cookies();
        const accessToken = cookieStore.get("accessToken")?.value;
        if (!accessToken) {
            return handleResponse(
                {
                    status: 401,
                    payload: { code: 'Error', mess: 'Not Authorize', data: null }
                }
            );
        }

        const idChiTietHd = Number(body?.IDChiTietHD ?? 0);
        const idHoaDon = Number(body?.IDHoaDon ?? 0);

        const config = {
            headers: { Authorization: `${accessToken}` },
            ...((method === 'PUT' || 'POST') && { body: JSON.stringify(body) })
        };
        let result;
        switch (method) {
            case 'GET':
                result = await http.get('/cart', config);
                break;
            case 'POST':
                result = await http.post(`/cart/${idHoaDon}`, [body], config);
                break;
            case 'PUT':
                const status = body?.TrangThai ?? 0;
                if (status === STATUS_ENUM.PROCESSING) {
                    result = await http.put(`/cart/processing/${idHoaDon}`, body, config);
                    break;
                }
                result = await http.put(`/cart/${idChiTietHd}`, body, config);
                break;
            case 'DELETE':
                result = await http.delete(`/cart/${idChiTietHd}`, {}, config);
                break;
            default:
                break;
        }
        return handleResponse(result);
    } catch (error: any) {
        throw new Error(error);
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