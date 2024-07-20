import { cookies } from 'next/headers'
import { handleResponse } from "@/lib/utils";

export async function DELETE(request: Request) {
    try {
        cookies().delete('accessToken')
        cookies().delete('refreshToken')

        return handleResponse({
            status: 200,
            payload: {
                code: 'Success',
                mess: 'Đăng xuất thành công',
                data: {},
            }
        });
    } catch (error: any) {
        throw new Error(error);
    }
}