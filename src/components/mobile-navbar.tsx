import React from 'react'
import { BsHouseDoor, BsGrid, BsSuitHeart } from "react-icons/bs"
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LuMenu } from "react-icons/lu";

const MobileNavBar = () => {
    return (
        <div className="lg:hidden fixed bottom-0 w-full bg-white left-[50%] -translate-x-[50%] max-w-[500px] mob_navbar px-8">
            <div className="flex justify-between text-[28px] py-2">
                <LuMenu />
                <div className="relative">
                    <HiOutlineShoppingBag />
                    <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">0</div>
                </div>
                <BsHouseDoor />
                <div className="relative">
                    <BsSuitHeart />
                    <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">0</div>
                </div>
                <BsGrid />
            </div>
        </div>
    )
}

export default MobileNavBar