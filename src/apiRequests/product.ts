import configEnv from "@/configEnv";
import http from "@/lib/http";
import { buildQueryString, parseHandleQuery } from "@/lib/utils";

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
    getNewProducts: () => http.get(`/products/newest`),
    getProducts: (query: string, sortKey: string, sortType: string) => {
        const queryString = buildQueryString({ query, sortKey, sortType });
        return http.get(`/products?${queryString}`);
    },
    getCollectionProducts: (nameCollection: string, query: string, sortKey: string, sortType: string) => {
        const queryString = buildQueryString({ query, sortKey, sortType });
        return http.get(`/products/category/${nameCollection}?${queryString}`);
    },
    getDetail: (idProduct: string) => http.get(`/products/details/${idProduct}`),
    getRelatedProducts: (idCategory: number) => http.get(`/products/related/${idCategory}`),
}

export default productApiRequest;
