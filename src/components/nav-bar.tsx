import { pathsArray } from '@/constants/paths'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const Navbar = () => {
    const pathname = usePathname();
    const Paths = pathsArray.filter(m => !m.isHide).map((item) => {
        return (
            <Link key={item.path} className={`navbar__link relative 
                ${pathname === item.path ? 'active' : ''}`}
                href={item.path}>{item.name}</Link>
        )
    });
    return (
        <>
            <div className="hidden lg:block">
                <div className="container">
                    <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish">
                        {Paths}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar