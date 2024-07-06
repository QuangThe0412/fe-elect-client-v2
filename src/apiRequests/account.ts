import http from "@/lib/http";

const accountApiRequest = {
    //server next side
    profile: () => http.get('/api/account/profile', {
        baseUrl: ''
    }),
    updateProfile: (body: any) => http.put('/api/account/profile', body, {
        baseUrl: ''
    }),
    changePassword: (body: any) => http.put('/api/account/change-password', body, {
        baseUrl: ''
    }),
}

export default accountApiRequest;
