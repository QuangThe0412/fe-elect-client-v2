import http from "@/lib/http";
import { LoginBodyType, RegisterBodyType } from "@/schemaValidations/auth.schema";

const authApiRequest = {
    login: (body: LoginBodyType) => http.post('/auth/login', body),
    register: (body: RegisterBodyType) => http.post('/auth/register', body),
    //server next side
    refreshToken: (body: any) => http.post('/api/auth/refreshToken', body, {
        baseUrl: ''
    }),
    setToken: (body: any) => http.post('/api/auth/setToken', body, {
        baseUrl: ''
    }),
    deleteToken: (nameToken: string) => http.delete('/api/auth/deleteToken', nameToken, {
        baseUrl: ''
    }),
}

export default authApiRequest;
