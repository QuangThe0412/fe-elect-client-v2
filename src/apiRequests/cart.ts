import http from "@/lib/http";

const cartApiRequest = {
    //server next side
    getCart: () => http.get('/api/cart', {
        baseUrl: ''
    }),
}

export default cartApiRequest;
