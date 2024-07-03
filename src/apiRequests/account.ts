import http from "@/lib/http";

const accountApiRequest = {
    profile: () => http.get('/account/profile'),
    updateProfile: (body : any) => http.put('/account/profile', body),
    changePassword: (body : any) => http.put('/account/change-password', body),
}

export default accountApiRequest;
