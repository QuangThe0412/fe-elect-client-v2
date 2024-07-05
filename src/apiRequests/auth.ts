import http from "@/lib/http";
import { LoginBodyType, RegisterBodyType } from "@/schemaValidations/auth.schema";

const authApiRequest = {
    login: (body: LoginBodyType) => http.post('/auth/login', body),
    register: (body: RegisterBodyType) => http.post('/auth/register', body),
    //server next side
    refreshToken: () => http.post('/api/auth/refreshToken', {
        baseUrl: ''
    }),
    setToken: (body: any) => http.post('/api/auth/setToken', body, {
        baseUrl: ''
    }),
}

export default authApiRequest;
