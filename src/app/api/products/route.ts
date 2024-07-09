import http from "@/lib/http";
import { handleResponseFromServerBackEnd, tryGetAccessToken } from "@/lib/utilsNext";

export async function GET(request: Request, response: Response) {
    try {
        console.log({ request });
        console.log('==========================================================');

        // let result = await http.get('/products');
        // console.log({ result });

        return new Response(JSON.stringify(
            { code: 'Error', mess: 'Unknown error', data: null }),
            { status: 500 }
        );

        // return handleResponseFromServerBackEnd(result);
    } catch (error: any) {
        return handleResponseFromServerBackEnd(error);
    }
}