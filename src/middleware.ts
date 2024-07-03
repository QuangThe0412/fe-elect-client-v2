import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { paths } from './constants/paths';

export function middleware(request: NextRequest) {
    let cookie = request.cookies.get('access_token');
    if (!cookie) {
        return NextResponse.redirect(new URL(paths.login, request.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/profile',
}