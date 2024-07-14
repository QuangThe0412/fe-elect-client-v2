import configEnv from '@/configEnv'
import { ProductResType } from '@/schemaValidations/product.schema'
import React from 'react'
import { ShoppingBag } from 'lucide-react'
import useAuthStore, { TypeUsers } from '@/store/auth.store'
import useCartStore, { TypeCartStore } from '@/store/cart.store'
import cartApiRequest from '@/apiRequests/cart'
import { CartDetails, CartType } from '@/schemaValidations/cart.schema'

function ItemProduct({ data }: { data: ProductResType }) {
    const { user, setIsShowLoginDialog } = useAuthStore((state: TypeUsers) => ({
        user: state.user,
        setIsShowLoginDialog: state.setIsShowLoginDialog
    }))
    const { cart, setCart } = useCartStore((state: TypeCartStore) => ({
        cart: state.cart,
        setCart: state.setCart,
    }))
    const { IDMon, IDLoaiMon, TenMon, Image, DVTMon, DonGiaBanSi,
        DonGiaBanLe, DonGiaVon, SoLuongTonKho, ThoiGianBH } = data;

    const IDHoaDon = cart?.IDHoaDon;

    const src = `${(configEnv.NEXT_PUBLIC_LINK_IMAGE_GG ?? '') + Image}`

    const hadUser = !!(user && Object.keys(user).length);

    const handleAddToCart = async (idMon: number | undefined) => {
        if (!hadUser) {
            setIsShowLoginDialog(true);
        } else {
            if (IDHoaDon) {
                const response = await cartApiRequest.addToCart({ IDHoaDon, IDMon: idMon, SoLuong: 1 });
                const { payload, status } = response as any;
                if (status === 200) {
                    const data = payload?.data as CartDetails[];
                    const updatedCartDetails = [...(cart?.details || [])];

                    data.forEach((dataItem) => {
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
                const { payload, status } = response as any;
                if (status === 200) {
                    const newCartGet = await cartApiRequest.getCart();
                    const { payload, status } = newCartGet as any;
                    if (status === 200) {
                        const data = payload?.data as CartType;
                        setCart(data);
                    }
                }
            }
        }
    }

    return (
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <a href="#">
                <img src={src}
                    alt="Product" className="object-cover rounded-t-xl" />
                <div className="px-4 py-3 w-72">
                    {/* <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span> */}
                    <p className="text-lg font-bold text-black truncate block capitalize">{TenMon}</p>
                    <div className="flex items-center">
                        <p className="text-lg font-semibold text-black cursor-auto my-3">{DonGiaBanLe}</p>
                        <del>
                            <p className="text-sm text-gray-600 cursor-auto ml-2">{data.DonGiaBanLe}</p>
                        </del>
                        <div className="ml-auto">
                            <ShoppingBag size={24} onClick={() => handleAddToCart(IDMon)} />
                        </div>
                    </div>
                </div>
            </a >
        </div >
    )
}

export default ItemProduct