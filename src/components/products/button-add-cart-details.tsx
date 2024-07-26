"use client";
import cartApiRequest from '@/apiRequests/cart';
import { Button } from '@/components/ui/button'
import { ResponsePayloadType } from '@/lib/http';
import { formatNumber } from '@/lib/utils';
import { CartDetails, CartType } from '@/schemaValidations/cart.schema';
import useAuthStore, { TypeUsers } from '@/store/auth.store';
import useCartStore, { TypeCartStore } from '@/store/cart.store';
import { BsPlusLg } from 'react-icons/bs';
import { HiOutlineMinus } from 'react-icons/hi2';

const ButtonAddCartPageDetails = ({ idProduct }: { idProduct: number }) => {
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

    const IDHoaDon = cart?.IDHoaDon;

    const monExistedInCart = cart?.details?.find(item => item.IDMon === idProduct) as CartDetails;

    const hadUser = !!(user && Object.keys(user).length);

    const HandleAddCart = async () => {
        setLoadingCart(true);
        if (!hadUser) {
            setIsShowLoginDialog(true);
        } else {
            if (IDHoaDon) {
                const response = await cartApiRequest.addToCart({ IDHoaDon, IDMon: idProduct, SoLuong: 1 });
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
                const response = await cartApiRequest.addToCart({ IDMon: idProduct, SoLuong: 1 });
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
                monExistedInCart?.IDMon === idProduct ?
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
                    <Button loading={loadingCart} className='btn btn-primary mt-4 bg-accent-custom'
                        onClick={() => HandleAddCart()}>
                        Thêm vào giỏ hàng
                    </Button>
            }

        </>
    )
}

export default ButtonAddCartPageDetails