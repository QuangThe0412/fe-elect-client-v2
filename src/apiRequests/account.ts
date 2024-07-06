import http from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";

const accountApiRequest = {
    //server next side
    profile: () => http.get<AccountResType>('/api/account/profile', {
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
