"use client";
import React from 'react'
import { CartDetails } from '@/schemaValidations/cart.schema'
import configEnv from '@/configEnv';
import { emptyImage, formatCurrency, formatNumber } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

function ItemCart({ data }: { data: CartDetails }) {
    const { IDChiTietHD, IDHoaDon, IDMon, TenMon, SoLuong,
        DonGia, ChietKhau, TienChuaCK,
        TienCK, TienSauCK, Image } = data
    const src = `${(configEnv.NEXT_PUBLIC_LINK_IMAGE_GG ?? '') + Image}`
    const total = (DonGia ?? 0) * (SoLuong ?? 0)
    return (
        <tr key={IDChiTietHD} className='border'>
            <td>
                <div className="flex items-center">
                    <img width={100} height={100} className="px-4 py-4"
                        src={src}
                        onError={emptyImage}
                        alt="Product image" />
                    <span title={TenMon} className="text-sm line-clamp-2">{TenMon}</span>
                </div>
            </td>
            <td className="text-center">{formatNumber(DonGia)}</td>
            <td className="text-center">
                <div className="flex items-center justify-center">
                    <button className="border rounded-md py-2 px-4 mr-2">-</button>
                    <span className="text-center w-8">{formatNumber(SoLuong)}</span>
                    <button className="border rounded-md py-2 px-4 ml-2">+</button>
                </div>
            </td>
            <td className="text-center">{ChietKhau}%</td>
            <td className="text-center">{formatCurrency(total)}</td>
            <td className="text-center"><div className="flex justify-center text-center"><Trash2 /></div> </td>
        </tr>
    )
}

export default ItemCart