import { paths, paths1 } from '@/constants/paths'
import React from 'react'

const Navbar = () => {
    const Paths = paths1.map((item) => {
        return (
            <a className="navbar__link relative" href={item.path}>{item.name}</a>
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