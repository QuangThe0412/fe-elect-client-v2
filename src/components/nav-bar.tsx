import React from 'react'

const Navbar = () => {
    return (
        <>
            <div className="hidden lg:block">
                <div className="container">
                    <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish">
                        <a className="navbar__link relative" href="#">HOME</a>
                        <a className="navbar__link relative" href="#">CATEGORIES</a>
                        <a className="navbar__link relative" href="#">MEN'S</a>
                        <a className="navbar__link relative" href="#">WOMEN'S</a>
                        <a className="navbar__link relative" href="#">JEWELRY</a>
                        <a className="navbar__link relative" href="#">PERFUME</a>
                        <a className="navbar__link relative" href="#">BLOG</a>
                        <a className="navbar__link relative" href="#">HOT OFFERS</a>
                    </div>
                </div>
            </div>            
        </>
    )
}

export default Navbar