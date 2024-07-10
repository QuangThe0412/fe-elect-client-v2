"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

type props = {
    href: string,
    children: React.ReactNode,
    className?: string
}

const NavLink = ({ href, children, className = "" }: props) => {
    const pathname = usePathname();

    return (
        <Link href={href} className={`text-muted-foreground transition-colors hover:text-foreground
            ${className} ${pathname === href && 'text-active'}`}>
            {children}
        </Link>
    )
}

export default NavLink