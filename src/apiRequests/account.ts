import http from "@/lib/http";

const accountApiRequest = {
    //server next side
    profile: (accessToken: string) => http.get('/account/profile', {
        headers: { Authorization: `${accessToken}` },
    }),
    updateProfile: (body: any) => http.put('/api/account/profile', body, {
        baseUrl: ''
    }),
    changePassword: (body: any) => http.put('/api/account/change-password', body, {
        baseUrl: ''
    }),
    logout: () => http.delete('/api/account/logout', null, {
        baseUrl: ''
    }),
}

export default accountApiRequest;
