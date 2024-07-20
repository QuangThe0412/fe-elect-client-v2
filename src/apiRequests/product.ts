import configEnv from "@/configEnv";
import http from "@/lib/http";
import { parseHandleQuery } from "@/lib/utils";

const limit = configEnv.NEXT_PUBLIC_LIMIT;

const productApiRequest = {
    getCategories: () => http.get('/categories'),
    getList: (handle: string) => {
        const queryParams = parseHandleQuery(handle);
        const page = queryParams['page'] || 1;
        const category = queryParams['category'] || '';
        const query = queryParams['query'] || '';
        return http.post(`/api/products`,
            {
                page,
                limit,
                category,
                query,
            },
            {
                baseUrl: '',
            });
    },
    getNewProducts: () => http.get(`/products/newest`)
    // getDetail: (id: string) => http.get(`/api/products/${id}`, {
    //     baseUrl: ''
    // }),
}

export default productApiRequest;
