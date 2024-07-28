import configEnv from "@/configEnv";
import http from "@/lib/http";
import { buildQueryString } from "@/lib/utils";

const limit = configEnv.NEXT_PUBLIC_LIMIT;

const productApiRequest = {
    getCollection: () => http.get('/categories'),
    getCollectionDetails: (nameCategory: string) => http.get(`/categories/${nameCategory}`),
    getNewProducts: () => http.get(`/products/newest`),
    getProducts: (query: string, page: string, sortKey: string, sortType: string) => {
        const queryString = buildQueryString({ query, page, sortKey, sortType });
        return http.get(`/products?${queryString}`);
    },
    getCollectionProducts: (idCategory: string, query: string, page: string, sortKey: string, sortType: string) => {
        const queryString = buildQueryString({ query, page, sortKey, sortType });
        return http.get(`/products/category/${idCategory}?${queryString}&limit=${limit}`);
    },
    getDetail: (idProduct: string) => http.get(`/products/details/${idProduct}`),
    getRelatedProducts: (idCategory: number) => http.get(`/products/related/${idCategory}`),
}

export default productApiRequest;
