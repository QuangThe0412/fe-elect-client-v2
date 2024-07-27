
import React from 'react'
import { ZaloQR } from './zalo'
const HeaderTop = () => {
    return (
        <div className="border-b border-gray-200 hidden sm:block">
            <div className="container py-4">
                <div className="flex justify-between items-center">
                    <div className="hidden lg:flex gap-1">
                        <div className="header_top__icon_wrapper">
                            <ZaloQR />
                        </div>
                    </div>
                    <div className="text-gray-500 text-[12px]">
                        <span>CAM KẾT HÀNG CHÍNH HÃNG</span>
                    </div>
                    <div className="flex gap-4">
                        <select className="text-gray-500 text-[12px] w-[80px]" name="language"
                            id="language">
                            <option value="VietNam">Tiếng Việt</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTop