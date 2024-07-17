import authApiRequest from '@/apiRequests/auth';
import React from 'react'
import { cookies } from 'next/headers'
import { paths } from '@/constants/paths';
import { redirect } from 'next/navigation';
import { ResponsePayloadType } from '@/lib/http';

async function RefreshTokenPage() {
    const cookieStore = cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value ?? '';
    if (!refreshToken) {
        redirect(paths.login)
    }
    const { status, payload } = await authApiRequest.refreshToken({ refreshToken }) as ResponsePayloadType;
    if (status == 200) {
        const newAccessToken = payload?.data?.accessToken;
        console.log({ newAccessToken });

    }
    return (
        <div>page</div>
    )
}

export default RefreshTokenPage