import configEnv from '@/configEnv'
import { ProductResType } from '@/schemaValidations/product.schema'
import React from 'react'
import { ShoppingBag } from 'lucide-react'

function ItemProduct({ data }: { data: ProductResType }) {
    const src = `${(configEnv.NEXT_PUBLIC_LINK_IMAGE_GG ?? '') + data.Image}`
    return (
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <a href="#">
                <img src={src}
                    alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
                <div className="px-4 py-3 w-72">
                    {/* <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span> */}
                    <p className="text-lg font-bold text-black truncate block capitalize">{data.TenMon}</p>
                    <div className="flex items-center">
                        <p className="text-lg font-semibold text-black cursor-auto my-3">{data.DonGiaBanSi}</p>
                        <del>
                            <p className="text-sm text-gray-600 cursor-auto ml-2">{data.DonGiaBanLe}</p>
                        </del>
                        <div className="ml-auto">
                            <ShoppingBag size={24} />
                        </div>
                    </div>
                </div>
            </a >
        </div >
    )
}

export default ItemProduct