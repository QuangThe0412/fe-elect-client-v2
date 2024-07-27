"use client";
import { Button } from './ui/button';
import { BsCart, BsPlusLg } from 'react-icons/bs';
import useAuthStore, { TypeUsers } from '@/store/auth.store';
import useCartStore, { TypeCartStore } from '@/store/cart.store';
import cartApiRequest from '@/apiRequests/cart';
import { CartDetails, CartType } from '@/schemaValidations/cart.schema';
import { ResponsePayloadType } from '@/lib/http';
import { HiOutlineMinus } from 'react-icons/hi2';
import { formatNumber } from '@/lib/utils';

const ButtonAddCart = ({ id }: { id: number }) => {
    const { user, setIsShowLoginDialog } = useAuthStore((state: TypeUsers) => ({
        user: state.user,
        setIsShowLoginDialog: state.setIsShowLoginDialog
    }))
    const { cart, setCart, loadingCart, setLoadingCart } = useCartStore((state: TypeCartStore) => ({
        cart: state.cart,
        setCart: state.setCart,
        loadingCart: state.loadingCart,
        setLoadingCart: state.setLoadingCart
    }))

    const monExistedInCart = cart?.details?.find(item => item.IDMon === id) as CartDetails;

    const IDHoaDon = cart?.IDHoaDon;

    const hadUser = !!(user && Object.keys(user).length);

    const handleAddToCart = async (idMon: number | undefined) => {
        setLoadingCart(true);
        if (!hadUser) {
            setIsShowLoginDialog(true);
        } else {
            if (IDHoaDon) {
                const response = await cartApiRequest.addToCart({ IDHoaDon, IDMon: idMon, SoLuong: 1 });
                const { payload, status } = response as ResponsePayloadType;
                if (status === 200) {
                    const data = payload?.data as CartDetails[];
                    const updatedCartDetails = [...(cart?.details || [])];

                    data?.forEach((dataItem) => {
                        const index = updatedCartDetails.findIndex(cartItem => cartItem.IDMon === dataItem.IDMon);
                        if (index > -1) {
                            updatedCartDetails[index] = { ...updatedCartDetails[index], ...dataItem };
                        } else {
                            updatedCartDetails.push(dataItem);
                        }
                    });
                    setCart({ ...cart, details: updatedCartDetails });
                }
            } else {
                const response = await cartApiRequest.addToCart({ IDMon: idMon, SoLuong: 1 });
                const { payload, status } = response as ResponsePayloadType;
                if (status === 200) {
                    const newCartGet = await cartApiRequest.getCart();
                    const { payload, status } = newCartGet as ResponsePayloadType;
                    if (status === 200) {
                        const data = payload?.data as CartType;
                        setCart(data);
                    }
                }
            }
        }
        setLoadingCart(false);
    }

    const onRemove = async (idChiTietHd: number | undefined) => {
        setLoadingCart(true);
        const body = { IDChiTietHD: idChiTietHd }
        const { payload, status } = await cartApiRequest.deleteCart(body) as ResponsePayloadType;
        if (status === 200) {
            const _cart = cart?.details?.filter(item => item.IDChiTietHD !== idChiTietHd);
            const newcart = { ...cart, details: _cart };
            setCart(newcart);
            setLoadingCart(false);
        }
    }

    const onPlus = async (idChiTietHd: number | undefined) => {
        setLoadingCart(true);
        const body = {
            IDChiTietHD: idChiTietHd,
            SoLuong: (monExistedInCart?.SoLuong ?? 0) + 1
        }
        const { payload, status } = await cartApiRequest.putCart(body) as ResponsePayloadType;
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
            setLoadingCart(false);
        }
    }

    const onMinus = async (idChiTietHd: number | undefined) => {
        setLoadingCart(true);
        if ((monExistedInCart?.SoLuong ?? 0) <= 1) {
            await onRemove(idChiTietHd);
            return;
        }
        const body = {
            IDChiTietHD: idChiTietHd,
            SoLuong: (monExistedInCart?.SoLuong ?? 0) - 1
        }
        const { payload, status } = await cartApiRequest.putCart(body) as ResponsePayloadType;
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
            setLoadingCart(false);
        }
    }

    return (
        <>
            {
                monExistedInCart?.IDMon === id ?
                    <div className="flex items-center justify-center">
                        <Button disabled={loadingCart} className="border rounded-md py-2 px-4 mr-2"
                            onClick={() => onMinus(monExistedInCart?.IDChiTietHD)}
                        >
                            <HiOutlineMinus />
                        </Button>
                        <span className="text-center w-8">{formatNumber(monExistedInCart?.SoLuong)}</span>
                        <Button disabled={loadingCart} className="border rounded-md py-2 px-4 ml-2"
                            onClick={() => onPlus(monExistedInCart?.IDChiTietHD)}
                        >
                            <BsPlusLg />
                        </Button>
                    </div>
                    :
                    <div className='block text-right'>
                        <Button disabled={loadingCart} onClick={() => handleAddToCart(id)}
                            className='bg-accent-custom text-white text-left'>
                            <BsCart className='inline-block' />
                        </Button>
                    </div>
            }
        </>
    )
}

export default ButtonAddCart