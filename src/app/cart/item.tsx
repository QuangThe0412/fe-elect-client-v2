"use client";
import React from 'react'
import emptyImage from '../../../public/emptyCard.png'
import { CartDetails } from '@/schemaValidations/cart.schema'
import configEnv from '@/configEnv';

function ItemCart({ data }: { data: CartDetails }) {
    const src = `${(configEnv.NEXT_PUBLIC_LINK_IMAGE_GG ?? '') + data.Image}`
    return (
        <tr>
            <td className="py-4">
                <div className="flex items-center">
                    <img width={100} height={100} className="mr-4"
                        src={src}
                        alt="Product image" />
                    <span className="font-semibold">{data.TenMon}</span>
                </div>
            </td>
            <td className="py-4">{data.DonGia}</td>
            <td className="py-4">
                <div className="flex items-center">
                    <button className="border rounded-md py-2 px-4 mr-2">-</button>
                    <span className="text-center w-8">{data.SoLuong}</span>
                    <button className="border rounded-md py-2 px-4 ml-2">+</button>
                </div>
            </td>
            <td className="py-4">$19.99</td>
        </tr>
    )
}

export default ItemCart