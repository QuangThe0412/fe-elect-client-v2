import http from "@/lib/http";
import { LoginBodyType, RegisterBodyType } from "@/schemaValidations/auth.schema";

const authApiRequest = {
    login: (body: LoginBodyType) => http.post('/auth/login', body),
    register: (body: RegisterBodyType) => http.post('/auth/register', body),
    refreshToken: (body: any) => http.post('/auth/refresh-token', body),
}

export default authApiRequest;
