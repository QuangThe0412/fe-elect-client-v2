"use client";
import { paths } from '@/lib/paths';
import { usePathname } from 'next/navigation';
import React from 'react'
import AppLayout from './AppLayout';
import PublicLayout from './PublicLayout';
import { Toaster } from '@/components/ui/toaster';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const pathname = usePathname();
    const privatePaths = [paths.login, paths.register];

    let Layout = AppLayout;
    if (privatePaths.includes(pathname)) {
        Layout = PublicLayout;
    }
    return (
        <>
            <Layout>
                {children}
                <Toaster />
            </Layout>
        </>
    )
}

export default Layout