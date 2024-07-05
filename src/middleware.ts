import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { paths } from './constants/paths';
import { cookies } from 'next/headers'

export function middleware(request: NextRequest) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken');
    const refreshToken = cookieStore.get('refreshToken');

    if (!accessToken) {
        return NextResponse.redirect(new URL(paths.login, request.url))
    }
    const response = NextResponse.next();
    response.headers.set('Authorization', `Bearer ${accessToken}`);
    return response
}

export const config = {
    matcher: '/profile',
}