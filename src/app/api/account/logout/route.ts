import { cookies } from 'next/headers'
import { handleResponseFromServerBackEnd } from "@/lib/utilsNext";

export async function DELETE(request: Request) {
    try {
        cookies().delete('accessToken')
        cookies().delete('refreshToken')

        return handleResponseFromServerBackEnd({
            status: 200,
            payload: {
                code: 'Success',
                mess: 'Đăng xuất thành công',
                data: {},
            }
        });
    } catch (error: any) {
        return handleResponseFromServerBackEnd(error);
    }
}