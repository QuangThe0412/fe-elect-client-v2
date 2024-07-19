import configEnv from "@/configEnv";
import http from "@/lib/http";
import { ProductResType } from "@/schemaValidations/product.schema";
import { ReadonlyURLSearchParams } from "next/navigation";

const limit = configEnv.NEXT_PUBLIC_LIMIT;

const productApiRequest = {
    getCategories: () => http.get('/categories'),
    getList: (searchParams: ReadonlyURLSearchParams) => {
        const page = searchParams.get('page') || '1';
        const category = searchParams.get('category') || '';
        const query = searchParams.get('query') || '';
        return http.get(`/api/products?page=${page}&limit=${limit}&category=${category}&query=${query}`, {
            baseUrl: ''
        });
    },
    getNewProducts: () => http.get(`/products/newest`)
    // getDetail: (id: string) => http.get(`/api/products/${id}`, {
    //     baseUrl: ''
    // }),
}

export default productApiRequest;
