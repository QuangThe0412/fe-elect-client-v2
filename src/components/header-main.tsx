import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin, BsSearch } from "react-icons/bs"
import React from 'react'
const HeaderMain = () => {
    return (
        <div className="border-b border-gray-200 py-6">
            <div className="container sm:flex justify-between items-center">
                <div className="font-bold text-4xl text-center pb-4 sm:pb-0 text-blackish">
                    Sick
                </div>
                <div className="w-full sm:w-[300px] md:w-[70%] relative">
                    <input className="border-gray-200 border p-2 px-4 rounded-lg w-full" 
                    type="text" placeholder="Enter any product name..."/>
                        <BsSearch
                </div>
                <div className="hidden lg:flex gap-4 text-gray-500 text-[30px]">
                   
                    <div className="relative"><svg stroke="currentColor"
                        fill="none" stroke-width="2" viewBox="0 0 24 24"
                        stroke-linecap="round" stroke-linejoin="round"
                        height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.
                                    06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06
                                    -1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        <div className="bg-red-600 rounded-full absolute top-0
                                     right-0 w-[18px] h-[18px] text-[12px] text-white grid
                                      place-items-center translate-x-1 -translate-y-1">0</div>
                    </div><div className="relative">
                        <svg stroke="currentColor" fill="none"
                            stroke-width="2" viewBox="0 0 24 24"
                            aria-hidden="true" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg"><path
                                stroke-linecap="round" stroke-linejoin="round"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        <div className="bg-red-600 rounded-full absolute
                                            top-0 right-0 w-[18px] h-[18px] text-[12px]
                                             text-white grid place-items-center translate-x-1 
                                             -translate-y-1">0
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderMain