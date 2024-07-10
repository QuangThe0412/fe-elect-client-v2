import configEnv from "@/configEnv";
import http from "@/lib/http";
import { ReadonlyURLSearchParams } from "next/navigation";

const limit = configEnv.NEXT_PUBLIC_LIMIT;

const productApiRequest = {
    getCategories: () => http.get('/categories'),
    getList: (searchParams: ReadonlyURLSearchParams) => {
        const page = searchParams.get('page') || '1';
        const category = searchParams.get('category') || '';
        const name = searchParams.get('name') || '';
        return http.get(`/api/products?page=${page}&limit=${limit}&category=${category}&name=${name}`, {
            baseUrl: ''
        });
    },
    // getDetail: (id: string) => http.get(`/api/products/${id}`, {
    //     baseUrl: ''
    // }),
    //server side
    getList2: (currentPage: number) => http.get(`/api/products?page=${currentPage}&limit=${limit}`, {
        baseUrl: ''
    })
}

export default productApiRequest;
