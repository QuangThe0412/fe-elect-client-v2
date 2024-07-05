import http from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";

const accountApiRequest = {
    profile: () => http.get<AccountResType>('/account/profile'),
    updateProfile: (body: any) => http.put('/account/profile', body),
    changePassword: (body: any) => http.put('/account/change-password', body),
}

export default accountApiRequest;
