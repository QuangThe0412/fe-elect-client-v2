import configEnv from "@/configEnv";
import http from "@/lib/http";
import { handleResponseFromServerBackEnd } from "@/lib/utilsNext";
import { type NextRequest } from 'next/server'

const limit = configEnv.NEXT_PUBLIC_LIMIT;

export async function GET(request: NextRequest, response: Response) {
    try {
        const params = request.nextUrl;
        const searchParams = params?.searchParams;
        const page = searchParams?.get('page') || '1';
        const query = searchParams?.get('query') || '';
        let result = await http.get(`/products?page=${page}&limit=${limit}&query=${query}`);
        
        return handleResponseFromServerBackEnd(result);
    } catch (error: any) {
        return handleResponseFromServerBackEnd(error);
    }
}