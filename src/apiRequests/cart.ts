import http from "@/lib/http";

const cartApiRequest = {
    //server next side
    getCart: (accessToken: string) => http.get('/api/cart', {
        baseUrl: '',
        // headers: { Authorization: `${accessToken}` },
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
    paymentCart: (body: any) => http.put(`/api/cart`, body, {
        baseUrl: ''
    }),
}

export default cartApiRequest;
