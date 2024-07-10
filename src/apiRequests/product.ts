import configEnv from "@/configEnv";
import http from "@/lib/http";

const limit = configEnv.NEXT_PUBLIC_LIMIT;

const productApiRequest = {
    getCategories: () => http.get('/categories'),
    getList: (currentPage: number) => http.get(`/products?page=${currentPage}&limit=${limit}`),
    // getDetail: (id: string) => http.get(`/api/products/${id}`, {
    //     baseUrl: ''
    // }),
    //server side
    getList2: (currentPage: number) => http.get(`/api/products?page=${currentPage}`, {
        baseUrl :''
    })
}

export default productApiRequest;
