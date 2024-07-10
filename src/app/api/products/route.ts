import { ParamsProductProps } from "@/app/product/page";
import http from "@/lib/http";
import { handleResponseFromServerBackEnd } from "@/lib/utilsNext";
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest, response: Response) {
    try {
        const params = request.nextUrl as ParamsProductProps;
        const searchParams = params?.searchParams;
        const { page, limit, query } = searchParams || {};
        let result = await http.get(`/products?page=${page}&limit=${limit}&query=${query}`);

        return handleResponseFromServerBackEnd(result);
    } catch (error: any) {
        return handleResponseFromServerBackEnd(error);
    }
}