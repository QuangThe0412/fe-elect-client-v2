import http from "@/lib/http";

const cartApiRequest = {
    //server next side
    getCart: () => http.get('/api/cart', {
        baseUrl: ''
    }),
    deleteCart: (body: any) => http.delete(`/api/cart`, body, {
        baseUrl: ''
    }),
    putCart: (body: any) => http.put(`/api/cart`, body, {
        baseUrl: ''
    }),
    addToCart: (body: any) => http.post(`/api/cart`, body, {
        baseUrl: ''
    }),
}

export default cartApiRequest;
