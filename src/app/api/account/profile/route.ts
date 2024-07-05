import authApiRequest from "@/apiRequests/auth";
import http from "@/lib/http";

export async function GET() {
    const tokenRes = await authApiRequest.getToken();
    let accessToken = '';
    if (tokenRes.status == 200) {
        accessToken = tokenRes.payload.data.accessToken;
    }
    console.log('===========1=======1================');
    console.log('accessToken', accessToken);

    const result = await http.get('/account/profile', {
        headers: {
            Authorization: `${accessToken}`
        }
    });

    console.log('result', result);
    return Response.json(result);
}