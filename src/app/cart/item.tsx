"use client";
import React from 'react'
import { CartDetails } from '@/schemaValidations/cart.schema'
import configEnv from '@/configEnv';
import { emptyImage, formatCurrency, formatNumber } from '@/lib/utils';
import cartApiRequest from '@/apiRequests/cart';
import useCartStore, { TypeCartStore } from '@/store/cart.store';
import { Button } from '@/components/ui/button';
import { BsTrash2 } from 'react-icons/bs';

function ItemCart({ data }: { data: CartDetails }) {
    const [loading, setLoading] = React.useState(false);
    const { cart, setCart } = useCartStore((state: TypeCartStore) => ({
        cart: state.cart,
        setCart: state.setCart,
    }))

    const { IDChiTietHD, TenMon, SoLuong = 0, DonGia = 0, ChietKhau = 0, Image } = data
    const src = `${(configEnv.NEXT_PUBLIC_LINK_IMAGE_GG ?? '') + Image}`
    const total = DonGia * SoLuong

    const onRemove = async (idChiTietHd: number | undefined) => {
        setLoading(true);
        const body = { IDChiTietHD: idChiTietHd }
        const result = await cartApiRequest.deleteCart(body);
        const { payload, status } = result;
        if (status === 200) {
            const _cart = cart?.details?.filter(item => item.IDChiTietHD !== idChiTietHd);
            const newcart = { ...cart, details: _cart };
            setCart(newcart);
            setLoading(false);
        }
    }

    const onPlus = async (idChiTietHd: number | undefined) => {
        setLoading(true);
        const body = {
            IDChiTietHD: idChiTietHd,
            SoLuong: SoLuong + 1
        }
        const result = await cartApiRequest.putCart(body);
        const { payload, status } = result;
        if (status === 200) {
            const _cart = cart?.details?.map(item => {
                const { IDChiTietHD, SoLuong = 0, DonGia = 0, ChietKhau = 0 } = item;
                const _soLuong = SoLuong + 1;
                const moneyBefore = DonGia * _soLuong;
                const moneyDiscount = (moneyBefore * ChietKhau) / 100;
                const moneyAfter = moneyBefore - moneyDiscount;
                if (IDChiTietHD === idChiTietHd) {
                    return {
                        ...item,
                        TienChuaCK: moneyBefore,
                        TienCK: moneyDiscount,
                        TienSauCK: moneyAfter,
                        SoLuong: _soLuong
                    }
                }
                return item;
            });
            const newcart = { ...cart, details: _cart };
            setCart(newcart);
            setLoading(false);
        }
    }

    const onMinus = async (idChiTietHd: number | undefined) => {
        setLoading(true);
        if (SoLuong <= 1) {
            await onRemove(idChiTietHd);
            return;
        }
        const body = {
            IDChiTietHD: idChiTietHd,
            SoLuong: SoLuong - 1
        }
        const result = await cartApiRequest.putCart(body);
        const { payload, status } = result;
        if (status === 200) {
            const _cart = cart?.details?.map(item => {
                const { IDChiTietHD, SoLuong = 0, DonGia = 0, ChietKhau = 0 } = item;
                const _soLuong = SoLuong - 1;
                const moneyBefore = DonGia * _soLuong;
                const moneyDiscount = (moneyBefore * ChietKhau) / 100;
                const moneyAfter = moneyBefore - moneyDiscount;
                if (IDChiTietHD === idChiTietHd) {
                    return {
                        ...item,
                        TienChuaCK: moneyBefore,
                        TienCK: moneyDiscount,
                        TienSauCK: moneyAfter,
                        SoLuong: _soLuong
                    }
                }
                return item;
            });
            const newcart = { ...cart, details: _cart };
            setCart(newcart);
            setLoading(false);
        }
    }

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
                    <Button disabled={loading} className="border rounded-md py-2 px-4 mr-2" onClick={() => onMinus(IDChiTietHD)}>-</Button>
                    <span className="text-center w-8">{formatNumber(SoLuong)}</span>
                    <Button disabled={loading} className="border rounded-md py-2 px-4 ml-2" onClick={() => onPlus(IDChiTietHD)}>+</Button>
                </div>
            </td>
            <td className="text-center">{ChietKhau}%</td>
            <td className="text-center">{formatCurrency(total)}</td>
            <td className="text-center">
                <div className="flex justify-center text-center" onClick={() => onRemove(IDChiTietHD)}>
                    <BsTrash2 />
                </div>
            </td>
        </tr>
    )
}

export default ItemCart