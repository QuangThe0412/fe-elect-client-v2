import { handleResponseFromServerBackEnd } from "@/lib/utilsNext";
import { cookies } from 'next/headers'

export async function DELETE(request: Request, response: Response, nameToken: string = '') {
    const cookieStore = cookies();
    cookieStore.delete(nameToken);

    return handleResponseFromServerBackEnd({
        status: 200,
        payload: {
            code: 'Success',
            mess: 'Lấy accessToken thành công',
            data: {},
        }
    });
}