import http from "@/lib/http";

const productApiRequest = {
    getCategories: () => http.get('/categories'),
    getList: () => http.get('/products'),
    getDetail: (id: string) => http.get(`/api/products/${id}`, {
        baseUrl: ''
    }),
}

export default productApiRequest;
