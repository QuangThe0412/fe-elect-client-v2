import { decodeJWT} from "@/lib/utils";
import { handleResponse } from "@/lib/utilsNext";
import { cookies } from 'next/headers'

export async function POST(request: Request) {
    try {
        const { accessToken, refreshToken } = await request.json();
        console.log({ accessToken });
        console.log({ refreshToken });

        const setCookie = (token: string, name: string) => {
            const decoded = decodeJWT(token);
            if (decoded) {
                cookies().set({
                    name,
                    value: token,
                    httpOnly: false,
                    path: '/',
                    maxAge: decoded.exp - Date.now() / 1000,
                });
            }
        };

        if (!accessToken || !refreshToken) {
            return handleResponse({
                status: 400,
                payload: {
                    code: 'BadRequest',
                    mess: 'Token không hợp lệ',
                    data: { accessToken, refreshToken },
                },
            });
        }

        setCookie(accessToken, 'accessToken');
        setCookie(refreshToken, 'refreshToken');

        return handleResponse({
            status: 200,
            payload: {
                code: 'Success',
                mess: 'Đã cập nhật token',
                data: { accessToken, refreshToken },
            },
        });
    } catch (error: any) {
        throw new Error(error);
    }
}