import http from "@/lib/http";

const accountApiRequest = {
    //server next side
    profile: (accessToken: string) => http.get('/account/profile', {
        headers: { Authorization: `${accessToken}` },
    }),
    updateProfile: (accessToken: string, body: any) => http.put('/account/profile', body, {
        headers: { Authorization: `${accessToken}` },
    }),
    changePassword: (accessToken: string, body: any) => http.put('/account/change-password', body, {
        headers: { Authorization: `${accessToken}` },
    })
}

export default accountApiRequest;
