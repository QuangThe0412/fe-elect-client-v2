import { handleResponse }  from "@/lib/utils";
import { cookies } from 'next/headers'

export async function DELETE(request: Request, response: Response, nameToken: string = '') {
    const cookieStore = cookies();
    cookieStore.delete(nameToken);

    return handleResponse({
        status: 200,
        payload: {
            code: 'Success',
            mess: 'Xóa Token thành công',
            data: {},
        }
    });
}