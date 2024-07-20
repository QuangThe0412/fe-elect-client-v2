import http from "@/lib/http";
import { handleResponse } from "@/lib/utils";
import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest, response: Response) {
    try {
        const req = await request.json();
        const page = req?.page || '1';
        const limit = req?.limit || '10';
        const category = req?.category || '';
        const query = req?.query || '';
        let result = await http.get(`/products?page=${page}&limit=${limit}&category=${category}&query=${query}`);
        return handleResponse(result);
    } catch (error: any) {
        throw new Error(error);
    }
}